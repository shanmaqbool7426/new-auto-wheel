import {
  Button,
  TextInput,
  PasswordInput,
  Text,
  Checkbox,
  Title,
  Alert,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useFormSubmission } from "@/custom-hooks/useForm";
import { validateSignUpForm } from "@/utils/validation";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { IconInfoCircle } from "@tabler/icons-react";
import { FaChevronLeft } from "react-icons/fa6";

function SignUp({ 
  onSignIn, // callback to switch to sign in view
  onSuccess, // callback when signup is successful (will pass email to OTP)
  onBack, // callback to go back to previous view
  accountType // passed from account type selection
}) {
  const [agreeError, setAgreeError] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      fullName: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
      accountType: accountType || 'Personal',
    },
    validate: validateSignUpForm,
  });

  const {
    isLoading,
    error,
    handleSubmit,
    data = {},
  } = useFormSubmission(API_ENDPOINTS.AUTH.SIGNUP, form.values, form.validate);
  
  useEffect(() => {
    if (data && data?.success) {
      onSuccess?.(form.values.email);
    }
  }, [data]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!form.values.agreeToTerms) {
      setAgreeError(true);
      return;
    }

    setAgreeError(false);
    handleSubmit(event);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Group align="center" mb="md">
          {onBack && (
            <FaChevronLeft className="cursor-pointer" onClick={onBack} />
          )}
          <Title order={4}>Let's get you started!</Title>
        </Group>

        <TextInput
          withAsterisk
          label="Full Name"
          placeholder="William John"
          mb="md"
          {...form.getInputProps("fullName")}
          error={form.errors.fullName}
        />

        <TextInput
          label="Email"
          placeholder="abc@gmail.com"
          mb="md"
          {...form.getInputProps("email")}
          error={form.errors.email}
        />

        <TextInput
          label="Phone"
          placeholder="+1 342 456 7856"
          mb="md"
          {...form.getInputProps("phone")}
          error={form.errors.phone}
        />

        <PasswordInput
          label="Password"
          placeholder="*********"
          mb="md"
          {...form.getInputProps("password")}
          error={form.errors.password}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="*********"
          mb="md"
          {...form.getInputProps("confirmPassword")}
          error={form.errors.confirmPassword}
        />

        <Checkbox
          mb="md"
          size="sm"
          label={
            <>
              I agree with{" "}
              <strong className="text-decoration-underline">
                Privacy Policy
              </strong>{" "}
              and <strong className="text-decoration-underline">Terms</strong>{" "}
              and Conditions.
            </>
          }
          {...form.getInputProps("agreeToTerms", { type: "checkbox" })}
          onChange={(e) => {
            form.setFieldValue("agreeToTerms", e.currentTarget.checked);
            if (e.currentTarget.checked) {
              setAgreeError(false);
            }
          }}
        />

        {agreeError && (
          <Text color="red" size="sm" mt="xs">
            You must agree to the terms and conditions.
          </Text>
        )}

        {error && (
          <Alert
            mb="md"
            variant="light"
            color="red"
            withCloseButton
            title={error}
            icon={<IconInfoCircle />}
          />
        )}

        <Button
          type="submit"
          fullWidth
          ff="heading"
          tt="uppercase"
          fw={500}
          size="md"
          mb="md"
          color="#E90808"
          loading={isLoading}
        >
          Submit
        </Button>

        <Text ta="center">
          Already have an account?{" "}
          <Text
            span
            className="primary cursor"
            fw={600}
            onClick={onSignIn}
          >
            Sign in
          </Text>
        </Text>
      </form>
    </>
  );
}

export default SignUp;