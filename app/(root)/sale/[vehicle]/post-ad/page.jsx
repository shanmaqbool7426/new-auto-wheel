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
  Stepper,
  Group,
  Input,
  Switch,
  ThemeIcon,
  TextInput,
} from "@mantine/core";
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
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
import CustomModel from "@/constants/CustomModel";
import { fetchMakesByType, fetchNewVehicleDetail } from "@/services/vehicles";
import { submitFormData, submitUpdateFormData } from "@/services/forms";
import { API_ENDPOINTS, BASE_URL } from "@/constants/api-endpoints";
import { useRouter } from "next/navigation";
import { carTags } from "@/mock-data/mock-array";
import { fetchVehicleBySellerByVehicleId } from "@/actions";
import { showNotification } from "@mantine/notifications";
import LocationSelector from "@/components/LocationSelector";
import { useVehicleData } from '@/app/(root)/sale/[vehicle]/post-ad/components/useVehicleData';
import { capitalize } from "@/utils";
import { FormFieldInput, FormFieldSelect, FormFieldNumberInput, FormFieldTextarea, FormFieldBodyType, FormFieldFeature, FormFieldImageUpload } from "@/app/(root)/sale/[vehicle]/post-ad/components/FormFields";
import ColorSwatch from "@/app/(root)/sale/[vehicle]/post-ad/components/ColorSwatch";
import { getFeaturesByVehicle } from "@/app/(root)/sale/[vehicle]/post-ad/components/useFeatureData";
import { createPayload, generateYearList, getEngineListByVehicle } from "@/app/(root)/sale/[vehicle]/post-ad/components/helpers";

const PostAnAd = (params) => {
  // State Management
  const { data: session } = useSession();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [images, setImages] = useState([]);
  const [makes, setMakes] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isVehicle, setIsVehicle] = useState({});

  // URL and Vehicle Type Processing
  const vehicle = params?.params?.vehicle;
  const vehicleId = params?.searchParams?.vehicleId;
  const vehicleTypes = ["car", "bike", "truck"];
  const url = new URL(window.location.href);
  const pathSegments = url.pathname.split("/");
  const vehicleType = vehicleTypes.find(type => pathSegments.includes(type));

  // Form Schema and Initialization
  const formSchema = z.object({
    condition: z.enum(['used', 'new']),
    year: z.string().min(1, 'Year is required'),
    city: z.string().min(1, 'City is required'),
    suburb: z.string().min(1, 'Suburb is required'),
    province: z.string().optional(),
    registeredIn: z.string().min(1, 'Registration location is required'),
    rego: z.string().min(1, 'Registration date is required'),
    exteriorColor: z.string().min(1, 'Color is required'),
    condition: z.string().min(1, 'Condition is required'),
    milage: z.coerce.string().min(1, 'Mileage is required'),
    price: z.coerce.string().min(1, 'Price is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    images: z.array(z.any()).min(1, 'At least one image is required'),
    make: z.string().min(1, 'Make is required'),
    model: z.string().min(1, 'Model is required'),
    variant: z.string().min(1, 'Variant is required'),
    engineType: z.string().min(1, 'Engine type is required'),
    engineCapacity: z.number().min(1, 'Engine capacity is required'),
    drive: z.string().min(1, 'Drive type is required'),
    transmission: z.string().min(1, 'Transmission is required'),
    assembly: z.string().min(1, 'Assembly is required'),
    body: z.string().min(1, 'Body type is required'),
    features: z.array(z.string()).min(1, 'Select at least one feature'),
    mobileNumber: z.string()
      .regex(/^[\d]{10,15}$/, 'Invalid mobile number format').min(10, 'Mobile number must be at least 10 digits'),
    secondaryNumber: z.string().optional(),
    allowWhatsAppContact: z.boolean(),
  });
  const form = useForm({
    validate: zodResolver(formSchema),
    initialValues: {
      condition: "used",
      year: "",
      city: "",
      suburb: "",
      province: "",
      registeredIn: "",
      rego: "",
      exteriorColor: "",
      milage: "",
      price: "",
      make: "",
      model: "",
      variant: "",
      description: "",
      images: [],
      engineType: "",
      engine: "",
      drive: "",
      body: "",
      engineCapacity: 0,
      transmission: "",
      assembly: "",
      features: [],
      mobileNumber: "",
      secondaryNumber: "",
      allowWhatsAppContact: false,
    },
  });

  // Form Steps Configuration
  const steps = [
    {
      label: 'Basic Information',
      fields: ['year', 'city', 'suburb', 'make', 'model', 'variant', 'registeredIn', 'rego', 'exteriorColor', 'condition', 'milage', 'price', 'description', 'images'],
    },
    {
      label: 'Vehicle Details',
      fields: ['engineType', 'drive', 'body', 'engineCapacity', 'transmission', 'assembly', 'features'],
    },
    {
      label: 'Contact Information',
      fields: ['mobileNumber', 'secondaryNumber', 'allowWhatsAppContact'],
    },
  ];
  // Assembly data set
  const assemblyData = ["local", "imported"];

  // Custom Hooks and Data
  const {
    bodies,
    drives,
    transmissions,
    fuelTypes,
    colors,
    province
  } = useVehicleData(vehicleType);

  console.log("....colors", colors)
  // Selection State Management
  const [selection, setSelection] = useState({
    make: "",
    model: "",
    variant: "",
  });

  const [locationSelection, setLocationSelection] = useState({
    city: "",
    province: "",
    suburb: "",
  });

  /**
 * Effect Hooks
 */
  useEffect(() => {
    form.setFieldValue('province', locationSelection?.province?.name || "");
    form.setFieldValue('city', locationSelection?.city?.name || "");
    form.setFieldValue('suburb', locationSelection?.suburb?.name || "");
  }, [locationSelection]);

  useEffect(() => {
    form.setFieldValue('make', selection.make);
    form.setFieldValue('model', selection.model);
    form.setFieldValue('variant', selection.variant);
  }, [selection]);

  useEffect(() => {
    const getMakes = async () => {
      if (vehicle) {
        const response = await fetchMakesByType(vehicle);
        setMakes(response);
      }
    };
    getMakes();
  }, [vehicle]);

  // need Fuel Type Data Set [Petrol, Diesel, Electric, Hybrid]



  useEffect(() => {
    const fetchAdData = async () => {
      if (vehicleId && session?.user?.token?.token) {
        try {
          const { data } = await fetchVehicleBySellerByVehicleId(session?.user?.token?.token, vehicleId);
          const regoDate = data.rego ? new Date(data.rego).toISOString().split('T')[0] : '';
          form.setFieldValue('year', data.year.toString() || "");
          form.setFieldValue('province', data.province || "");
          form.setFieldValue('condition', data.condition || "");
          form.setFieldValue('city', data.city || "");
          form.setFieldValue('suburb', data.cityArea || "");
          form.setFieldValue('registeredIn', capitalize(data.registeredIn) || "");
          form.setFieldValue('rego', regoDate || "");
          form.setFieldValue('exteriorColor', data.specifications?.exteriorColor || "");
          form.setFieldValue('milage', data.specifications?.mileage || "");
          form.setFieldValue('price', data.price || "");
          form.setFieldValue('description', data.description || "");
          form.setFieldValue('images', data.images || []);
          form.setFieldValue('engineType', data.specifications?.engineType || "");
          form.setFieldValue('engine', data.specifications?.engine || "");
          form.setFieldValue('drive', data.specifications?.drive || "");
          form.setFieldValue('seats', data.specifications?.seats || "");
          form.setFieldValue('doors', data.specifications?.doors || "");
          form.setFieldValue('body', data.specifications?.bodyType || "");
          form.setFieldValue('engineCapacity', data.specifications?.displacement || "");
          form.setFieldValue('transmission', data.specifications?.transmission || "");
          form.setFieldValue('assembly', data.specifications?.assembly || "");
          form.setFieldValue('features', data.features || []);
          form.setFieldValue('mobileNumber', data.contactInfo?.mobileNumber || "");
          form.setFieldValue('secondaryNumber', data.contactInfo?.secondaryNumber || "");
          form.setFieldValue('allowWhatsAppContact', data.contactInfo?.allowWhatsAppContact || false);

          setSelection({
            make: data.Info?.make || "",
            model: data.Info?.model || "",
            variant: data.Info?.variant || "",
          });

          // Handle images if they exist
          if (data.images?.length > 0) {
            setImages(data.images);
          }
          setIsVehicle(data)
        } catch (error) {
          setIsVehicle({})
          console.error('Error fetching ad:', error);
        }
      }
    };

    if (vehicleId) {
      fetchAdData();
    }
  }, [vehicleId, session]);

  useEffect(() => {
    if (selection.make && selection.model && selection.variant) {
      const queryParams = new URLSearchParams({
        make: selection.make,
        model: selection.model,
        variant: selection.variant
      }).toString();

      fetchNewVehicleDetail(BASE_URL + `/api/new-vehicles/get-newVehicle-details?${queryParams}`)
        .then((response) => {
          if (!vehicleId) {
            const vehicleData = response.data;

            console.log("vehicleData...")

            // Prefill vehicle specifications
            if (vehicleData.engine) {
              form.setFieldValue('engineType', vehicleData.engine.type?.toLowerCase() || "");
              form.setFieldValue('engineCapacity', vehicleData.engine.displacement || "");
            }

            if (vehicleData.transmission) {
              const transmission = transmissions.find(item => item._id === vehicleData.transmission.type);
              form.setFieldValue('transmission', transmission?.title || "");
            }

            if (vehicleData.drive) {
              form.setFieldValue('drive', vehicleData.drive || "");
            }
            // Set drive type if available
            if (vehicleData.suspensionSteeringBrakes?.steeringType) {

              // form.setFieldValue('drive', vehicleData.suspensionSteeringBrakes.steeringType.toLowerCase() || "");
            }

            // Set assembly (you might need to map this from your data)
            if (vehicleData.assembly) {
              // You can set a default assembly based on make or other criteria
              form.setFieldValue('assembly', vehicleData.assembly); // or 'imported' based on your logic
            }

            // Set body type
            if (vehicleData.bodyType) {
              form.setFieldValue('body', vehicleData.bodyType || "");
            }

            // Get predefined features and set them
            const features = [];
            const predefinedFeatures = getFeaturesByVehicle(vehicle);
            const allPredefinedFeatures = [
              ...predefinedFeatures.featuredListsOne,
              ...predefinedFeatures.featuredListsTwo,
              ...predefinedFeatures.featuredListsThree
            ].map(f => f.name);

            // Safety features
            if (vehicleData.safety?.abs && allPredefinedFeatures.includes('ABS'))
              features.push('ABS');
            // immobilizer
            if (vehicleData.safety?.immobilizer && allPredefinedFeatures.includes('Immobilizer Key'))
              features.push('Immobilizer Key');
            if (vehicleData.safety?.airbags > 0 && allPredefinedFeatures.includes('Air Bags'))
              features.push('Air Bags');

            if (vehicleData.safety.antiTheftLock) {
              features.push('Anti Theft Lock');
            }
            if (vehicleData.safety.windShield) {
              features.push('Wind Shield');
            }
            if (vehicleData.safety.ledLight) {
              features.push('Led Light');
            }

            // Disc Brakes
            if (vehicleData.safety.discBrake) {
              features.push('Disc Brakes');
            }
            // Comfort features
            if (vehicleData.comfort?.ac && allPredefinedFeatures.includes('Air Conditioning'))
              features.push('Air Conditioning');
            // coolBox
            if (vehicleData.comfort?.coolBox && allPredefinedFeatures.includes('Cool Box'))
              features.push('Cool Box');
            // navigation
            if (vehicleData.comfort?.navigation && allPredefinedFeatures.includes('Navigation System'))
              features.push('Navigation System');
            // Rear Camera
            if (vehicleData.comfort?.rearCamera && allPredefinedFeatures.includes('Rear Camera'))
              features.push('Rear Camera');
            // Front Camera
            if (vehicleData.comfort?.frontCamera && allPredefinedFeatures.includes('Front Camera'))
              features.push('Front Camera');
            if (vehicleData.comfort?.climateControl && allPredefinedFeatures.includes('Climate Control'))
              features.push('Climate Control');
            if (vehicleData.comfort?.rearAcVents && allPredefinedFeatures.includes('Rear AC Vents'))
              features.push('Rear AC Vents');
            if (vehicleData.comfort?.powerWindows && allPredefinedFeatures.includes('Power Windows'))
              features.push('Power Windows');
            if (vehicleData.comfort?.powerSteering && allPredefinedFeatures.includes('Power Steering'))
              features.push('Power Steering');
            if (vehicleData.comfort?.powerMirrors && allPredefinedFeatures.includes('Power Mirrors'))
              features.push('Power Mirrors');
            if (vehicleData.comfort?.powerDoorLocks && allPredefinedFeatures.includes('Power Locks'))
              features.push('Power Locks');
            if (vehicleData.comfort?.cruiseControl && allPredefinedFeatures.includes('Cruise Control'))
              features.push('Cruise Control');
            if (vehicleData.comfort?.keylessEntry && allPredefinedFeatures.includes('Keyless Entry'))
              features.push('Keyless Entry');
            if (vehicleData.comfort?.steeringSwitches && allPredefinedFeatures.includes('Steering Switches'))
              features.push('Steering Switches');

            // Entertainment features
            if (vehicleData.entertainment?.cdDvdPlayer && allPredefinedFeatures.includes('CD/DVD Player'))
              features.push('CD/DVD Player');
            if (vehicleData.entertainment?.frontSpeakers && allPredefinedFeatures.includes('Front Speakers'))
              features.push('Front Speakers');
            if (vehicleData.entertainment?.rearSpeakers && allPredefinedFeatures.includes('Rear Speakers'))
              features.push('Rear Speakers');
            if (vehicleData.entertainment?.rearSeatEntertainment && allPredefinedFeatures.includes('Rear Seat Entertainment'))
              features.push('Rear Seat Entertainment');
            if (vehicleData.entertainment?.usbAndAux && allPredefinedFeatures.includes('USB and Auxillary Cable'))
              features.push('USB and Auxillary Cable');
            if (vehicleData.entertainment?.amfmRadio && allPredefinedFeatures.includes('AM/FM Radio'))
              features.push('AM/FM Radio');
            if (vehicleData.entertainment?.cassettePlayer && allPredefinedFeatures.includes('Cassette Player'))
              features.push('Cassette Player');

            // Exterior features
            if (vehicleData.exterior?.alloyWheels && allPredefinedFeatures.includes('Alloy Rims'))
              features.push('Alloy Rims');
            if (vehicleData.exterior?.sunRoof && allPredefinedFeatures.includes('Sun Roof'))
              features.push('Sun Roof');

            // Only set features if we found some and there are no existing features
            if (features.length > 0 && form.values.features.length === 0) {
              form.setFieldValue('features', features);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching vehicle details:", error);
        });
    }
  }, [selection.variant, vehicleId]);

  console.log("....form.values", form.values)


  /**
   * Modal Open and Close Functions
   */
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openLocationModal = () => setIsLocationOpen(true);
  const closeLocationModal = () => setIsLocationOpen(false);


  const handleDescriptionClick = (template) => {
    if (form.getValues().description.length + template.length <= 980) {
      form.setFieldValue('description', form.getValues().description + template);
    }
  };

  /**
   * Form Submission
   */
  const handleSubmit = async (values) => {
    try {
      // Validate entire form
      await formSchema.parseAsync(values);

      // Create payload with proper type conversion
      const payload = createPayload({
        ...values,
        engineCapacity: Number(values.engineCapacity),
        price: Number(values.price),
        milage: Number(values.milage)
      }, vehicle, session);

      // Submit data
      if (vehicleId && isVehicle?._id) {
        await submitUpdateFormData(
          API_ENDPOINTS.VEHICLE.Update(isVehicle?._id),
          payload,
          session?.user?.token?.token
        );
      } else {
        await submitFormData(
          API_ENDPOINTS.VEHICLE.ADD,
          payload,
          { "Content-Type": "application/json" }
        );
      }

      showNotification({
        title: "Success",
        message: "Your ad has been posted successfully.",
        color: "green",
      });
      router.push(`/listing/${vehicle}s`);

    } catch (error) {
      console.error('Form submission error:', error);
      showNotification({
        title: "Error",
        message: error.errors?.[0]?.message || "Please check all required fields",
        color: "red",
      });
    }
  };

  /**
* Form Validation and Navigation
*/
  const validateStep = async (stepIndex) => {
    const currentStepFields = steps[stepIndex].fields;
    let isValid = true;

    for (const field of currentStepFields) {
      const validation = await form.validateField(field);
      if (validation.hasError) {
        isValid = false;
        // Show error notification for first error
        showNotification({
          title: "Validation Error",
          message: validation.error,
          color: "red"
        });
        break;
      }
    }
    return isValid;
  };

  /**
   * Step Navigation
   */
  const nextStep = async (e) => {
    e.preventDefault();
    const isValid = await validateStep(activeStep);
    // if (!isValid) return;

    setActiveStep((prev) => prev + 1);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setActiveStep((prev) => prev - 1);
  };


  /**
   * Engine List
   */
  const engineList = getEngineListByVehicle(vehicle);

  /**
   * Year List
   */
  const yearList = generateYearList();


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
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Box className="col-lg-12 text-center">
                <Stepper
                  active={activeStep}
                  color="#E90808"
                  completedIcon={
                    vehicle == "bike" ? (
                      <FaMotorcycle />
                    ) : vehicle == "truck" ? (
                      <FaTruck />
                    ) : (
                      <FaCar />
                    )
                  }

                >
                  {/*--------------- STEP 1 ---------------*/}
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
                      <Box className="stepper-form" mt="xl">

                        <Box className="row align-items-center" mb="xl">
                          <FormFieldInput label={`${vehicle} Info`} placeholder={`Select ${vehicle} Info`}
                            value={`${form.values.make || ""} ${form.values.model || ""} ${form.values.variant || ""}`}
                            error={form.errors.make || form.errors.model || form.errors.variant}
                            readOnly
                            onClick={openModal}
                          />
                        </Box>

                        <Box className="row align-items-center" mb="xl">
                          <FormFieldSelect label="Year"
                            placeholder={new Date().getFullYear().toString()} data={yearList}
                            {...form.getInputProps('year')} nothingFoundMessage="No year found" />
                        </Box>

                        <Box className="row align-items-center" mb="xl">
                          <FormFieldSelect label="Condition"
                            placeholder="Condition"
                            data={["Used","Pre Owned","Certified Pre-owned"]}
                            {...form.getInputProps('condition')}
                          />
                        </Box>

                        <Box className="row align-items-center" mb="xl">
                          <FormFieldInput label="Location" placeholder="Select Location"
                            value={`${form.values.city || ""} ${form.values.suburb || ""}`}
                            error={form.errors.city || form.errors.suburb}
                            readOnly
                            onClick={openLocationModal}
                          />
                          <Box className="col-md-3 text-start">
                            <Group gap="xs" align="center" wrap="nowrap">
                              <LightBulb styles={{ marginTop: "-8px" }} />
                              <Text size="sm">
                                We don't allow duplicates of same ad.
                              </Text>
                            </Group>
                          </Box>
                        </Box>

                        <Box className="row align-items-center" mb="xl">
                          <FormFieldSelect label="Registered In"
                            placeholder="Registered In"
                            data={province?.map((item) => {
                              return { label: item.name, value: item.name }
                            })}
                            {...form.getInputProps('registeredIn')}
                          />
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <FormFieldInput label="Rego" placeholder="Rego"
                            type="date"
                            value={form.values.rego}
                            {...form.getInputProps('rego')}
                          />
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <FormFieldSelect label="Exterior Color"
                            placeholder="Exterior Color"
                            data={colors?.colors?.map(color => ({
                              value: color.title,
                              label: color.title,
                              color: color.code,
                            }))}
                            {...form.getInputProps('exteriorColor')}
                            itemComponent={({ color, label }) => (
                              <ColorSwatch color={color} title={label} />
                            )}
                            styles={{
                              item: {
                                padding: '8px 12px',
                              }
                            }}
                          />
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <FormFieldInput label="Mileage" placeholder="Mileage"
                            type="number"
                            value={form.values.milage}
                            {...form.getInputProps('milage')}
                            rightSection={
                              <Text span inherit size="xs">
                                KM
                              </Text>
                            }
                          />
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
                            <TextInput
                              placeholder="54,683,506"
                              rightSection={
                                <Text span inherit size="xs">
                                  PKR
                                </Text>
                              }
                              size="md"
                              type="number"
                              {...form.getInputProps('price')}
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
                          <FormFieldTextarea
                            label="Ad Description"
                            placeholder="Describe Your car: Example: Alloy rim, first owner, genuine parts, maintained by authorized workshop, excellent mileage, original paint etc."
                            reset={() => form.setFieldValue('description', '')}
                            maxLength={1000}
                            remainingCharacters={1000 - form.values.description.length}
                            {...form.getInputProps('description')}
                          />
                        </Box>
                        {vehicleType == "car" && <Box className="row align-items-start  " mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label
                              required
                              size="md"
                              className="text-primary"
                            >
                              Predefined Template
                            </Input.Label>
                          </Box>
                          <Box className="col-md-10 rounded border p-3 cursor-pointer">
                            <Text size="sm">
                              You can also use these suggestions
                            </Text>
                            <Group gap="sm" mt="md">
                              {carTags.map((tag, index) => (
                                <>
                                  <Button
                                    variant="default"
                                    size="sm"
                                    style={
                                      {
                                        color: "#E90808",
                                        borderRadius: "20px",
                                        borderColor: "#E90808",
                                      }
                                    }
                                    key={`${tag}-${index}`}
                                    onClick={() =>
                                      handleDescriptionClick(tag + ". ")
                                    }
                                  >
                                    <Text size="sm">{tag}</Text>
                                  </Button>
                                </>
                              ))}
                            </Group>
                          </Box>
                        </Box>}
                        <Box className="row align-items-start" mb="xl">
                          <FormFieldImageUpload label="Upload Photos" images={images} setImages={setImages} form={form} />
                        </Box>
                      </Box>
                    </Card>
                  </Stepper.Step>
                  {/*--------------- STEP 2---------------*/}
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
                          <FormFieldSelect label="Engine Type"
                            placeholder="Engine Type"
                            valueData={form.values.engineType.charAt(0).toUpperCase() + form.values.engineType.slice(1)}
                            data={fuelTypes?.map((item) => item.title.charAt(0).toUpperCase() + item.title.slice(1))}
                            {...form.getInputProps('engineType')}
                          />
                        </Box>
                        {/* <Box className="row align-items-center" mb="xl">
                          <FormFieldSelect label="Engine"
                            placeholder="Engine"
                            data={engineList}
                            {...form.getInputProps('engine')}
                          />
                        </Box> */}
                        {vehicleType != "bike" && <Box className="row align-items-center" mb="xl">
                          <FormFieldNumberInput label="Engine Capacity"
                            placeholder="Engine Capacity"
                            {...form.getInputProps('engineCapacity')}
                          />
                        </Box>}

                        {vehicleType != "bike" && <Box className="row align-items-center" mb="xl">
                          <FormFieldSelect label="Transmission"
                            placeholder="Transmission"
                            valueData={form.values.transmission.charAt(0).toUpperCase() + form.values.transmission.slice(1)}
                            data={transmissions?.map((item) => item.title.charAt(0).toUpperCase() + item.title.slice(1))}
                            {...form.getInputProps('transmission')}
                          />
                        </Box>}
                        {console.log("drives...", drives)}
                        {vehicleType != "bike" && <Box className="row align-items-center" mb="xl">
                          <FormFieldSelect label="Drive"
                            placeholder="Drive"
                            valueData={form.values.drive.charAt(0).toUpperCase() + form.values.drive.slice(1)}
                            data={drives?.map((item) => item.title.charAt(0).toUpperCase() + item.title.slice(1))}
                            {...form.getInputProps('drive')}
                          />
                        </Box>}
                        {vehicleType != "bike" && <Box className="row align-items-center" mb="xl">
                          <FormFieldSelect label="Assembly"
                            placeholder="Assembly"
                            valueData={form.values.assembly.charAt(0).toUpperCase() + form.values.assembly.slice(1)}
                            data={["Local", "Imported"]}
                            {...form.getInputProps('assembly')}
                          />
                        </Box>}
                        <Box className="row align-items-start" mb="xl">
                          <FormFieldBodyType label="Body Type" bodies={bodies} form={form} />
                        </Box>
                        <Box className="row align-items-start" mb="xl">
                          <FormFieldFeature label="Feature" form={form} vehicleType={vehicle} />
                        </Box>
                      </Box>
                    </Card>
                  </Stepper.Step>
                  {/*--------------- STEP 3---------------*/}
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
                          <FormFieldInput label="Mobile Number" placeholder="Mobile Number"
                            type="number"
                            value={form.values.mobileNumber}
                            {...form.getInputProps('mobileNumber')}
                            rightSection={<FaMobile color="#222" />}
                          />
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <FormFieldInput label="Secondary Number (Optional)" placeholder="Secondary Number (Optional)"
                            type="number"
                            value={form.values.secondaryNumber}
                            {...form.getInputProps('secondaryNumber')}
                            required={false}
                            rightSection={<FaMobile color="#222" />}
                          />
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
                              <Switch size="xl" color="#E90808" {...form.getInputProps('allowWhatsAppContact')} />
                            </Flex>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  </Stepper.Step>
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
                      onClick={() => prevStep()}
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
                      onClick={(e) => nextStep(e)}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      fw={500}
                      color="#E90808"
                      size="lg"
                      variant="filled"
                      w="130px"
                      type="submit"
                      loading={form.submitting}
                    >
                      Submit
                    </Button>
                  )}
                </Flex>
              </Box>
            </form>
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
      <LocationSelector
        isOpen={isLocationOpen}
        onClose={closeLocationModal}
        selection={locationSelection}
        setSelection={setLocationSelection}
      />
    </Box>
  );
};

export default PostAnAd;
