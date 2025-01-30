import React from "react";
import {
  Button,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import google_icon from "../../public/auth/google_icon.svg";
import car from "../../public/auth/car.svg";
import facebook_icon from "../../public/auth/facebook_icon.svg";
import email_icon from "../../public/auth/email_icon.svg";
import apple_icon from "../../public/auth/apple_icon.svg";
import { Carousel } from "@mantine/carousel";
import { FaChevronLeft } from "react-icons/fa6";
import "@mantine/carousel/styles.css";
import { signIn } from "next-auth/react";

function SocialsLogin({ onEmailLogin, onSignUp, onBack, accountType }) {
  const handleSocialSignIn = (provider) => {
    signIn(provider, { 
      redirectTo: "/",
      callbackUrl: "/",
      accountType
    });
  };

  return (
    <>
      {onBack && (
        <FaChevronLeft 
          className="cursor-pointer" 
          onClick={onBack}
          style={{ marginBottom: '1rem' }}
        />
      )}
      
      <Carousel withIndicators classNames={{ indicator: "bg-primary mt-10" }}>
        <Carousel.Slide>
          <Stack align="center" gap={0} mb="md" ta="center" pb={"0.4rem"}>
            <Image width={120} height={120} src={car} alt="Car Alert" />
            <Title order={5} fw={600}>
              New Car Alert
            </Title>
            <Text size="sm" w="75%" mt={5} mx="auto">
              Create alerts quickly and get notified when new car available
            </Text>
          </Stack>
        </Carousel.Slide>
        <Carousel.Slide>
          <Stack align="center" gap={0} mb="md" ta="center">
            <Image width={120} height={120} src={car} alt="Car Alert" />
            <Title order={5} fw={600}>
              New Car Alert
            </Title>
            <Text size="sm" w="75%" mt={5} mx="auto">
              Create alerts quickly and get notified when new car available
            </Text>
          </Stack>
        </Carousel.Slide>
      </Carousel>

      <Stack w="80%" mx="auto" align="stretch" justify="center" gap="md">
        <Button
          variant="default"
          size="lg"
          ff="heading"
          leftSection={<Image src={google_icon} alt="Google" />}
          onClick={() => handleSocialSignIn("google")}
        >
          <Text size="sm" fw={600}>
            Continue with Google
          </Text>
        </Button>

        <Button
          variant="default"
          size="lg"
          ff="heading"
          leftSection={<Image src={facebook_icon} alt="Facebook" />}
          onClick={() => handleSocialSignIn("facebook")}
        >
          <Text size="sm" fw={600}>
            Continue with Facebook
          </Text>
        </Button>

        <Button
          variant="default"
          size="lg"
          ff="heading"
          leftSection={<Image src={apple_icon} alt="Apple" />}
          onClick={() => handleSocialSignIn("apple")}
        >
          <Text size="sm" fw={600}>
            Continue with Apple
          </Text>
        </Button>

        <Button
          variant="default"
          size="lg"
          ff="heading"
          leftSection={<Image src={email_icon} alt="Email" />}
          onClick={onEmailLogin}
        >
          <Text size="sm" fw={600}>
            Continue with Email
          </Text>
        </Button>
      </Stack>

      <Text ta="center" size="md" mt="xs">
        Don't have an account?{" "}
        <Text
          span
          fw={600}
          inherit
          className="text-primary primary cursor"
          onClick={onSignUp}
        >
          Sign Up
        </Text>
      </Text>
    </>
  );
}

export default SocialsLogin;