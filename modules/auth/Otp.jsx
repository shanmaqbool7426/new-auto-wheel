import {
  Button,
  Text,
  PinInput,
  Center,
  Title,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useFormSubmission } from "@/custom-hooks/useForm";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { signIn } from "next-auth/react";
import { rem } from "@mantine/core";

function Otp({ email, onSuccess }) {
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
    API_ENDPOINTS.AUTH.VERIFY_OTP,
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
    
    if (result.ok) {
      onSuccess?.();
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
    </>
  );
}

export default Otp;