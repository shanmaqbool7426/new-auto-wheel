import {
  Modal,
  Button,
  PasswordInput,
  Text,
  Checkbox,
  TextInput,
  Title,
  Notification,
  CloseIcon,
  ActionIcon,
  CloseButton,
  Group,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

import SignIn from "./SignIn";
import Otp from "./Otp";
import { useFormSubmission } from "@/custom-hooks/useForm";
import { validateSignUpForm } from "@/utils/validation";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { IconInfoCircle } from "@tabler/icons-react";

function SignUp({ signUpOpened, signUpOnClose }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalOpenedOtp, setModalOpenedOtp] = useState(false);
  const [agreeError, setAgreeError] = useState(false); // State to manage checkbox error

  const form = useForm({
    initialValues: {
      email: "",
      fullName: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false, // Add agree to terms in initialValues
    },
    validate: validateSignUpForm,

  });

  const {
    isLoading,
    error,
    handleSubmit,
    data = {},
  } = useFormSubmission(API_ENDPOINTS.SIGNUP, form.values, form.validate);


  const handleClose = () => {
    // form.reset(); // Reset form fields when modal closes
    signUpOnClose();
  };

  useEffect(() => {
    if (data && data?.success) {
      setModalOpenedOtp(true);
      handleClose();
    }
  }, [data]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!form.values.agreeToTerms) {
      setAgreeError(true); // Set error if checkbox is not checked
      return;
    }
    
    setAgreeError(false); // Reset the error if checkbox is checked
    handleSubmit(event); // Proceed with form submission
  };


  return (
    <>
      <Modal
        opened={signUpOpened}
        onClose={handleClose} // Use modified handleClose function
        withCloseButton={false}
        padding="xl"
        size="lg"
      >
        <form onSubmit={handleFormSubmit}>
          <Group justify="space-between" align="center" mb="md">
            <Title order={4} tt="uppercase">
              Let’s get you started!
            </Title>
            <CloseButton onClick={handleClose} ml="auto" />
          </Group>
          <TextInput
            withAsterisk
            label="Full Name"
            placeholder="William John"
            mb="md"
            key={form.key("fullName")}
            {...form.getInputProps("fullName")}
            error={form.errors.fullName && form.errors.fullName}
          />
          <TextInput
            label="Email"
            placeholder="abc@gmail.com"
            mb="md"
            key={form.key("email")}
            {...form.getInputProps("email")}
            error={form.errors.email && form.errors.email}
          />
          <TextInput
            label="Phone"
            placeholder="+1 342 456 7856"
            mb="md"
            key={form.key("phone")}
            {...form.getInputProps("phone")}
            error={form.errors.phone && form.errors.phone}
          />
          <PasswordInput
            label="Password"
            placeholder="*********"
            mb="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
            error={form.errors.password && form.errors.password}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="*********"
            mb="md"
            key={form.key("confirmPassword")}
            {...form.getInputProps("confirmPassword")}
            error={form.errors.confirmPassword && form.errors.confirmPassword}
          />
          <Checkbox
            mb="md"
            size="sm"
            label={
              <>
                I agree with <b>Privacy Policy</b> and <b>Terms</b> and
                Conditions.
              </>
            }
            checked={form.values.agreeToTerms}
            {...form.getInputProps("agreeToTerms", { type: "checkbox" })} // Bind form input props
            onChange={(e) => {
              form.setFieldValue("agreeToTerms", e.currentTarget.checked);
              if (e.currentTarget.checked) {
                setAgreeError(false)
              };
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
              title={error && error}
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
            <b
              className="primary cursor"
              onClick={() => {
                setModalOpened(true);
                handleClose();
              }}
            >
              Sign in
            </b>
          </Text>
        </form>
      </Modal>
      <SignIn
        signOpen={modalOpened}
        signInClose={() => setModalOpened(false)}
      />
      <Otp otpOpen={modalOpenedOtp} otpClose={() => setModalOpenedOtp(false)} email={form.values?.email}/>
    </>
  );
}


export default SignUp;
