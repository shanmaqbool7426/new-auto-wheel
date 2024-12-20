import {
  Modal,
  Button,
  Group,
  Text,
  PinInput,
  Center,
  Title,
  rem,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { useEffect, useState } from "react";
import { useFormSubmission } from "@/custom-hooks/useForm";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import classes from "@/styles/Demo.module.scss";
import { signIn } from "next-auth/react";

function Otp({ otpOpen = false, otpClose = () => {}, email }) {
  const form = useForm({
    initialValues: {
      otp: "",
      email: email,
    },
    validate: {
      otp: (value) => (value.length === 4 ? null : "OTP must be 4 digits"),
    },
  });

  const { isLoading, error, handleSubmit, data } = useFormSubmission(
    API_ENDPOINTS.AUTH.VERIFY_OTP, // Replace with your OTP verification endpoint
    form.values,
    form.validate
  );

  const handleSubmitOtp = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      otp: form.values.otp,
      email: form.values.email,
      type: "otp",
      action: "Credentials",
    });
    result.ok && otpClose();
  };
  useEffect(() => {
    form.setFieldValue("email", email); // This ensures that the form state is always up to date with the latest email value
  }, [email]);

  useEffect(() => {
    if (data && data.success) {
      // notifications.show({
      //   message: data.message,
      //   position:"top-right",
      //   color: "green",
      //   duration: 4000,
      //   ripple: true,
      // })

      // Handle successful OTP verification, e.g., navigate to another page
      otpClose(); // Close OTP modal on successful verification
    }
  }, [data]);
  return (
    <Modal
      opened={otpOpen}
      onClose={otpClose}
      withCloseButton={false}
      padding={rem(50)}
      centered
      size={rem(527)}
    >
      <Title order={4}> Enter Code!</Title>
      <Text mt="xs" mb="lg">
        Enter the code you’ve received on your email account to verify your
        account.
      </Text>
      <Center maw={400} h={100}>
        <PinInput
          {...form.getInputProps("otp")}
          length={4}
          size="lg"
          placeholder=""
          error={form.errors.otp}
        />
      </Center>
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      )}
      <Box px={rem(50)}>
        <Button
          type="submit"
          ff="heading"
          fullWidth
          fw={500}
          size="md"
          mt="xl"
          mb="md"
          color="#E90808"
          disabled={isLoading}
          onClick={handleSubmitOtp}
        >
          {isLoading ? "Loading..." : "Continue"}
        </Button>
      </Box>
    </Modal>
  );
}

export default Otp;
