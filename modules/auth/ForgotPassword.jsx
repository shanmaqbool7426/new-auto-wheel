import { Button, TextInput, Text, Group, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useFormSubmission } from "@/custom-hooks/useForm";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { FaArrowLeft } from "react-icons/fa6";

function ForgotPassword({ onBack, onSuccess }) {
  // Initialize form with validation rules
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Please enter a valid email",
    },
  });

  // Custom hook for form submission
  const { isLoading, error, handleSubmit } = useFormSubmission(
    API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
    form.values,
    form.validate
  );

  // Submit handler for sending the reset link
  const handleForgotPassword = async (e) => {
    const response = await handleSubmit(e);
    if (response && response.ok) {
      onSuccess?.(); // Callback to parent for success handling
    }
  };

  return (
    <>
      <Group mb="lg">
        <Title order={4}>Forgot Password!</Title>
        <Text
          c="dimmed"
          size="sm"
          mt="xs"
        >
          If you've forgotten your account password, Enter your email below and we will send you an email with instructions to reset your account.
        </Text>
      </Group>

      {/* Form Starts */}
      <form>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          className="my-3"
          {...form.getInputProps("email")}
          error={form.errors.email}
        />
        <Button
          fullWidth
          ff="heading"
          tt="uppercase"
          fw={500}
          size="md"
          mb="md"
          color="#E90808"
          loading={isLoading}
          onClick={(e) => handleForgotPassword(e)}
        >
          Send a recovery link
        </Button>
        {error && <Text color="red">{error.message}</Text>}
      </form>
      
      <Text 
        className="text-primary cursor-pointer" 
        fw={400}
        onClick={onBack}
      >
        <Text span inherit>
          <FaArrowLeft /> Back to login
        </Text>
      </Text>
      {/* Form Ends */}
    </>
  );
}

export default ForgotPassword;