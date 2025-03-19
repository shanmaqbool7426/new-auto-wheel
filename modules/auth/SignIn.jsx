import { useForm } from "@mantine/form";
import {
  Button,
  TextInput,
  PasswordInput,
  Text,
  Title,
  Group,
} from "@mantine/core";
import classes from "@/styles/Demo.module.scss";
import { useFormSubmission } from "@/custom-hooks/useForm";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { signIn } from "next-auth/react";
import { FaChevronLeft } from "react-icons/fa6";
import { useState } from "react";
import { notifications } from '@mantine/notifications';

function SignIn({ onForgotPassword, onSignUp, onSuccess, onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Please enter a valid email",
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
    },
  });

  const { error, handleSubmit } = useFormSubmission(
    API_ENDPOINTS.AUTH.LOGIN,
    form.values,
    form.validate
  );

  console.log("isLoading", isLoading);

  const handleSubmitSignIn = async () => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      password: form.values.password,
      email: form.values.email,
      type: "signIn",
      action: "Credentials",
    });
    console.log("result..", result);
    setIsLoading(false);
    if (result.ok) {
      onSuccess?.();
    } else {
      notifications.show({
        title: 'Login Failed',
        message: 'Invalid email or password. Please try again.',
        color: 'red',
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <Group mb="lg">
        {onBack && (
          <FaChevronLeft className="cursor-pointer" onClick={onBack} />
        )}
        <Title order={4}>Let's get you started!</Title>
      </Group>

      <form>
        <TextInput
          label="Email"
          placeholder="Enter email"
          className="my-3"
          classNames={classes}
          {...form.getInputProps("email")}
          error={form.errors.email}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter password"
          {...form.getInputProps("password")}
          error={form.errors.password}
        />
        <Text
          ta="right"
          c="dimmed"
          size="sm"
          mt="xs"
          className="cursor text-primary"
          onClick={onForgotPassword}
        >
          Forgot Password?
        </Text>
        <Button
          tt="uppercase"
          fw={600}
          size="md"
          fullWidth
          color="#E90808"
          autoContrast
          my="md"
          mt="xl"
          ff="heading"
          loading={isLoading}
          loaderProps={{ type: 'dots' }}
          onClick={handleSubmitSignIn}
        >
          Sign In
        </Button>
        {error && <Text color="red">{error.message}</Text>}
        <Text ta="center">
          Don't have an account?{" "}
          <Text 
            span 
            inherit 
            className="text-primary cursor" 
            fw={600}
            onClick={onSignUp}
          >
            Sign up
          </Text>
        </Text>
      </form>
    </>
  );
}

export default SignIn;