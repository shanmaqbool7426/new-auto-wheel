"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Title,
  Text,
  Flex,
  Select,
  Stepper,
  Group,
  Input,
  Textarea,
  SimpleGrid,
  Image,
  NumberInput,
  Checkbox,
  Switch,
  ThemeIcon,
  Grid,
  rem,
} from "@mantine/core";

import { BiSolidUserRectangle } from "react-icons/bi";
import {
  FaCar,
  FaWhatsapp,
  FaMotorcycle,
  FaTruck,
  FaMobile,
} from "react-icons/fa6";
import { LightBulb } from "@/components/Icons";
import { IconCircleCheck } from "@tabler/icons-react";
import { HiDocumentAdd } from "react-icons/hi";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import CustomModel from "@/constants/CustomModel";
import { fetchBodiesByType, fetchMakesByType } from "@/services/vehicles";
import { submitFormData } from "@/services/forms";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { useRouter } from "next/navigation";
import {
  cities,
  colorOptions,
  registrationOptions,
  suburbs,
  carTags,
  yearList,
  carEngines,
  truckEngines,
  bikeEngines,
  bikeDrives,
  carTruckDrives,
} from "@/mock-data/mock-array";
import { getSuburbs } from "@/constants/suburbs";
import { uploadImageServer } from "@/actions";
import { showNotification } from "@mantine/notifications";
const PostAnAd = (params) => {
  const { data: session } = useSession();
  const router = useRouter();
  const vehicle = params?.params?.vehicle;
  const [activeStep, setActiveStep] = useState(0);
  const [images, setImages] = useState([]);
  const [makes, setMakes] = useState({});
  const [bodies, setBodies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selection, setSelection] = useState({
    make: "",
    model: "",
    variant: "",
  });
  const [formDataStep1, setFormDataStep1] = useState({
    condition: "used",
    year: "",
    city: "",
    suburb: "",
    registeredIn: "",
    rego: "",
    exteriorColor: "",
    milage: "",
    price: "",
    description: "",
    Info: {},
    images: [],
  });
  const [formDataStep2, setFormDataStep2] = useState({
    engineType: "",
    engine: "",
    drive: "",
    seats: "",
    doors: "",
    body: "",
    engineCapacity: "",
    transmission: "",
    assembly: "",
    features: [],
  });
  const [formDataStep3, setFormDataStep3] = useState({
    mobileNumber: "",
    secondaryNumber: "",
    allowWhatsAppContact: false,
  });

  const validateStep = (step) => {
    const formData = {
      0: formDataStep1,
      1: formDataStep2,
      2: formDataStep3,
    }[step];

    const validators = {
      0: (data) =>
        data.city &&
        data.suburb &&
        data.registeredIn &&
        data.rego &&
        data.exteriorColor &&
        data.milage &&
        data.price &&
        data.description &&
        images.length > 0,
      1: (data) =>
        data.engineType &&
        data.engine &&
        data.drive &&
        data.engineCapacity &&
        data.body &&
        data.transmission &&
        data.assembly &&
        data.features.length > 0,
      2: (data) =>
        data.mobileNumber &&
        /^[\d]{10,15}$/.test(data.mobileNumber) &&
        data.secondaryNumber &&
        /^[\d]{10,15}$/.test(data.secondaryNumber),
    };

    return validators[step] ? validators[step](formData) : false;
  };

  useEffect(() => {
    setFormDataStep1((prev) => ({
      ...prev,
      Info: selection,
    }));
  }, [selection]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChangeStep1 = (value, field) => {
    if (field === "city") {
      setFormDataStep1((prevData) => ({
        ...prevData,
        ["suburb"]: "",
        [field]: value,
      }));
    } else {
      setFormDataStep1((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  useEffect(() => {
    const getMakes = async () => {
      if (vehicle) {
        const response = await fetchMakesByType(vehicle); // Fetch based on vehicle type
        setMakes(response);  
      }
    };

    getMakes();
  }, [vehicle]); // Re-fetch makes when vehicle type changes

  useEffect(() => {
    const getBodies = async () => {
      if (vehicle) {
        const response = await fetchBodiesByType(vehicle); // Fetch based on vehicle type
        setBodies(response);
      }
    };

    getBodies();
  }, [vehicle]); // Re-fetch makes when vehicle type changes

  const handleInputChangeStep2 = (field, value) => {
    setFormDataStep2((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleChangeStep3 = (e) => {
    const { name, value } = e.target;
    setFormDataStep3((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFeatureChange = (feature) => {
    setFormDataStep2((prevState) => ({
      ...prevState,
      features: prevState.features.includes(feature)
        ? prevState.features.filter((f) => f !== feature)
        : [...prevState.features, feature],
    }));
  };

  const handleDescriptionClick = (template) => {
    setFormDataStep1((prevData) => ({
      ...prevData,
      description: prevData.description + template,
    }));
  };
  const handleSubmit = async () => {
    const specifications = {
      suburb: formDataStep1.suburb,
      exteriorColor: formDataStep1.exteriorColor,
      mileage: formDataStep1.milage,
      engine: formDataStep2.engine,
      drive: formDataStep2.drive,
      engineType: formDataStep2.engineType,
      fuelType: formDataStep2.engineType,
      bodyType: formDataStep2.body,
      engineCapacity: formDataStep2.engineCapacity,
      transmission: formDataStep2.transmission,
      assembly: formDataStep2.assembly,
    };
    if (vehicle !== "bike") {
      specifications.seats = formDataStep2.seats;
      specifications.doors = formDataStep2.doors;
    }
    const payload = {
      ...formDataStep1,
      ...formDataStep2,
      specifications,
      rego: formDataStep1.rego,
      price: formDataStep1.price || 0,
      startPrice: formDataStep1.price || 0,
      endPrice: formDataStep1.price || 0,
      cityArea: formDataStep1.suburb,
      type: vehicle,
      year: formDataStep1.year,
      make: selection.make,
      model: selection.model,
      variant: selection.variant,
      contactInfo: formDataStep3,
      images: formDataStep1.images,
      defaultImage: formDataStep1.images[0],
      seller: session?.user?._id,
    };
    try {
      const data = await submitFormData(
        API_ENDPOINTS.VEHICLE.ADD,
        JSON.stringify(payload),
        {
          "Content-Type": "application/json",
        }
      );
      router.push(`/listing/${vehicle}s`);
    } catch (error) {
      console.error(error);
    }
  };

  const nextStep = () => {
    if (!validateStep(activeStep)) {
      showNotification({
        title: "Post an ad",
        message: "Please fill in all required fields.",
        color: "red",
      });
      return;
    }

    setActiveStep((prev) => prev + 1);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleFileDrop = async (images) => {
    setImages(images);

    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await uploadImageServer(formData);

      const uploadedImageUrls = response;

      setFormDataStep1((prev) => ({
        ...prev,
        images: uploadedImageUrls,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const previews = images.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Box className="uploaded-image-wrapper" pos="relative" key={index}>
        <Image
          h={{ base: 140, sm: 140 }}
          src={imageUrl}
          onLoad={() => URL.revokeObjectURL(imageUrl)}
          radius="md"
        />
      </Box>
    );
  });

  const getFeaturesByVehicle = (vehicleType) => {
    // Common features shared by both cars and trucks
    const commonCarTruckFeatures = {
      featuredListsOne: [
        { name: "ABS" },
        { name: "Air Conditioning" }, // Shared between car and truck
      ],
      featuredListsTwo: [
        { name: "Power Steering" }, // Shared between car and truck
      ],
      featuredListsThree: [
        { name: "Cruise Control" }, // Shared between car and truck
      ],
    };

    // Car-specific features
    const carFeatures = {
      featuredListsOne: [
        ...commonCarTruckFeatures.featuredListsOne, // Include common features
        { name: "Alloy Rims" },
        { name: "Cassette Player" },
        { name: "Climate Control" },
        { name: "Front Camera" },
        { name: "Keyless Entry" },
        { name: "Power Mirrors" },
        { name: "Rear Seat Entertainment" },
        { name: "Rear Camera" },
        { name: "USB and Auxillary Cable" },
      ],
      featuredListsTwo: [
        ...commonCarTruckFeatures.featuredListsTwo, // Include common features
        { name: "Air Bags" },
        { name: "AM/FM Radio" },
        { name: "Cool Box" },
        { name: "DVD Player" },
        { name: "Navigation System" },
        { name: "Rear AC Vents" },
        { name: "Sun Roof" },
      ],
      featuredListsThree: [
        ...commonCarTruckFeatures.featuredListsThree, // Include common features
        { name: "CD Player" },
        { name: "Front Speakers" },
        { name: "Immobilizer Key" },
        { name: "Power Locks" },
        { name: "Power Windows" },
        { name: "Rear Speakers" },
        { name: "Steering Switches" },
      ],
    };

    // Bike-specific features
    const bikeFeatures = {
      featuredListsOne: [
        { name: "ABS" },
        { name: "LED Headlights" },
        { name: "Disc Brakes" },
        { name: "Alloy Wheels" },
      ],
      featuredListsTwo: [
        { name: "Digital Speedometer" },
        { name: "Fuel Injection" },
        { name: "Handlebar Controls" },
      ],
      featuredListsThree: [
        { name: "Mobile Charging Port" },
        { name: "Side Stand Indicator" },
      ],
    };

    // Truck-specific features
    const truckFeatures = {
      featuredListsOne: [
        ...commonCarTruckFeatures.featuredListsOne, // Include common features
        { name: "Cargo Bed" },
        { name: "Trailer Hitch" },
        { name: "Heavy-duty Suspension" },
      ],
      featuredListsTwo: [
        ...commonCarTruckFeatures.featuredListsTwo, // Include common features
        { name: "Air Brakes" },
        { name: "Reinforced Chassis" },
        { name: "Towing Package" },
      ],
      featuredListsThree: [
        ...commonCarTruckFeatures.featuredListsThree, // Include common features
        { name: "Off-road Tires" },
        { name: "Powerful Engine" },
        { name: "GPS Navigation" },
      ],
    };

    // Return features based on the vehicle type
    switch (vehicleType) {
      case "bike":
        return bikeFeatures;
      case "truck":
        return truckFeatures;
      default:
        return carFeatures; // Default to car features
    }
  };

  // Usage example:
  const features = getFeaturesByVehicle(vehicle);

  const { featuredListsOne, featuredListsTwo, featuredListsThree } = features;
  const getEngineListByVehicle = (vehicleType) => {
    // Return features based on the vehicle type
    switch (vehicleType) {
      case "bike":
        return bikeEngines;
      case "truck":
        return truckEngines;
      default:
        return carEngines; // Default to car features
    }
  };
  // Usage example:
  const engineList = getEngineListByVehicle(vehicle);
  const getDriveListByVehicle = (vehicleType) => {
    // Return features based on the vehicle type
    switch (vehicleType) {
      case "bike":
        return bikeDrives;
      case "truck":
        return carTruckDrives;
      default:
        return carTruckDrives; // Default to car features
    }
  };
  // Usage example:
  const driveList = getDriveListByVehicle(vehicle);

  if (!session) {
    return (
      <Box my="xl" className="post-an-ad" py={"100px"}>
        <Text size="xl" align="center">
          Please login to post ad
        </Text>
      </Box>
    );
  }
  return (
    <Box component="section" className="post-an-ad" mt={100}>
      <Box className="header-section bg-light" py={50}>
        <Box className="container-xl">
          <Box className="row">
            <Box className="col-lg-12 text-center">
              <Title order={2} className="text-primary" mb="sm">
                Sell your {vehicle} With 3 Easy & Simple Steps!
              </Title>
              <Text size="lg">It's free and takes less than a minute</Text>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="stepper-forms" py="xl">
        <Box className="container-xl">
          <Box className="row">
            <Box className="col-lg-12 text-center">
              <Stepper
                active={activeStep}
                onStepClick={setActiveStep}
                color="#E90808"
                completedIcon={<IconCircleCheck />}
              >
                <Stepper.Step
                  icon={
                    vehicle == "bike" ? (
                      <FaMotorcycle />
                    ) : vehicle == "truck" ? (
                      <FaTruck />
                    ) : (
                      <FaCar />
                    )
                  }
                  label="Step 1"
                  py="lg"
                  description={`Enter Your ${vehicle} Information`}
                >
                  <Card
                    shadow="0px 4px 20px 0px #00000014"
                    p={{ base: "md", md: "xl" }}
                    className="text-start border-top border-primary border-5"
                  >
                    <Title order={3}>Vehicle Information</Title>
                    <Text size="sm">
                      (All fields marked with * are mandatory)
                    </Text>
                    {/* Step 1 content goes here */}
                    {/* step 1 start*/}

                    <Box className="stepper-form" mt="xl">
                      <Box className="row align-items-center" mb="xl">
                        {/* <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Condition
                          </Input.Label>
                        </Box> */}
                        {/* <Box className="col-md-7">
                          <Select
                            size="md"
                            placeholder="New"
                            data={yearList}
                            value={formDataStep1.year}
                            onChange={(value) =>
                              handleChangeStep1(value, "year")
                            }
                          />
                        </Box> */}
                      </Box>

                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Year
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Select
                            size="md"
                            placeholder="2024"
                            data={yearList}
                            value={formDataStep1.year}
                            onChange={(value) =>
                              handleChangeStep1(value, "year")
                            }
                          />
                        </Box>
                      </Box>

                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            City
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Select
                            size="md"
                            placeholder="City"
                            data={cities}
                            value={formDataStep1.city}
                            searchable
                            nothingFoundMessage="Nothing found..."
                            onChange={(value) =>
                              handleChangeStep1(value, "city")
                            }
                          />
                        </Box>
                        <Box className="col-md-3 text-start">
                          <Group gap="xs" align="center" wrap="nowrap">
                            <LightBulb styles={{marginTop:"-8px"}}/>
                            <Text size="sm">
                              We don't allow duplicates of same ad.
                            </Text>
                          </Group>
                        </Box>
                      </Box>

                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Suburb
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Select
                            size="md"
                            placeholder="Suburb"
                            data={getSuburbs(formDataStep1.city)}
                            value={formDataStep1.suburb}
                            searchable
                            nothingFoundMessage="Nothing found..."
                            onChange={(value) =>
                              handleChangeStep1(value, "suburb")
                            }
                          />
                        </Box>
                      </Box>
                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md" tt="capitalize">
                            {vehicle} Info
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7" onClick={openModal}>
                          <Input
                            placeholder={`Select ${vehicle} Info`}
                            size="md"
                            value={
                              selection.make ||
                              selection.model ||
                              selection.variant
                                ? `${selection.make} ${selection.model} ${selection.variant}`
                                : ""
                            }
                            readOnly
                          />
                        </Box>
                      </Box>
                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Registered In
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Select
                            size="md"
                            placeholder="Registered In"
                            data={registrationOptions}
                            value={formDataStep1.registeredIn}
                            searchable
                            nothingFoundMessage="Nothing found..."
                            onChange={(value) =>
                              handleChangeStep1(value, "registeredIn")
                            }
                          />
                        </Box>
                      </Box>
                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Rego
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Input
                            type="date"
                            size="md"
                            placeholder="Date"
                            value={formDataStep1.rego}
                            onChange={(value) =>
                              handleChangeStep1(value.target.value, "rego")
                            }
                          />
                        </Box>
                      </Box>
                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Exterior Color
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Select
                            size="md"
                            placeholder="Exterior Color"
                            data={colorOptions}
                            value={formDataStep1.exteriorColor}
                            onChange={(value) =>
                              handleChangeStep1(value, "exteriorColor")
                            }
                          />
                        </Box>
                      </Box>
                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Mileage
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Input
                            placeholder="0.10"
                            rightSection={
                              <Text span inherit size="xs">
                                KM
                              </Text>
                            }
                            size="md"
                            value={formDataStep1.milage}
                            type="number"
                            onChange={(value) =>
                              handleChangeStep1(value.target.value, "milage")
                            }
                          />
                        </Box>
                        <Box className="col-md-3 text-start">
                          <Flex align="center" gap="xs">
                            <LightBulb styles={{ flex: "1 1 2.5rem" }} />
                            <Text size="sm">
                              We don't allow promotional messages that are not
                              relevant to the ad
                            </Text>
                          </Flex>
                        </Box>
                      </Box>
                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Price
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Input
                            placeholder="54,683,506"
                            rightSection={
                              <Text span inherit size="xs">
                                PKR
                              </Text>
                            }
                            size="md"
                            value={formDataStep1.price}
                            type="number"
                            onChange={(value) =>
                              handleChangeStep1(value.target.value, "price")
                            }
                          />
                        </Box>
                        <Box className="col-md-3 text-start">
                          <Flex align="center" gap="xs">
                            <LightBulb styles={{ flex: "1 1 2.5rem" }} />
                            <Text size="sm">
                              Please enter a realistic price to get more genuine
                              responses.
                            </Text>
                          </Flex>
                        </Box>
                      </Box>
                      <Box className="row align-items-start" mb="md">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Ad Description
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Textarea
                            placeholder="Describe Your car: Example: Alloy rim, first owner, genuine parts, maintained by authorized workshop, excellent mileage, original paint etc."
                            size="md"
                            autosize
                            minRows={6}
                            maxRows={6}
                            fs={8}
                            value={formDataStep1.description}
                            onChange={(e) =>
                              handleChangeStep1(e.target.value, "description")
                            }
                          />
                          <Group gap={0}>
                            <Text size="sm" c="dimmed" ml="auto">
                              Remaining Characters 995
                            </Text>

                            <Button
                              variant="transparent"
                              pr="0"
                              size="md"
                              className="text-primary"
                            >
                              Reset
                            </Button>
                          </Group>
                        </Box>
                      </Box>
                      <Box className="row align-items-start  " mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label
                            required
                            size="md"
                            className="text-primary"
                          >
                            Predefined Template
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7 rounded border p-3 cursor-pointer">
                          <Text size="sm">
                            You can also use these suggestions
                          </Text>
                          <Group gap="sm" mt="md">
                            {carTags.map((tag, index) => (
                              <>
                                <Button
                                  variant="default"
                                  size="sm"
                                  key={`-${index}`}
                                  onClick={() =>
                                    handleDescriptionClick(tag + " ")
                                  }
                                >
                                  <Text size="sm">{tag}</Text>
                                </Button>
                              </>
                            ))}
                          </Group>
                        </Box>
                      </Box>
                      <Box className="row align-items-start" mb="xl">
                        <Box className="col-md-12">
                          <Title order={4} mb="lg">
                            Upload Photos
                          </Title>
                          {/* <ImageUploader /> */}
                          <Dropzone
                            accept={IMAGE_MIME_TYPE}
                            onDrop={handleFileDrop}
                            p={0}
                          >
                            <Image
                              src="/upload.png"
                              className="img-fluid w-100 h-100"
                              alt="Upload Image"
                            />
                          </Dropzone>

                          <SimpleGrid
                            cols={{ base: 2, sm: 3, md: 4, lg: 6, xl: 8 }}
                            mt={previews.length > 0 ? "md" : 0}
                          >
                            {previews}
                          </SimpleGrid>
                        </Box>
                      </Box>
                    </Box>
                    {/* Step 1 ended */}
                  </Card>
                </Stepper.Step>

                <Stepper.Step
                  icon={<HiDocumentAdd />}
                  label="Step 2"
                  description={`Additional ${vehicle} Information`}
                >
                  <Card
                    shadow="0px 4px 20px 0px #00000014"
                    p={{ base: "md", md: "lg" }}
                    className="text-start border-top border-primary border-5"
                  >
                    <Title order={3}>Additional Information</Title>
                    <Box className="stepper-form" mt="xl">
                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Engine Type
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Select
                            size="md"
                            placeholder="Petrol"
                            data={["Petrol", "Diesel", "Electric", "Hybrid"]}
                            value={formDataStep2.engineType}
                            onChange={(value) =>
                              handleInputChangeStep2("engineType", value)
                            }
                          />
                        </Box>
                      </Box>
                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Engine
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Select
                            size="md"
                            placeholder="3.0L V6"
                            data={engineList}
                            value={formDataStep2.engine}
                            onChange={(value) =>
                              handleInputChangeStep2("engine", value)
                            }
                          />
                        </Box>
                      </Box>
                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Engine Capacity
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <NumberInput
                            size="md"
                            placeholder="1300"
                            value={formDataStep2.engineCapacity}
                            onChange={(value) =>
                              handleInputChangeStep2("engineCapacity", value)
                            }
                          />
                        </Box>
                      </Box>
                      {vehicle !== "bike" && (
                        <>
                          <Box className="row align-items-center" mb="xl">
                            <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                              <Input.Label required size="md">
                                Doors
                              </Input.Label>
                            </Box>
                            <Box className="col-md-7">
                              <NumberInput
                                size="md"
                                placeholder="4"
                                value={formDataStep2.doors}
                                onChange={(value) =>
                                  handleInputChangeStep2("doors", value)
                                }
                              />
                            </Box>
                          </Box>
                          <Box className="row align-items-center" mb="xl">
                            <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                              <Input.Label required size="md">
                                Seats
                              </Input.Label>
                            </Box>
                            <Box className="col-md-7">
                              <NumberInput
                                size="md"
                                placeholder="4"
                                value={formDataStep2.seats}
                                onChange={(value) =>
                                  handleInputChangeStep2("seats", value)
                                }
                              />
                            </Box>
                          </Box>
                        </>
                      )}
                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Transmission
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Select
                            size="md"
                            placeholder="Transmission"
                            data={[
                              "Automatic",
                              "Manual",
                              "CVT",
                              "Semi-Automatic",
                            ]}
                            value={formDataStep2.transmission}
                            onChange={(value) =>
                              handleInputChangeStep2("transmission", value)
                            }
                          />
                        </Box>
                      </Box>
                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Drive
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Select
                            size="md"
                            placeholder="Drive"
                            data={driveList}
                            value={formDataStep2.drive}
                            onChange={(value) =>
                              handleInputChangeStep2("drive", value)
                            }
                          />
                        </Box>
                      </Box>
                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Assembly
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Select
                            size="md"
                            placeholder="Local"
                            data={["Local", "Imported"]}
                            value={formDataStep2.assembly}
                            onChange={(value) =>
                              handleInputChangeStep2("assembly", value)
                            }
                          />
                        </Box>
                      </Box>
                      <Box className="row align-items-start" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Body Type
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Grid mb="lg">
                            {bodies?.data?.map((bodyType) => (
                              <Grid.Col
                                span={6}
                                ta="center"
                                key={bodyType.name}
                              >
                                <div className="single-brand-item selected-brand-item text-center">
                                  <label
                                    className={`text-decoration-none ${
                                      formDataStep2.body ===
                                      bodyType.title.toLowerCase()
                                        ? "checked"
                                        : ""
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name="bodyType"
                                      value={bodyType.title.toLowerCase()}
                                      checked={
                                        formDataStep2.body ===
                                        bodyType.title.toLowerCase()
                                      }
                                      onChange={() =>
                                        handleInputChangeStep2(
                                          "body",
                                          bodyType.title.toLowerCase()
                                        )
                                      }
                                    />
                                    <Image
                                      width={80}
                                      height={60}
                                      src={bodyType.bodyImage}
                                      className="mx-auto text-center"
                                      alt={`${bodyType.name} body type`}
                                    />
                                    <h6 className="mb-0 text-dark">
                                      {bodyType.name}
                                    </h6>
                                  </label>
                                </div>
                              </Grid.Col>
                            ))}
                          </Grid>
                        </Box>
                      </Box>
                      <Box className="row align-items-start" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label size="md">Feature</Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Box className="row">
                            <Box className="col-md-4">
                              {featuredListsOne.map((item, index) => (
                                <>
                                  <Checkbox
                                    key={index}
                                    color="#E90808"
                                    label={item.name}
                                    mb="sm"
                                    size="sm"
                                    checked={formDataStep2.features.includes(
                                      item.name
                                    )}
                                    onChange={() =>
                                      handleFeatureChange(item.name)
                                    }
                                  />
                                </>
                              ))}
                            </Box>
                            <Box className="col-md-4">
                              {featuredListsTwo.map((item, index) => (
                                <>
                                  <Checkbox
                                    key={index}
                                    color="#E90808"
                                    label={item.name}
                                    mb="sm"
                                    size="sm"
                                    checked={formDataStep2.features.includes(
                                      item.name
                                    )}
                                    onChange={() =>
                                      handleFeatureChange(item.name)
                                    }
                                  />
                                </>
                              ))}
                            </Box>
                            <Box className="col-md-4">
                              {featuredListsThree.map((item, index) => (
                                <>
                                  <Checkbox
                                    key={index}
                                    color="#E90808"
                                    label={item.name}
                                    mb="sm"
                                    size="sm"
                                    checked={formDataStep2.features.includes(
                                      item.name
                                    )}
                                    onChange={() =>
                                      handleFeatureChange(item.name)
                                    }
                                  />
                                </>
                              ))}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    {/* Step 2 ended */}
                  </Card>
                </Stepper.Step>

                <Stepper.Step
                  icon={<BiSolidUserRectangle />}
                  label="Step 3"
                  description="Contact Information"
                >
                  <Card
                    shadow="0px 4px 20px 0px #00000014"
                    p={{ base: "md", md: "lg" }}
                    className="text-start border-top border-primary border-5"
                  >
                    <Title order={3}>Contact Information</Title>
                    {/* Step 3 content goes here */}
                    <Box className="stepper-form" mt="xl">
                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Mobile Number
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Input
                            type="number"
                            size="md"
                            name="mobileNumber"
                            placeholder="Mobile Number"
                            value={formDataStep3.mobileNumber}
                            onChange={handleChangeStep3}
                            rightSection={<FaMobile color="#222" />}
                          />
                        </Box>
                      </Box>
                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                          <Input.Label required size="md">
                            Secondary Number (Optional)
                          </Input.Label>
                        </Box>
                        <Box className="col-md-7">
                          <Input
                            type="number"
                            size="md"
                            name="secondaryNumber"
                            placeholder="Secondary Number (Optional)"
                            value={formDataStep3.secondaryNumber}
                            onChange={handleChangeStep3}
                          />
                        </Box>
                      </Box>
                      <Box className="row align-items-center" mb="xl">
                        <Box className="col-md-6 offset-2 mb-2 mb-lg-0">
                          <Flex align="center" gap="xl">
                            <Flex align="center" gap="sm">
                              <ThemeIcon
                                variant="filled"
                                radius="lg"
                                size="lg"
                                color="green"
                                sx={{ boxShadow: "0px 4px 20px 0px #00000014" }}
                              >
                                <FaWhatsapp
                                  style={{ width: "60%", height: "60%" }}
                                />
                              </ThemeIcon>
                              Allow WhatsApp Contact
                            </Flex>
                            <Switch size="xl" color="#E90808" />
                          </Flex>
                        </Box>
                      </Box>
                    </Box>
                    {/* Step 3 ended */}
                  </Card>
                </Stepper.Step>

                <Stepper.Completed>
                  <Title py="xl" order={2} fw={600}>
                    Your {vehicle} Ad Has Been Published Successfully!
                  </Title>
                </Stepper.Completed>
              </Stepper>

              <Flex gap="sm" justify="flex-end" mt="md">
                {activeStep > 0 && (
                  <Button
                    variant="light"
                    bg="#ddd"
                    fw={500}
                    color="#333"
                    size="lg"
                    w="130px"
                    onClick={prevStep}
                  >
                    Back
                  </Button>
                )}
                {activeStep < 2 ? (
                  <Button
                    fw={500}
                    color="#E90808"
                    size="lg"
                    w="130px"
                    onClick={nextStep}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    fw={500}
                    color="#E90808"
                    size="lg"
                    onClick={handleSubmit}
                    variant="filled"
                    w="130px"
                  >
                    Submit
                  </Button>
                )}
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>

      <CustomModel
        isOpen={isModalOpen}
        selection={selection}
        setSelection={setSelection}
        onClose={closeModal}
        fetchMakesByTypeData={makes}
      />
    </Box>
  );
};

export default PostAnAd;
