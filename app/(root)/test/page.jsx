"use client";
import { useState } from 'react';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import {
  Stepper,
  Button,
  Group,
  TextInput,
  Box,
  Select,
  NumberInput,
  Title,
  Card,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';

// Define the form schema
const formSchema = z.object({
  // Personal Details
  condition: z.enum(['used', 'new']),
  year: z.string().min(1, 'Year is required'),
  city: z.string().min(1, 'City is required'),
  suburb: z.string().min(1, 'Suburb is required'),
  province: z.string().min(1, 'Province is required'),
  registeredIn: z.string().min(1, 'Registration location is required'),
  rego: z.string().min(1, 'Registration number is required'),
  exteriorColor: z.string().min(1, 'Color is required'),
  milage: z.string().min(1, 'Mileage is required'),
  price: z.string().min(1, 'Price is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  images: z.array(z.any()).min(1, 'At least one image is required'),
  Info: z.object({
    make: z.string().min(1, 'Make is required'),
    model: z.string().min(1, 'Model is required'),
    variant: z.string().min(1, 'Variant is required'),
  }),
  
  // Vehicle Details
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number()
    .min(1900, 'Year must be after 1900')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  
  // Price Details
  price: z.number().min(1, 'Price must be greater than 0'),
  negotiable: z.boolean().optional(),
});

export default function StepperForm() {
  const [active, setActive] = useState(0);

  // Initialize form with Zod schema
  const form = useForm({
    validate: zodResolver(formSchema),
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      negotiable: false,
    },
  });

  // Step configurations
  const steps = [
    {
      label: 'Personal Details',
      fields: ['year', 'province', 'city', 'suburb', 'registeredIn', 'rego', 'exteriorColor', 'milage', 'price', 'description', 'images'],
    },
    {
      label: 'Vehicle Details',
      fields: ['make', 'model', 'year'],
    },
    {
      label: 'Price Details',
      fields: ['price'],
    },
  ];

  // Validate current step
  const validateStep = (stepIndex) => {
    const currentStepFields = steps[stepIndex].fields;
    const validationResult = currentStepFields.reduce((acc, field) => {
      const fieldError = form.validateField(field);
      return acc && !fieldError.hasError;
    }, true);
    return validationResult;
  };

  const nextStep = () => {
    if (validateStep(active)) {
      setActive((current) => current + 1);
    } else {
      notifications.show({
        title: 'Validation Error',
        message: 'Please fill all required fields correctly',
        color: 'red',
      });
    }
  };

  const prevStep = () => {
    setActive((current) => current - 1);
  };

  const handleSubmit = async (values) => {
    try {
      // Validate entire form before submission
      await formSchema.parseAsync(values);
      
      // Submit form data
      notifications.show({
        title: 'Success',
        message: 'Form submitted successfully!',
        color: 'green',
      });
    } catch (error) {
      console.error('Validation error:', error);
      notifications.show({
        title: 'Error',
        message: 'Please check all fields and try again',
        color: 'red',
      });
    }
  };

  return (
    <Box p={40}>
      <Title order={2} mb="xl">Vehicle Listing Form</Title>
      
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stepper active={active} breakpoint="sm" mb="xl">
          {/* Step 1: Personal Details */}
          <Stepper.Step label="Personal Details" description="Your information">
            <Card shadow="sm" p="lg">
              <TextInput
                label="Year"
                placeholder="Enter your year"
                {...form.getInputProps('year')}
                mb="md"
              />
              <TextInput
                label="Province"
                placeholder="Enter your province"
                {...form.getInputProps('province')}
                mb="md"
              />
              <TextInput  
                label="City"
                placeholder="Enter your city"
                {...form.getInputProps('city')}
              />
              <TextInput
                label="Suburb"
                placeholder="Enter your suburb"
                {...form.getInputProps('suburb')}
                mb="md"
              />
              <TextInput
                label="Registered In"
                placeholder="Enter your registered in"
                {...form.getInputProps('registeredIn')}
                mb="md"
              />
              <TextInput
                label="Rego"
                placeholder="Enter your rego"
                {...form.getInputProps('rego')}
                mb="md"
              />
              <TextInput
                label="Exterior Color"
                placeholder="Enter your exterior color"
                {...form.getInputProps('exteriorColor')}
                mb="md"
              />
              <TextInput
                label="Mileage"
                placeholder="Enter your mileage"
                {...form.getInputProps('milage')}
                mb="md"
              />
              <TextInput
                label="Price"
                placeholder="Enter your price"
                {...form.getInputProps('price')}
                mb="md"
              />
              <TextInput
                label="Description"
                placeholder="Enter your description"
                {...form.getInputProps('description')}
                mb="md"
              />
              <TextInput
                label="Make"
                placeholder="Enter your make"
                {...form.getInputProps('make')}
                mb="md"
              />
              <TextInput
                label="Model"
                placeholder="Enter your model"
                {...form.getInputProps('model')}
                mb="md"
              />
              <TextInput
                label="Variant"
                placeholder="Enter your variant"
                {...form.getInputProps('variant')}
                mb="md"
              />
            </Card>
          </Stepper.Step>

          {/* Step 2: Vehicle Details */}
          <Stepper.Step label="Vehicle Details" description="Vehicle information">
            <Card shadow="sm" p="lg">
              <Select
                label="Make"
                placeholder="Select make"
                data={['Toyota', 'Honda', 'Ford', 'BMW']}
                {...form.getInputProps('make')}
                mb="md"
              />
              <Select
                label="Model"
                placeholder="Select model"
                data={['Corolla', 'Civic', 'Focus', '3 Series']}
                {...form.getInputProps('model')}
                mb="md"
              />
              <NumberInput
                label="Year"
                placeholder="Enter year"
                min={1900}
                max={new Date().getFullYear()}
                {...form.getInputProps('year')}
              />
            </Card>
          </Stepper.Step>

          {/* Step 3: Price Details */}
          <Stepper.Step label="Price Details" description="Set your price">
            <Card shadow="sm" p="lg">
              <NumberInput
                label="Price"
                placeholder="Enter price"
                min={0}
                {...form.getInputProps('price')}
              />
            </Card>
          </Stepper.Step>
        </Stepper>

        <Group justify="flex-end" mt="xl">
          {active > 0 && (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}
          {active < steps.length - 1 ? (
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button type="submit" color="green">
              Submit
            </Button>
          )}
        </Group>
      </form>
    </Box>
  );
}