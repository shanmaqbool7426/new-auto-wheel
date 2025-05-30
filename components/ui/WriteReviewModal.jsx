"use client";
import {
  ActionIcon,
  Box,
  Card,
  Flex,
  Group,
  Image,
  Input,
  List,
  Modal,
  Paper,
  Rating,
  rem,
  Text,
  Textarea,
  Title,
  Button,
} from "@mantine/core";
import React, { useState } from "react";
import {
  EmohiVeryHappy,
  EmojiDisappointed,
  EmojiHappy,
  EmojiPlain,
  EmojiSad,
} from "../Icons";
import { FaStar } from "react-icons/fa6";
import axios from "axios";
import CustomModel from "@/constants/CustomModel";
import { showNotification } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { useSelector } from "react-redux";



const WriteReviewModal = ({
  opened,
  typeImg, 
  close,
  fetchMakesByTypeData,
  fetchReviews,
  vehicleType
}) => {
  const { data: session } = useSession();
  

  const srcImags = {
    bike: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745138819525_SPORTS-1.png",
    car: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745139115381_carr%5D.jfif",
    truck: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745139151794_trucck.jfif"
  }
  
  const [ratings, setRatings] = useState({
    mileage: 0,
    safety: 0,
    comfort: 0,
    maintenance: 0,
    performance: 0,
    features: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [wantRatings, setWantRatings] = useState(false);
  const [selection, setSelection] = useState({
    make: "",
    model: "",
    variant: "",
  });
  
  const user = useSelector((state) => state.auth);

  const clearForm = () => {
    setWantRatings(false);
    setSelection({ make: "", model: "", variant: "" });
    setReviewText("");
    setReviewTitle("");
    setRatings({
      mileage: 0,
      safety: 0,
      comfort: 0,
      maintenance: 0,
      performance: 0,
      features: 0,
    });
    close();
  };
  const handleRatingChange = (category, value) => {
    setRatings((prevRatings) => {
      const updatedRatings = { ...prevRatings, [category]: value };
      const totalRatings = Object.values(updatedRatings).reduce(
        (sum, rating) => sum + rating,
        0
      );
      setAverageRating(
        (totalRatings / Object.keys(updatedRatings).length).toFixed(1)
      );
      return updatedRatings;
    });
  };



  const getIcon = (value, selectedColor) => {
    const iconProps = { style: { marginRight: rem(5) }, selectedColor };
    switch (value) {
      case 1:
        return <EmojiSad {...iconProps} />;
      case 2:
        return <EmojiDisappointed {...iconProps} />;
      case 3:
        return <EmojiPlain {...iconProps} />;
      case 4:
        return <EmojiHappy {...iconProps} />;
      case 5:
        return <EmohiVeryHappy {...iconProps} />;
      default:
        return null;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      vehicle: [selection?.make, selection?.model, selection?.variant]
        .filter(Boolean)
        .join(' '),
      ratings,
      type: fetchMakesByTypeData?.data[0]?.type,
      reviewText,
      reviewTitle,
      reviewBy: session?.user?.name || session?.user?.fullName,
    };
    if (!selection?.make || !selection?.model) {
      showNotification({
        title: "Please select atleast one make and model",
        color: "red",
      });
      return;
    }
    if (!reviewText?.trim()) {
      showNotification({
        title: "Please write detail of your review",
        color: "red",
      });
      return;
    }
    if (!reviewTitle?.trim()) {
      showNotification({
        title: "Please write title of your review",
        color: "red",
      });
      return;
    }
    try {
      setLoading(true);
      await axios.post(API_ENDPOINTS.REVIEWS.SUBMIT, reviewData, {
        headers: { "Content-Type": "application/json" , "Authorization": `${user?.token}`},

      });

      if (fetchReviews) await fetchReviews();
      showNotification({
        title: "Review Submitted",
        message: "Your review has been submitted successfully.",
        color: "green",
      });
      clearForm();
      setLoading(false);
    } catch (err) {
      showNotification({
        title: "Something Went Wrong",
        message: err?.response?.data?.message,
        color: "red",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={clearForm}
        withCloseButton={false}
        padding={40}
        size={rem(992)}
      // title={
      //   <Title size={rem(20)}>
      //     Rate & Review {selection.make} {selection.model} {selection.variant}{" "}
      //     and Win
      //   </Title>
      // }
      >
        {/* <Box className="row" mb="lg">
          <Box className="col-md-12">
            <Title size={rem(20)}>
              Rate & Review {selection.make} {selection.model}{" "}
              {selection.variant} and Win
            </Title>
          </Box>
        </Box> */}
        <form onSubmit={handleSubmit}>
          <Box className="row">
            <Box className="col-md-12">
              <Title size={rem(20)} mb="lg">
                Latest Reviews of {selection.make} {selection.model}{" "}
                {selection.variant}
              </Title>
            </Box>
            <Box className="col-md-7">
              <Card
                shadow="0px 4px 20px 0px #00000014"
                padding={0}
                mb="md"
                target="_blank"
                withBorder
              >
                <Flex align="center" gap="sm">
                  <Card.Section>
                    <Image
                      src={srcImags[fetchMakesByTypeData?.data[0]?.type] }
                      alt="No way!"
                      w={100}
                      h="100%"
                    />
                  </Card.Section>
                  <Box p="md" style={{ width: '100%' }}>
                    <Text size="sm" c="dimmed" fw={400}>
                      Rate And Review
                    </Text>
                    <Flex align="center" justify="space-between">
                      <Text fw={700} size="lg" style={{ textTransform: 'uppercase' }}>
                        {selection.make && selection.model
                          ? `${selection.make} ${selection.model} ${selection.variant || ''}`.trim()
                          : "Select Vehicle"}
                      </Text>
                      <ActionIcon
                        color="#E90808"
                        variant="subtle"
                        onClick={() => {
                          setIsModalOpen(true);
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.5 8.62492V10.4999H3.375L8.905 4.96992L7.03 3.09492L1.5 8.62492ZM10.705 3.16992L8.83 1.29492L7.565 2.56492L9.44 4.43992L10.705 3.16992Z"
                            fill="currentColor"
                          />
                        </svg>
                      </ActionIcon>
                    </Flex>
                  </Box>
                </Flex>
              </Card>

              {/* Rate your Experience section */}
              {wantRatings && (
                <>
                  <Box>
                    <Title order={4} fw={600} mt="md" mb="md">
                      Rate your Experience
                    </Title>
                    {Object.keys(ratings).map((category) => (
                      <Group key={category} mb="sm">
                        <Text w="20ch">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Text>
                        <Rating
                          emptySymbol={(value) => getIcon(value, "#B1B1B1")}
                          fullSymbol={(value) => getIcon(value, "#FFC513")}
                          highlightSelectedOnly
                          value={ratings[category]}
                          onChange={(value) => handleRatingChange(category, value)}
                        />
                      </Group>
                    ))}
                  </Box>
                </>
              )}

              <Paper bg="#F3F3F3" ta="center" p="lg" mb="md">
                <Flex justify="center" align="center" gap="md">
                  <Title order={5} fw={600} mb="sm">
                    Your Overall Rating:
                  </Title>
                  <ActionIcon
                    color="#E90808"
                    variant="subtle"
                    onClick={() => {
                      setWantRatings(true);
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 8.62492V10.4999H3.375L8.905 4.96992L7.03 3.09492L1.5 8.62492ZM10.705 3.16992L8.83 1.29492L7.565 2.56492L9.44 4.43992L10.705 3.16992Z"
                        fill="currentColor"
                      />
                    </svg>
                  </ActionIcon>
                </Flex>
                <Flex justify="center" align="center" gap="5">
                  <FaStar fontSize={rem(24)} color="#FFA236" />
                  <Text fw={600} size={rem(24)}>
                    {averageRating}
                  </Text>
                </Flex>
              </Paper>

              <Box mb="md">
                <Textarea
                  placeholder="Share the details of your experience"
                  rows={4}
                  size="md"
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <Text c="dimmed" size="sm" mt={5} ta="end">
                  Minimum 100 characters
                </Text>
              </Box>
              <Box mb="md">
                <Input
                  size="md"
                  placeholder="Title of your Review"
                  onChange={(e) => setReviewTitle(e.target.value)}
                />
                <Text c="dimmed" size="sm" mt={5} ta="end">
                  Minimum 100 characters
                </Text>
              </Box>
              <Button
                color="#E90808"
                fullWidth
                size="md"
                type="submit"
                loading={loading}
              >
                Submit Review
              </Button>
            </Box>
            <Box className="col-md-5">
              <Paper
                p="lg"
                shadow="0px 4px 20px 0px #00000014"
                withBorder
                style={{ textWrap: "balance", borderColor: "#F3F3F3" }}
              >
                <Group mb="md">
                  <Image src="/bulb-icon.svg" alt="Bulb Icon" />
                  <Text fw={600}>Tips for a Good Review</Text>
                </Group>
                <List
                  c="dimmed"
                  spacing="md"
                  listStyleType="disc"
                  size="sm"
                  style={{ textWrap: "balance" }}
                >
                  <List.Item>
                    Tell us about your buying experience and why you shortlisted
                    this car
                  </List.Item>
                  <List.Item>List out the pros and cons of your car</List.Item>
                  <List.Item>
                    Talk about the overall performance of your car, mileage,
                    pickup, comfort level, etc
                  </List.Item>
                  <List.Item>
                    How's the after-sales service and what are the costs
                    involved
                  </List.Item>
                  <List.Item>Give a suitable title to your review</List.Item>
                  <List.Item>
                    Don't use all caps and avoid sharing personal details here
                  </List.Item>
                </List>
              </Paper>
            </Box>
          </Box>
        </form>
      </Modal>
      <CustomModel
        isOpen={isModalOpen}
        selection={selection}
        setSelection={setSelection}
        onClose={() => setIsModalOpen(false)}
        fetchMakesByTypeData={fetchMakesByTypeData}
        hide={vehicleType === "bike" ? true : false}
      />
    </>
  );
};

export default WriteReviewModal;
