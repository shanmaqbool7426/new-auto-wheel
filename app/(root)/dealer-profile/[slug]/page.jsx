"use client";
import React, { useEffect, useState } from "react";
import {
  Anchor, Box, Button, Card, Title, Text, Image, Flex, Rating, Table,
  Paper, Select, Pagination, Group, Stack, List, ThemeIcon, rem,
  CheckIcon, BackgroundImage, Center,
  Modal,
  Input,
  Textarea,
  Checkbox,
  Radio,
  ActionIcon,
  Popover,
} from "@mantine/core";
// import {
//   Anchor,
//   Box,
//   Card,
//   Title,
//   Text,
//   Image,
//   Flex,
//   Rating,
//   Table,
//   Select,
//   Stack,
//   Pagination,
//   Modal,
//   Button,
//   FileInput,
//   Input,
//   Textarea,
//   Checkbox,
//   Group,
//   Radio,
//   rem,
// } from "@mantine/core";
import {
  IconCheck, IconRosetteDiscountCheckFilled, IconUserFilled, IconX
} from "@tabler/icons-react";
import {
  FaClock, FaEnvelope, FaLocationDot, FaMobile, FaPhone, FaThumbsDown,
  FaThumbsUp, FaUserCheck, FaUserLarge, FaUserPlus, FaWhatsapp
} from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import BrowseByType from "@/modules/home/BrowseByType";
import Link from "next/link";
import { BASE_URL } from "@/constants/api-endpoints";
import { useRouter, useParams } from 'next/navigation';
import { useDisclosure } from "@mantine/hooks";
import { getLocalStorage } from "@/utils";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => <div style={{ height: "100%", background: "#f0f0f0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading map...</div>
});

const DealerRating = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [showAllHours, setShowAllHours] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState(null);

  const [opened, { open, close }] = useDisclosure(false);
  const initialReviewForm = {
    title: '',
    content: '',
    // rating: 0,
    buyingProcess: 0,
    vehicleSelection: 0,
    levelOfServices: 0,
  }
  const [reviewForm, setReviewForm] = useState(initialReviewForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { slug } = useParams();
  const token = getLocalStorage('token');

  const getUserProfile = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/user/profile/${slug}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };

  // Function to get coordinates from address
  const getLatLng = async (address) => {
    if (!address) return null;

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: 'Punjab, Lahore, Johar Town',
            format: "json",
            limit: 1,
          },
        }
      );

      console.log("response", response)
      if (response.data.length > 0) {
        const location = response.data[0];
        return { lat: parseFloat(location.lat), lng: parseFloat(location.lon) };
      } else {
        console.log("Location not found for address:", address);
        return null;
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      return null;
    }
  };

  const fetchReviews = async () => {
    // if (!profile) return;
    // setReviewsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/user-reviews/dealer/${slug}`, {
        method: 'GET',
        headers: {
          'Authorization': token?.token?.token
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      setReviews(data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviewsError(error.message);
    } finally {
      setReviewsLoading(false);
    }
  };
  const fetchProfileAndStatus = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/user/profile/${slug}`, {
        headers: {
          'Authorization': token?.token?.token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfile(data.data);
      // Set follow status from the profile data
      setIsFollowing(data.data.isFollowing || false);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };// Combine profile fetch and follow status check in one useEffect


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };


    if (slug) {
      fetchReviews()
      fetchProfile();
      fetchProfileAndStatus();
    }
  }, [slug]);

  // Get map coordinates when profile is loaded
  useEffect(() => {
    if (profile && profile.locationAddress) {
      const fetchCoordinates = async () => {
        const coordinates = await getLatLng(profile.locationAddress);
        if (coordinates) {
          setMapCoordinates(coordinates);
        }
      };

      fetchCoordinates();
    }
  }, [profile]);

  const isDealer = () => {
    return token?.token?.user?._id === slug
  }
  useEffect(() => {
    if (profile) {

      setIsFollowing(profile.followers.includes(token?.token?.user?._id)); // Assuming you have access to the current user's ID
      // console.log('token.token.userId',token.token.user?_id)
    }
  }, [profile])

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data found</div>;

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`${BASE_URL}/api/user-reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token?.token?.token
        },
        body: JSON.stringify({
          ...reviewForm,
          dealerId: profile._id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const data = await response.json();

      // Calculate new average rating from reviews
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0) +
        ((reviewForm.buyingProcess + reviewForm.vehicleSelection + reviewForm.levelOfServices) / 3);
      const newAverageRating = totalRating / (reviews.length + 1);

      // Update profile with calculated rating and increment review count
      setProfile(prev => ({
        ...prev,
        rating: newAverageRating,
        reviewCount: (prev.reviewCount || 0) + 1
      }));

      // Fetch updated reviews
      fetchReviews();

      // Show success notification
      notifications.show({
        title: 'Success',
        message: 'Review submitted successfully',
        color: 'green',
        icon: <IconCheck size={16} />,
        autoClose: 3000,
      });

      // Close modal and reset form
      close();
      setReviewForm(initialReviewForm);

    } catch (error) {
      setSubmitError(error.message);
      notifications.show({
        title: 'Error',
        message: 'Failed to submit review',
        color: 'red',
        icon: <IconX size={16} />,
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleLikeDislike = async (reviewId, action) => {
    try {
      const response = await fetch(`${BASE_URL}/api/user-reviews/${reviewId}/like-dislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token?.token?.token
        },
        body: JSON.stringify({ action })
      });

      if (!response.ok) {
        throw new Error('Failed to update like/dislike');
      }

      const data = await response.json();

      // Update the reviews state with the new like/dislike counts
      setReviews(reviews.map(review =>
        review?._id === reviewId
          ? {
            ...review,
            likes: data.hasLiked ?
              [...(review.likes || []), token?.token?.user?._id] :
              (review.likes || []).filter(id => id !== token?.token?.user?._id),
            dislikes: data.hasDisliked ?
              [...(review.dislikes || []), token?.token?.user?._id] :
              (review.dislikes || []).filter(id => id !== token?.token?.user?._id)
          }
          : review
      ));
    } catch (error) {
      console.error('Error updating like/dislike:', error);
    }
  };



  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/user/${profile._id}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token?.token?.token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to follow user');
      }
      fetchProfileAndStatus()
      const data = await response.json();
      setIsFollowing(true);
      // notifications.show({
      //   title: 'Success',
      //   message: 'Successfully followed user',
      //   color: 'green'
      // });
    } catch (error) {
      console.error('Error following user:', error);
      // notifications.show({
      //   title: 'Error',
      //   message: 'Failed to follow user',
      //   color: 'red'
      // });
    } finally {
      setFollowLoading(false);
    }
  };

  const handleUnfollow = async () => {
    setFollowLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/user/${profile._id}/unfollow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token?.token?.token
        }
      });

      fetchProfileAndStatus()

      if (!response.ok) {
        throw new Error('Failed to unfollow user');
      }

      const data = await response.json();
      setIsFollowing(false);
      // notifications.show({
      //   title: 'Success',
      //   message: 'Successfully unfollowed user',
      //   color: 'green'
      // });
    } catch (error) {
      console.error('Error unfollowing user:', error);
      // notifications.show({
      //   title: 'Error',
      //   message: 'Failed to unfollow user',
      //   color: 'red'
      // });
    } finally {
      setFollowLoading(false);
    }
  };


  // Function to reset the form
  const resetForm = () => {
    setReviewForm(initialReviewForm);
    setSubmitError(null);
  };

  // Handle modal close
  const handleModalClose = () => {
    resetForm();
    close();
  };


  return (
    <>
      <Box component="section" className="car-specification">
        <Box className="background-search-verlay" mb={{ base: 300, md: 280 }} pt={60}>
          <Box className="container-xl">
            <Box className="row">
              <Box className="col-md-12">
                <nav className="mt-3">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Anchor href="#">Home</Anchor>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Anchor href="#">Dealer List</Anchor>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Anchor href="#">{profile.fullName}</Anchor>
                    </li>
                  </ol>
                </nav>
              </Box>
              <Box className="col-md-12">
                <Box className="search-wrapper-card">
                  <Card shadow="0px 4px 20px 0px #00000014" padding="lg" radius="sm">
                    <Title order={3} mb="xl">
                      {profile.fullName} Profile
                      <Text c="dimmed" size="md" span ml="sm" ff="text">
                        Member Since ({new Date(profile.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })})
                      </Text>
                    </Title>
                    <Box className="row mb-2">
                      <Box className="col-lg-2 col-sm-3 col-3">
                        <Image
                          src={profile.profileImage || "/user-profile.png"}
                          alt={`${profile.fullName}'s profile`}
                          radius="sm"
                        />
                      </Box>
                      <Box className="col-lg-7 col-sm-9 col-9">
                        <Group align="flex-start" justify="flex-start" gap="xs">
                          <Title order={3}>{profile.fullName}</Title>
                          {profile.isVerified && (
                            <Text span c="#1FC055">
                              <IconRosetteDiscountCheckFilled />
                            </Text>
                          )}
                        </Group>

                        <Group mt="xs" mb="0" pl="0" align="flex-start" justify="flex-start" gap="md" c="dimmed">
                          <Text size="sm">
                            <FaUserLarge style={{ verticalAlign: "baseline" }} size="0.8rem" />
                            <Text span ml={5}>{profile.accountType == 'Dealer' ? 'Private Dealer' : 'Personal Account'}</Text>
                          </Text>
                          {profile.locationAddress && (
                            <Text size="sm">
                              <FaLocationDot size="0.8rem" style={{ verticalAlign: "baseline" }} />
                              <Text span ml={5}>{profile.locationAddress}</Text>
                            </Text>
                          )}
                          {true && (
                            <Text size="sm">
                              <FaEnvelope size="0.8rem" />
                              <Text span ml={5}>{profile.email}</Text>
                            </Text>
                          )}
                        </Group>

                        <Group mt="xs" mb="0" pl="0" align="flex-start" justify="flex-start" gap="md" c="dimmed">
                          {profile.phone && (
                            <Text size="sm">
                              <FaMobile style={{ verticalAlign: "baseline" }} size="0.9rem" />
                              <Text span ml={5}>{profile.phone}</Text>
                            </Text>
                          )}
                          {profile.workingHours && (
                            <Text size="sm">
                              <FaClock size="0.9rem" />
                              <Text span ml={5}>
                                {(() => {
                                  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                                  const currentDay = days[new Date().getDay()];
                                  const currentDayHours = profile.workingHours[currentDay];

                                  if (!currentDayHours) return "Hours not available";

                                  if (currentDayHours.isOpen) {
                                    return (
                                      <>
                                        Today: {currentDayHours.start} - {currentDayHours.end}
                                        <Popover
                                          width={260}
                                          position="bottom"
                                          withArrow
                                          shadow="md"
                                          opened={showAllHours}
                                          onChange={setShowAllHours}
                                        >
                                          <Popover.Target>
                                            <Text
                                              span
                                              c="#e90808"
                                              ml={10}
                                              style={{ cursor: 'pointer', display: 'inline-block', color: '#e90808', verticalAlign: 'bottom', textDecoration: 'underline' }}
                                              onClick={() => setShowAllHours(!showAllHours)}
                                            >
                                              See Timings
                                            </Text>
                                          </Popover.Target>
                                          <Popover.Dropdown>
                                            <Stack spacing="xs">
                                              <Text fw={600} size="sm">Working Hours</Text>
                                              {days.map((day) => (
                                                profile.workingHours[day] && (
                                                  <Group key={day} position="apart" spacing="xs" noWrap>
                                                    <Text size="sm" tt="capitalize" fw={500}>{day}:</Text>
                                                    <Text size="sm">
                                                      {profile.workingHours[day].isOpen
                                                        ? `${profile.workingHours[day].start} - ${profile.workingHours[day].end}`
                                                        : "Closed"}
                                                    </Text>
                                                  </Group>
                                                )
                                              ))}
                                            </Stack>
                                          </Popover.Dropdown>
                                        </Popover>
                                      </>
                                    );
                                  } else {
                                    return (
                                      <>
                                        Today: Closed
                                        <Popover
                                          width={250}
                                          position="bottom"
                                          withArrow
                                          shadow="md"
                                          opened={showAllHours}
                                          onChange={setShowAllHours}
                                        >
                                          <Popover.Target>
                                            <Text
                                              span
                                              c="#e90808"
                                              ml={10}
                                              style={{ cursor: 'pointer', display: 'inline-block', color: '#e90808', verticalAlign: 'bottom' }}
                                              onClick={() => setShowAllHours(!showAllHours)}
                                            >
                                              See Timings
                                            </Text>
                                          </Popover.Target>
                                          <Popover.Dropdown>
                                            <Stack spacing="xs">
                                              <Text fw={600} size="sm">Working Hours</Text>
                                              {days.map((day) => (
                                                profile.workingHours[day] && (
                                                  <Group key={day} position="apart" spacing="xs" noWrap>
                                                    <Text size="sm" tt="capitalize" fw={500}>{day}:</Text>
                                                    <Text size="sm">
                                                      {profile.workingHours[day].isOpen
                                                        ? `${profile.workingHours[day].start} - ${profile.workingHours[day].end}`
                                                        : "Closed"}
                                                    </Text>
                                                  </Group>
                                                )
                                              ))}
                                            </Stack>
                                          </Popover.Dropdown>
                                        </Popover>
                                      </>
                                    );
                                  }
                                })()}
                              </Text>
                            </Text>
                          )}
                        </Group>

                        <Box className="user-rating" mt="lg">
                          <Group gap="2" mb="xs">
                            <Rating
                              value={profile.rating || 0}
                              readOnly
                              fractions={2}
                              style={{ pointerEvents: 'none' }}
                            />
                            <Text span size="sm">
                              ({profile.rating?.toFixed(1) || '0.0'}/5)
                            </Text>
                          </Group>
                          <Text size="sm">Reviews ({profile.reviewCount || 0})</Text>
                        </Box>
                      </Box>
                      <Box className="col-lg-3 col-sm-12 col-12 ms-lg-auto text-center mt-3 mt-lg-0">
                        <Flex
                          direction={{ base: "row", md: "column" }}
                          align={{ base: "flex-start", md: "stretch" }}
                          justify={{ base: "flex-start", md: "center" }}
                          gap="md"
                        >
                          {profile.hasWhatsApp && (
                            <Button
                              variant="filled"
                              bg="#1FC055"
                              onClick={() => window.open(`https://wa.me/${profile.phone}`, '_blank')}
                              leftSection={<FaWhatsapp style={{ fontSize: "1.2rem" }} />}

                            >
                              Whatsapp
                            </Button>
                          )}
                          <Button
                            bg="#EB2321"
                            leftSection={
                              isFollowing
                                ? <RiUserUnfollowFill style={{ fontSize: "1.2rem" }} />
                                : <RiUserFollowFill style={{ fontSize: "1.2rem" }} />
                            }
                            onClick={isFollowing ? handleUnfollow : handleFollow}
                            loading={followLoading}
                            disabled={followLoading}
                          >
                            {isFollowing ? 'Unfollow' : 'Follow'}
                          </Button>

                          <Group justify="center" align="center" c="dimmed" className="d-lg-flex d-none">
                            <Text className="border-end" pr="lg">
                              Followers
                              <Text display="block">
                                <RiUserFollowFill /> {profile.followers?.length || 0}
                              </Text>
                            </Text>
                            <Text>
                              Following
                              <Text display="block">
                                <RiUserFollowFill /> {profile.following?.length || 0}
                              </Text>
                            </Text>
                          </Group>
                          <Button onClick={open} bg="#EB2321">Write a Review</Button>
                        </Flex>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="container-xl" mb="xl">
          <Box className="row" style={{ display: 'flex' }}>
            <Box className="col-md-8" style={{ display: 'flex', flexDirection: 'column' }}>
              <Card shadow="0px 4px 20px 0px #00000014" padding="xl" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Title order={3} mb="lg">Service Offerings</Title>
                <Group gap="xl" style={{ flex: 1 }}>
                  <List
                    spacing="xs"
                    size="sm"
                    icon={<IconCheck color="#E90808" style={{ width: rem(24), height: rem(24) }} />}
                  >
                    {profile.servicesOffered?.slice(0, Math.ceil(profile.servicesOffered.length / 2)).map((service, index) => (
                      <List.Item key={index}>{service}</List.Item>
                    ))}
                  </List>
                  <List
                    spacing="xs"
                    size="sm"
                    icon={<IconCheck color="#E90808" style={{ width: rem(24), height: rem(24) }} />}
                  >
                    {profile.servicesOffered?.slice(Math.ceil(profile.servicesOffered.length / 2)).map((service, index) => (
                      <List.Item key={index}>{service}</List.Item>
                    ))}
                  </List>
                </Group>
              </Card>
            </Box>
            <Box className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
              <Box style={{ flex: 1, minHeight: "300px", height: '100%' }}>
                {mapCoordinates ? (
                  <MapComponent
                    coordinates={mapCoordinates}
                    title={profile.fullName}
                    address={profile.locationAddress}
                  />
                ) : (
                  <BackgroundImage
                    src="/google-map.png"
                    h="100%"
                    radius="md"
                    style={{ height: '100%' }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        <BrowseByType bg="bg-light" pagination={false} />

        <Box component="section" className="review-reply" my="xl">
          <Box className="container-xl">
            <Box className="row">
              <Box className="col-md-12">
                {reviewsLoading ? (
                  <Text>Loading reviews...</Text>
                ) : reviewsError ? (
                  <Text color="red">Error loading reviews: {reviewsError}</Text>
                ) : reviews.length === 0 ? (
                  <Text>No reviews yet.</Text>
                ) : (
                  reviews.map((review) => (
                    <Paper key={review?._id} shadow="0px 4px 20px 0px #00000014" radius="md" style={{ overflow: "hidden" }} mb="xl">
                      <Card className="border-bottom" p="xl" radius={0} shadow="none">
                        <Box className="row">
                          <Box className="col-md-6">
                            <Title order={2}>
                              {/* User <Text span inherit className="text-primary">Rating</Text> */}
                            </Title>
                            <Text my="sm">{review?.title}</Text>
                            <Flex align="center" gap="5">
                              <Rating value={review?.rating} readOnly />
                              <Text span>({review?.rating}/5)</Text>
                            </Flex>
                            <Text c="dimmed" my="sm">
                              Posted by {review?.user?.fullName} on {new Date(review?.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </Text>
                          </Box>
                          <Box className="col-md-12">
                            <Text>{review?.content}</Text>
                            <Box className="row" mt="md">
                              <Box className="col-md-4">
                                <Group justify="space-between">
                                  Buying Process
                                  <Group>
                                    <Rating value={review?.buyingProcess} readOnly />
                                    <Text span>({review?.buyingProcess}/5)</Text>
                                  </Group>
                                </Group>
                              </Box>
                              <Box className="col-md-4">
                                <Group justify="space-between">
                                  Vehicle Selection
                                  <Group>
                                    <Rating value={review?.vehicleSelection} readOnly />
                                    <Text span>({review?.vehicleSelection}/5)</Text>
                                  </Group>
                                </Group>
                              </Box>
                              <Box className="col-md-4">
                                <Group justify="space-between">
                                  Level of Services
                                  <Group>
                                    <Rating value={review?.levelOfServices} readOnly />
                                    <Text span>({review?.levelOfServices}/5)</Text>
                                  </Group>
                                </Group>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Card>
                      <Card padding="md" p="md" px="xl" radius={0} shadow="none">
                        <Box className="row">
                          <Box className="col-md-6">
                            <Group>
                              <ActionIcon
                                variant="subtle"
                                color={review?.likes?.includes(token?.token?.user?._id) ? "blue" : "gray"}
                                onClick={() => handleLikeDislike(review?._id, 'like')}
                              >
                                {review?.likes?.includes(token?.token?.user?._id) ? (
                                  <FaThumbsUp style={{ fill: '#228be6' }} />
                                ) : (
                                  <FaThumbsUp style={{ fill: '#868e96' }} />
                                )}
                              </ActionIcon>
                              <Text>{review?.likes ? review?.likes.length : 0}</Text>

                              <ActionIcon
                                variant="subtle"
                                color={review?.dislikes?.includes(token?.token?.user?._id) ? "red" : "gray"}
                                onClick={() => handleLikeDislike(review?._id, 'dislike')}
                              >
                                {review?.dislikes?.includes(token?.token?.user?._id) ? (
                                  <FaThumbsDown style={{ fill: '#fa5252' }} />
                                ) : (
                                  <FaThumbsDown style={{ fill: '#868e96' }} />
                                )}
                              </ActionIcon>
                              <Text>{review?.dislikes ? review?.dislikes.length : 0}</Text>
                            </Group>
                          </Box>
                        </Box>
                      </Card>
                    </Paper>
                  ))
                )}
              </Box>
            </Box>
          </Box>
        </Box>

      </Box>

      <Modal opened={opened} onClose={handleModalClose} title="Write a Review" centered>
        <form onSubmit={handleReviewSubmit}>
          <Stack>
            <Input.Wrapper
              label="Review Title"
              required
            >
              <Input
                placeholder="Enter a title for your review"
                value={reviewForm.title}
                onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                required
              />
            </Input.Wrapper>

            <Textarea
              label="Review Content"
              placeholder="Write your review here"
              minRows={4}
              value={reviewForm.content}
              onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
              required
            />

            <Box>
              <Text weight={500} mb="xs">Buying Process</Text>
              <Rating
                value={reviewForm.buyingProcess}
                onChange={(value) => setReviewForm({ ...reviewForm, buyingProcess: value })}
              />
            </Box>

            <Box>
              <Text weight={500} mb="xs">Vehicle Selection</Text>
              <Rating
                value={reviewForm.vehicleSelection}
                onChange={(value) => setReviewForm({ ...reviewForm, vehicleSelection: value })}
              />
            </Box>

            <Box>
              <Text weight={500} mb="xs">Level of Services</Text>
              <Rating
                value={reviewForm.levelOfServices}
                onChange={(value) => setReviewForm({ ...reviewForm, levelOfServices: value })}
              />
            </Box>

            {submitError && (
              <Text color="red" size="sm">{submitError}</Text>
            )}

            <Group position="right" mt="md">
              <Button variant="outline" onClick={handleModalClose}>Cancel</Button>
              <Button type="submit" loading={isSubmitting}>Submit Review</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default DealerRating;
