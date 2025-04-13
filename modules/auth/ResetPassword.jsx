import { useSearchParams } from "next/navigation";
import { Button, PasswordInput, Text, Group, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useFormSubmission } from "@/custom-hooks/useForm";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from 'sweetalert2';

function ResetPassword({ onSuccess, token: propToken, onBack }) {
  const router = useRouter();
  const { token: urlToken } = useSearchParams();
  const token = propToken || urlToken;
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with validation rules
  const form = useForm({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      newPassword: (value) => {
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return null;
      },
      confirmPassword: (value, values) => {
        if (!value) return "Please confirm your password";
        if (value !== values.newPassword) return "Passwords do not match";
        return null;
      },
    },
  });

  // Custom hook for form submission
  const { handleSubmit } = useFormSubmission(
    API_ENDPOINTS.AUTH.RESET_PASSWORD,
    { password: form.values.newPassword, token },
    form.validate
  );

  // Handle form submission
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if the token is available
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invalid or missing reset token',
        confirmButtonColor: '#E90808'
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await handleSubmit(e);
      if (response && response.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your password has been reset successfully',
          confirmButtonColor: '#E90808',
          showConfirmButton: true,
          timer: 2000
        });
        // Clear the token from URL after successful reset
        router.push("/login");
        onSuccess?.();
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'An error occurred while resetting your password',
        confirmButtonColor: '#E90808'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Group mb="lg">
        <Title order={4}>Reset Password</Title>
        <Text c="dimmed" size="sm" mt="xs">
          Please enter your new password below. Make sure it's secure and easy to remember.
        </Text>
      </Group>

      {/* Form Starts */}
      <form onSubmit={handleResetPassword}>
        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          className="my-3"
          {...form.getInputProps("newPassword")}
          error={form.errors.newPassword}
        />
        <PasswordInput
          label="Confirm New Password"
          placeholder="Re-enter new password"
          className="my-3"
          {...form.getInputProps("confirmPassword")}
          error={form.errors.confirmPassword}
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
          type="submit"
        >
          Reset Password
        </Button>
        <Button
          variant="subtle"
          fullWidth
          onClick={onBack}
          disabled={isLoading}
        >
          Back to Login
        </Button>
      </form>
    </>
  );
}

export default ResetPassword;