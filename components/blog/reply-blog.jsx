"use client";
import React, { useState, useEffect } from "react";
import { Box, Text, Title, TextInput, Button, Checkbox, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useFormSubmission } from "@/custom-hooks/useForm";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

const ReplyBlog = ({ blog, onCommentSubmit }) => {
  const [isClient, setIsClient] = useState(false);
  const savedFormData = isClient ? JSON.parse(localStorage.getItem("replyForm")) || {} : {};
  const [saveDetails, setSaveDetails] = useState(!!savedFormData.isChecked);

  const form = useForm({
    initialValues: {
      name: savedFormData.name || "",
      email: savedFormData.email || "",
      content: "",
      postId: blog?._id || "",
    },

    validate: {
      name: (value) => (value ? null : "Name is required"),
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email format",
      content: (value) => (value ? null : "Message content is required"),
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Save form data when checkbox state changes
  const handleCheckboxChange = (event) => {
    const checked = event.currentTarget.checked;
    setSaveDetails(checked);

    if (checked) {
      const formDataToSave = {
        name: form.values.name,
        email: form.values.email,
        isChecked: true,
      };
      localStorage.setItem("replyForm", JSON.stringify(formDataToSave));
    } else {
      localStorage.removeItem("replyForm");
    }
  };

  // Update saved data when form values change
  useEffect(() => {
    if (saveDetails && isClient) {
      const formDataToSave = {
        name: form.values.name,
        email: form.values.email,
        isChecked: true,
      };
      localStorage.setItem("replyForm", JSON.stringify(formDataToSave));
    }
  }, [form.values.name, form.values.email, saveDetails, isClient]);

  const { isLoading, error, handleSubmit, data } = useFormSubmission(
    API_ENDPOINTS.COMMENTS.BASE,
    form.values,
    form.validate
  );

  const onSubmit = async (values) => {
    await handleSubmit(values).then(() => {
      if (!error) {
        if (!saveDetails) {
          form.reset();
        } else {
          form.setFieldValue('content', '');
        }
        onCommentSubmit?.();
      }
    });
  };

  if (!isClient) return null;

  return (
    <Box component="section" mt="xl">
      <Title order={3} mb="xs">
        Leave a reply
      </Title>
      <Text mb="md">
        Your email address will not be published. Required fields are marked
      </Text>
      <form onSubmit={onSubmit}>
        <Box className="row">
          <Box className="col-md-6" mb="md">
            <TextInput
              size="md"
              label="Name*"
              placeholder="Enter Name"
              required
              {...form.getInputProps("name")}
            />
          </Box>
          <Box className="col-md-6" mb="md">
            <TextInput
              label="Email*"
              placeholder="Enter Email"
              required
              size="md"
              {...form.getInputProps("email")}
            />
          </Box>
          <Box className="col-md-12" mb="md">
            <Textarea
              size="md"
              label="Message*"
              required
              rows={5}
              maxRows={5}
              {...form.getInputProps("content")}
            />
          </Box>
          <Box className="col-md-12" my="lg">
            <Checkbox
              label="Save my name, email, and website in this browser for the next time I comment."
              size="md"
              checked={saveDetails}
              onChange={handleCheckboxChange}
            />
          </Box>
          <Box className="col-md-12">
            <Button
              type="submit"
              size="md"
              color="red"
              loading={isLoading}
            >
              Post Comment
            </Button>
          </Box>
        </Box>
        {error && (
          <Text c="red" mt="md">
            {error.message || "Something went wrong"}
          </Text>
        )}
      </form>
    </Box>
  );
};

export default ReplyBlog;
