import { useSearchParams } from "next/navigation";
import { Button, PasswordInput, Text, Group, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useFormSubmission } from "@/custom-hooks/useForm";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { useRouter } from "next/navigation";

function ResetPassword({ onSuccess, token: propToken }) {
  const router = useRouter();
  const { token: urlToken } = useSearchParams(); // Get the token from URL query params
  const token = propToken || urlToken; // Use prop token or fallback to URL token

  // Initialize form with validation rules
  const form = useForm({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      newPassword: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
      confirmPassword: (value, values) =>
        value === values.newPassword ? null : "Passwords do not match",
    },
  });

  // Custom hook for form submission
  const { isLoading, error, handleSubmit } = useFormSubmission(
    API_ENDPOINTS.AUTH.RESET_PASSWORD,
    { password: form.values.newPassword, token },
    form.validate
  );

  // Handle form submission
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if the token is available
    if (!token) {
      alert("Invalid or missing token");
      return;
    }

    const response = await handleSubmit(e);
    if (response && response.ok) {
      alert("Password has been reset successfully!");
      onSuccess?.();
      router.push("/login"); // Redirect to login page after success
    }
  };

  return (
    <>
      <Group mb="lg">
        <Title order={4}>Reset Password!</Title>
        <Text c="dimmed" size="sm" mt="xs">
          Set the new password for your account so you can log in and access all the features.
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
        {error && <Text color="red">{error.message}</Text>}
      </form>
    </>
  );
}

export default ResetPassword;