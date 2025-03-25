"use client"
import {
  Button,
  Text,
  PinInput,
  Center,
  Title,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useFormSubmission } from "@/custom-hooks/useForm";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { signIn } from "next-auth/react";
import { rem } from "@mantine/core";

function Otp({ email, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const form = useForm({
    initialValues: {
      otp: "",
      email: email,
    },
    validate: {
      otp: (value) => (value.length === 4 ? null : "OTP must be 4 digits"),
    },
  });

  const { error, handleSubmit, data } = useFormSubmission(
    API_ENDPOINTS.AUTH.VERIFY_OTP,
    form.values,
    form.validate
  );

  const handleSubmitOtp = async () => {
    const validation = form.validate();
    if (validation.hasErrors) {
      return;
    }

    try {
      setIsLoading(true);
      setSubmitError(null);
      
      const result = await signIn("credentials", {
        redirect: false,
        otp: form.values.otp,
        email: form.values.email,
        type: "otp",
        action: "Credentials",
      });
      
      if (result.ok) {
        onSuccess?.();
      } else {
        setSubmitError(result.error || "Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      setSubmitError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    form.setFieldValue("email", email);
  }, [email]);

  useEffect(() => {
    if (data?.success) {
      onSuccess?.();
    }
  }, [data]);

  const displayError = submitError || error;

  return (
    <>
      <Title order={4}>Enter Code!</Title>
      <Text mt="xs" mb="lg">
        Enter the code you've received on your email account to verify your
        account.
      </Text>
      
      <Center maw={400} h={100} className="m-[auto]">
        <PinInput
          {...form.getInputProps("otp")}
          length={4}
          size="lg"
          placeholder=""
          error={form.errors.otp}
          disabled={isLoading}
        />
      </Center>
      
      {displayError && (
        <div style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
          {displayError}
        </div>
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
          loading={isLoading}
        >
          {isLoading ? "Verifying..." : "Continue"}
        </Button>
      </Box>
    </>
  );
}

export default Otp;