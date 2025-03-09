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
import {carTags} from "@/mock-data/mock-array";
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
    milage: z.coerce.string().min(1, 'Mileage is required'),
    price: z.coerce.string().min(1, 'Price is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    images: z.array(z.any()).min(1, 'At least one image is required'),
    make: z.string().min(1, 'Make is required'),
    model: z.string().min(1, 'Model is required'),
    variant: z.string().min(1, 'Variant is required'),
    engineType: z.string().min(1, 'Engine type is required'),
    engine: z.string().min(1, 'Engine is required'),
    engineCapacity: z.number().min(1, 'Engine capacity is required'),
    drive: z.string().min(1, 'Drive type is required'),
    transmission: z.string().min(1, 'Transmission is required'),
    assembly: z.string().min(1, 'Assembly is required'),
    seats: z.number().min(1, 'Number of seats is required'),
    doors: z.number().min(1, 'Number of doors is required'),
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
      seats: "",
      doors: "",
      body: "",
      engineCapacity: "",
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
      fields: ['year', 'city', 'suburb', 'make', 'model', 'variant', 'registeredIn', 'rego', 'exteriorColor', 'milage', 'price', 'description', 'images'],
    },
    {
      label: 'Vehicle Details',
      fields: ['engineType', 'engine', 'drive', 'seats', 'doors', 'body', 'engineCapacity', 'transmission', 'assembly', 'features'],
    },
    {
      label: 'Contact Information',
      fields: ['mobileNumber', 'secondaryNumber', 'allowWhatsAppContact'],
    },
  ];


  // Custom Hooks and Data
  const {
    bodies,
    drives,
    transmissions,
    fuelTypes,
    colors,
    province
  } = useVehicleData(vehicleType);

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

  useEffect(() => {
    const fetchAdData = async () => {
      if (vehicleId && session?.user?.token?.token) {
        try {
          const { data } = await fetchVehicleBySellerByVehicleId(session?.user?.token?.token, vehicleId);
          const regoDate = data.rego ? new Date(data.rego).toISOString().split('T')[0] : '';
          form.setFieldValue('year', data.year.toString() || "");
          form.setFieldValue('province', data.province || "");
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
          form.setFieldValue('engineCapacity', data.specifications?.engineCapacity || "");
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
    } else {
      form.reset()
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
          if (!vehicleId || form.values.features.length === 0) {
            const vehicleData = response.data;
            const features = [];
  
            // Get predefined features based on vehicle type
            const predefinedFeatures = getFeaturesByVehicle(vehicle);
            const allPredefinedFeatures = [
              ...predefinedFeatures.featuredListsOne,
              ...predefinedFeatures.featuredListsTwo,
              ...predefinedFeatures.featuredListsThree
            ].map(f => f.name);
  
            if (vehicle === 'car') {
              // Safety features
              if (vehicleData.safety?.abs && allPredefinedFeatures.includes('ABS')) 
                features.push('ABS');
              if (vehicleData.safety?.airbags > 0 && allPredefinedFeatures.includes('Air Bags')) 
                features.push('Air Bags');
              
              // Comfort features
              if (vehicleData.comfort?.ac && allPredefinedFeatures.includes('Air Conditioning')) 
                features.push('Air Conditioning');
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
              if (vehicleData.entertainment?.cdDvdPlayer && allPredefinedFeatures.includes('CD Player')) 
                features.push('CD Player');
              if (vehicleData.entertainment?.frontSpeakers && allPredefinedFeatures.includes('Front Speakers')) 
                features.push('Front Speakers');
              if (vehicleData.entertainment?.rearSeatEntertainment && allPredefinedFeatures.includes('Rear Seat Entertainment')) 
                features.push('Rear Seat Entertainment');
              if (vehicleData.entertainment?.usbAndAux && allPredefinedFeatures.includes('USB and Auxillary Cable')) 
                features.push('USB and Auxillary Cable');
  
              // Exterior features
              if (vehicleData.exterior?.alloyWheels && allPredefinedFeatures.includes('Alloy Rims')) 
                features.push('Alloy Rims');
              if (vehicleData.exterior?.sunRoof && allPredefinedFeatures.includes('Sun Roof')) 
                features.push('Sun Roof');
  
            } else if (vehicle === 'bike') {
              if (vehicleData.engine?.type?.includes('ABS') && allPredefinedFeatures.includes('ABS')) 
                features.push('ABS');
              if (vehicleData.starting?.toLowerCase().includes('electric') && allPredefinedFeatures.includes('Electric Start')) 
                features.push('Electric Start');
              if (vehicleData.wheelSize && allPredefinedFeatures.includes('Alloy Wheels')) 
                features.push('Alloy Wheels');
              
            } else if (vehicle === 'truck') {
              if (vehicleData.safety?.abs && allPredefinedFeatures.includes('ABS')) 
                features.push('ABS');
              if (vehicleData.safety?.hillAssist && allPredefinedFeatures.includes('Hill Assist')) 
                features.push('Hill Assist');
              if (vehicleData.comfort?.ac && allPredefinedFeatures.includes('Air Conditioning')) 
                features.push('Air Conditioning');
              if (vehicleData.comfort?.powerSteering && allPredefinedFeatures.includes('Power Steering')) 
                features.push('Power Steering');
              if (vehicleData.chassis?.airBrakeSystem && allPredefinedFeatures.includes('Air Brakes')) 
                features.push('Air Brakes');
            }
  
            // Only set features if we found some
            if (features.length > 0) {
              form.setFieldValue('features', features);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching vehicle details:", error);
        });
    }
  }, [selection.variant, vehicleId]);


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
    await formSchema.parseAsync(values);
    // Create payload
    const payload = createPayload(values, vehicle, session);
    const headers = { "Content-Type": "application/json" };
    try {
      if (vehicleId && isVehicle?._id) {
        await submitUpdateFormData(
          API_ENDPOINTS.VEHICLE.Update(isVehicle?._id),
          JSON.stringify(payload), session?.user?.token?.token
        );
      } else {
        await submitFormData(
          API_ENDPOINTS.VEHICLE.ADD,
          JSON.stringify(payload),
          headers
        );
      }
      showNotification({
        title: "Post an ad",
        message: "Your ad has been posted successfully.",
        color: "green",
      });
      router.push(`/listing/${vehicle}s`);
    } catch (error) {
      console.error(error);
      showNotification({
        title: "Post an ad",
        message: error.message || "Something went wrong",
        color: "red",
      });
    }
  };

  /**
* Form Validation and Navigation
*/
  const validateStep = (stepIndex) => {
    const currentStepFields = steps[stepIndex].fields;
    const validationResult = currentStepFields.reduce((acc, field) => {
      const fieldError = form.validateField(field);
      return acc && !fieldError.hasError;
    }, true);
    return validationResult;
  };

  /**
   * Step Navigation
   */
  const nextStep = (e) => {
    e.preventDefault();
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
                  completedIcon={<IconCircleCheck />}
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
                          <FormFieldSelect label="Year"
                            placeholder={new Date().getFullYear().toString()} data={yearList}
                            {...form.getInputProps('year')} nothingFoundMessage="No year found" />
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
                          <FormFieldInput label={`${vehicle} Info`} placeholder={`Select ${vehicle} Info`}
                            value={`${form.values.make || ""} ${form.values.model || ""} ${form.values.variant || ""}`}
                            error={form.errors.make || form.errors.model || form.errors.variant}
                            readOnly
                            onClick={openModal}
                          />
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
                            data={colors?.map(color => ({
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
                        </Box>
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
                            data={fuelTypes?.map((item) => {
                              return { value: item.slug, label: item?.title }
                            })}
                            {...form.getInputProps('engineType')}
                          />
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <FormFieldSelect label="Engine"
                            placeholder="Engine"
                            data={engineList}
                            {...form.getInputProps('engine')}
                          />
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <FormFieldNumberInput label="Engine Capacity"
                            placeholder="Engine Capacity"
                            {...form.getInputProps('engineCapacity')}
                          />
                        </Box>
                        {vehicle !== "bike" && (
                          <>
                            <Box className="row align-items-center" mb="xl">
                              <FormFieldNumberInput label="Doors"
                                placeholder="Doors"
                                {...form.getInputProps('doors')}
                                maxLength={1}
                              />
                            </Box>
                            <Box className="row align-items-center" mb="xl">
                              <FormFieldNumberInput label="Seats"
                                placeholder="Seats"
                                {...form.getInputProps('seats')}
                                maxLength={1}
                              />
                            </Box>
                          </>
                        )}
                        <Box className="row align-items-center" mb="xl">
                          <FormFieldSelect label="Transmission"
                            placeholder="Transmission"
                            data={transmissions?.map((item) => {
                              return { value: item.slug, label: item?.title }
                            })}
                            {...form.getInputProps('transmission')}
                          />
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <FormFieldSelect label="Drive"
                            placeholder="Drive"
                            data={drives?.map((item) => {
                              return { value: item.slug, label: item?.title }
                            })}
                            {...form.getInputProps('drive')}
                          />
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <FormFieldSelect label="Assembly"
                            placeholder="Assembly"
                            data={transmissions?.map((item) => {
                              return { value: item.slug, label: item?.title }
                            })}
                            {...form.getInputProps('assembly')}
                          />
                        </Box>
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
                              <Switch size="xl" color="#E90808" {...form.getInputProps('allowWhatsapp')} />
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
