import { Modal, Button, TextInput, Text, Group, rem, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useFormSubmission } from "@/custom-hooks/useForm";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { FaArrowLeft  } from "react-icons/fa6";
import { useState } from "react";
import ResetPassword from "./ResetPassword";


function ForgotPassword({ open, onClose }) {
    const [resetOpen, setResetOpen] = useState(false);
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
  const { isLoading, error, handleSubmit, data } = useFormSubmission(
    API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
    form.values,
    form.validate
  );

  // Submit handler for sending the reset link
  const handleForgotPassword = async (e) => {
    const response = await handleSubmit(e);
    if (response && response.ok) {
      alert("Password reset link sent! Please check your email.");
      onClose();
    //   setResetOpen(true); // Open the reset password modal
    }
  };

  return (
    <>    
    <Modal
      opened={open}
      onClose={onClose}
      withCloseButton={false}
      padding={rem(50)}
      size={rem(527)}
      centered
    >
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
          onClick={(e)=>handleForgotPassword(e)}
        >
          Send a recovery link
        </Button>
        {error && <Text color="red">{error.message}</Text>}
      </form>
      <Text>
            <Text span inherit className="text-primary" fw={400}>
           <FaArrowLeft/>  Back to login
            </Text>
          </Text>
      {/* Form Ends */}
    </Modal>
    <ResetPassword
          open={resetOpen}
          onClose={() => setResetOpen(false)}
        />
    </>
  );
}

export default ForgotPassword;
