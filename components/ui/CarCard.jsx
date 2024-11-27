// "use client";
// import { CameraIcon, GearsHandle } from "@/components/Icons";
// import React from "react";
// import { FaLocationDot, FaCalendarDays, FaClock } from "react-icons/fa6";
// import {
//   Box,
//   Card,
//   Group,
//   Image,
//   Title,
//   Flex,
//   Text,
//   rem,
//   Divider,
//   Progress,
//   ActionIcon,
// } from "@mantine/core";
// import { getTimeAgo } from "@/utils";
// import Link from "next/link";
// import { FaStar } from "react-icons/fa";
// import { IconStar } from "@tabler/icons-react";
// import { Carousel } from "@mantine/carousel";
// import classes from "./Card.module.css";

// const CarCard = ({ vehicle, index }) => {
//   return (
//     <>
//       <Link href={`/detail/${vehicle?.slug}`}>
//         <Card
//           shadow="0px 4px 20px 0px rgba(0, 0, 0, 0.0784313725)"
//           radius="sm"
//           mb="lg"
//         >
//           <Card.Section pos="relative">
//             <Group c="white" gap={5} pos="absolute" left={15} top={15}>
//               <CameraIcon width={20} height={20} />
//               <Text span fw={600}>
//                 {vehicle?.images?.length}
//               </Text>
//             </Group>
//             <Carousel classNames={classes}>
//               <Carousel.Slide>
//                 <Image
//                   mah={200}
//                   mih={200}
//                   fit="cover"
//                   src={
//                     vehicle?.defaultImage
//                       ? vehicle?.defaultImage
//                       : "/products/product-placeholder.png"
//                   }
//                 />
//               </Carousel.Slide>
//               <Carousel.Slide>
//                 <Image
//                   mah={200}
//                   mih={200}
//                   fit="cover"
//                   src={
//                     vehicle?.defaultImage
//                       ? vehicle?.defaultImage
//                       : "/products/product-placeholder.png"
//                   }
//                 />
//               </Carousel.Slide>
//               <Carousel.Slide>
//                 <Image
//                   mah={200}
//                   mih={200}
//                   fit="cover"
//                   src={
//                     vehicle?.defaultImage
//                       ? vehicle?.defaultImage
//                       : "/products/product-placeholder.png"
//                   }
//                 />
//               </Carousel.Slide>
//             </Carousel>
//             {/* <Image
//               mah={200}
//               mih={200}
//               fit="cover"
//               src={
//                 vehicle?.defaultImage
//                   ? vehicle?.defaultImage
//                   : "/products/product-placeholder.png"
//               }
//             /> */}
//             <ActionIcon
//               variant="transparent"
//               c="white"
//               pos="absolute"
//               bottom={15}
//               left={10}
//             >
//               <IconStar width={20} height={20} />
//             </ActionIcon>
//             <Group grow gap={2} my={2}>
//               <Progress size="xs" value={100} color="#E90808" />
//               <Progress size="xs" color="#E90808" />
//               <Progress size="xs" color="#E90808" />
//             </Group>
//           </Card.Section>

//           <Card.Section p="md">
//             <Group justify="space-between" mb="md" align="center" wrap="nowrap">
//               <Title
//                 // ff="text"
//                 order={6}
//                 lts={-0.3}
//                 fw={600}
//                 lineClamp={1}
//               >{`${vehicle?.year}  ${vehicle?.make} ${vehicle?.model}`}</Title>
//               <Box
//                 c="#FFF"
//                 bg="#E90808"
//                 p="5px 10px 5px 30px"
//                 style={{
//                   clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0% 100%)",
//                   textWrap: "nowrap",
//                 }}
//               >
//                 <Text fw={700} size="sm">
//                   Rs {vehicle?.price}
//                 </Text>
//               </Box>
//             </Group>
//             <Divider />
//             <Flex mt="md" gap="md" justify="space-between" wrap="wrap">
//               <Group c="dimmed" gap={rem(5)} align="center">
//                 <FaCalendarDays />
//                 <Text size="xs">{vehicle?.year}</Text>
//               </Group>
//               <Group c="dimmed" gap={rem(5)} align="center">
//                 <GearsHandle />
//                 <Text size="xs">{vehicle?.specifications?.transmission}</Text>
//               </Group>
//               <Group c="dimmed" gap={rem(5)} align="center">
//                 <FaLocationDot />
//                 <Text size="xs">{vehicle?.city}</Text>
//               </Group>
//             </Flex>
//             <Flex mt="md" gap="md" justify="space-between" wrap="wrap">
//               <Group c="dimmed" gap={rem(5)} align="center">
//                 <Text span c="dimmed" size="xs">
//                   Stock#
//                 </Text>
//                 <Text c="dark" size="xs">
//                   {vehicle?.specifications?.stockId}
//                 </Text>
//               </Group>
//               <Group c="dimmed" gap={rem(5)} align="center">
//                 <FaClock />
//                 <Text size="xs">{getTimeAgo(vehicle?.createdAt)}</Text>
//               </Group>
//             </Flex>
//           </Card.Section>
//         </Card>
//       </Link>
//     </>
//   );
// };

// export default CarCard;

// "use client";
// import { useState } from "react";
// import { CameraIcon, GearsHandle } from "@/components/Icons";
// import React from "react";
// import { FaLocationDot, FaCalendarDays, FaClock } from "react-icons/fa6";
// import {
//   Box,
//   Card,
//   Group,
//   Image,
//   Title,
//   Flex,
//   Text,
//   rem,
//   Divider,
//   Progress,
//   ActionIcon,
// } from "@mantine/core";
// import { getTimeAgo } from "@/utils";
// import Link from "next/link";
// import { FaStar } from "react-icons/fa";
// import { IconStar } from "@tabler/icons-react";
// import { Carousel } from "@mantine/carousel";
// import classes from "./Card.module.css";

// const CarCard = ({ vehicle }) => {
//   const [activeSlide, setActiveSlide] = useState(0);
//   const images = vehicle?.images?.slice(0, 5) || []; // Max 5 images

//   // Function to change slide based on mouse position
//   const handleMouseMove = (e) => {
//     const { offsetX, target } = e.nativeEvent;
//     const sectionWidth = target.clientWidth / images.length; // Divide the width based on the number of images

//     // Determine which section the cursor is in
//     const newSlide = Math.floor(offsetX / sectionWidth);
//     setActiveSlide(newSlide);
//   };

//     // Reset to the first slide on mouse leave
//     const handleMouseLeave = () => {
//       setActiveSlide(0);
//     };

//   return (
//     <Link href={`/detail/${vehicle?.slug}`}>
//       <Card shadow="0px 4px 20px 0px rgba(0, 0, 0, 0.0784313725)" radius="sm" mb="lg">
//         <Card.Section pos="relative">
//           <Group c="white" gap={5} pos="absolute" style={{zIndex:"100"}} left={15} top={15}>
//             <CameraIcon width={20} height={20} />
//             <Text span fw={600}>
//               {images.length}
//             </Text>
//           </Group>

//           {/* Image Carousel controlled by mouse hover */}
//           <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ cursor: 'pointer' }}>
//             {images.length > 0 ? (
//               <Carousel
//                 classNames={classes}
//                 active={activeSlide}
//                 loop={true}
//                 withIndicators={true}
//               >
//                 {images.map((img, idx) => (
//                   <Carousel.Slide key={idx}>
//                     <Image
//                       mah={200}
//                       mih={200}
//                       fit="cover"
//                       src={img ? img : "/products/product-placeholder.png"}
//                     />
//                   </Carousel.Slide>
//                 ))}
//               </Carousel>
//             ) : (
//               <Image
//                 mah={200}
//                 mih={200}
//                 fit="cover"
//                 src={
//                   vehicle?.defaultImage
//                     ? vehicle?.defaultImage
//                     : "/products/product-placeholder.png"
//                 }
//               />
//             )}
//           </div>
//           {/* Progress bar with hover functionality */}
//           <Group grow gap={2} my={2}>
//             {images.map((_, index) => (
//               <Progress
//                 key={index}
//                 size="xs"
//                 value={index === activeSlide ? 100 : 30}
//                 color={index === activeSlide ? "#E90808" : "#E0E0E0"}
//                 onMouseEnter={() => setActiveSlide(index)}
//               />
//             ))}
//           </Group>
//           <ActionIcon variant="transparent" c="white" pos="absolute" bottom={15} left={10}>
//             <IconStar width={20} height={20} />
//           </ActionIcon>
//         </Card.Section>

//         <Card.Section p="md">
//           <Group justify="space-between" mb="md" align="center" wrap="nowrap">
//             <Title order={6} lts={-0.3} fw={600} lineClamp={1}>
//               {`${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`}
//             </Title>
//             <Box
//               c="#FFF"
//               bg="#E90808"
//               p="5px 10px 5px 30px"
//               style={{
//                 clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0% 100%)",
//                 textWrap: "nowrap",
//               }}
//             >
//               <Text fw={700} size="sm">
//                 Rs {vehicle?.price}
//               </Text>
//             </Box>
//           </Group>
//           <Divider />
//           <Flex mt="md" gap="md" justify="space-between" wrap="wrap">
//             <Group c="dimmed" gap={rem(5)} align="center">
//               <FaCalendarDays />
//               <Text size="xs">{vehicle?.year}</Text>
//             </Group>
//             <Group c="dimmed" gap={rem(5)} align="center">
//               <GearsHandle />
//               <Text size="xs">{vehicle?.specifications?.transmission}</Text>
//             </Group>
//             <Group c="dimmed" gap={rem(5)} align="center">
//               <FaLocationDot />
//               <Text size="xs">{vehicle?.city}</Text>
//             </Group>
//           </Flex>
//           <Flex mt="md" gap="md" justify="space-between" wrap="wrap">
//             <Group c="dimmed" gap={rem(5)} align="center">
//               <Text span c="dimmed" size="xs">
//                 Stock#
//               </Text>
//               <Text c="dark" size="xs">
//                 {vehicle?.specifications?.stockId}
//               </Text>
//             </Group>
//             <Group c="dimmed" gap={rem(5)} align="center">
//               <FaClock />
//               <Text size="xs">{getTimeAgo(vehicle?.createdAt)}</Text>
//             </Group>
//           </Flex>
//         </Card.Section>
//       </Card>
//     </Link>
//   );
// };

// export default CarCard;


"use client";
import { useEffect, useState } from "react";
import { CameraIcon, GearsHandle } from "@/components/Icons";
import React from "react";
import { FaLocationDot, FaCalendarDays, FaClock } from "react-icons/fa6";
import {
  Box,
  Card,
  Group,
  Image,
  Title,
  Flex,
  Text,
  rem,
  Divider,
  Progress,
  ActionIcon,
} from "@mantine/core";
import Link from "next/link";
import { IconStar } from "@tabler/icons-react";
import { formatPrice, getTimeAgo } from "@/utils";
import { notifications } from "@mantine/notifications";
import { BASE_URL } from "@/constants/api-endpoints";
import { useRouter } from "next/navigation";

const CarCard = ({ vehicle,token }) => {
  const [isFavorite, setIsFavorite] = useState(vehicle?.isFavorite || false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const images = vehicle?.images?.slice(0, 5) || []; // Max 5 images

    // Preload images to avoid delays on hover
    useEffect(() => {
      images.forEach((src) => {
        const img = new window.Image(); // Use native Image constructor explicitly
        img.src = src;
      });
    }, [images]);

    
  // Function to change slide based on mouse position
  const handleMouseMove = (e) => {
    const { offsetX, target } = e.nativeEvent;
    const sectionWidth = target.clientWidth / images.length;
    const newSlide = Math.floor(offsetX / sectionWidth);
    setActiveSlide(newSlide);
  };

  // Reset to the first slide on mouse leave
  const handleMouseLeave = () => {
    setActiveSlide(0);
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking the favorite button
    if (e.target.closest('.favorite-button')) {
      return;
    }
    router.push(`/detail/${vehicle?.slug}`);
  };


  
  const handleToggleFavorite = async (e) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Prevent event bubbling

    if (!token) {
      notifications.show({
        title: 'Authentication Required',
        message: 'Please login to add vehicles to favorites',
        color: 'red'
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
          `${BASE_URL}/api/user/${vehicle._id}/toggle-favorite/${token._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token._id}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setIsFavorite(data.data.isFavorite);
        notifications.show({
          title: 'Success',
          message: data.message,
          color: 'green'
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error.message || 'Failed to update favorite status',
        color: 'red'
      });
    } finally {
      setIsLoading(false);
    }
  };
  console.log('token>>>',token?.token?.user?.favoriteVehicles
    )

  return (
 
      <Card shadow="0px 4px 20px 0px rgba(0, 0, 0, 0.0784313725)" radius="sm" mb="lg"  onClick={handleCardClick} >
        <Card.Section pos="relative">
          {/* Display total images */}
          <Group c="white" gap={5} pos="absolute" style={{ zIndex: "100" }} left={15} top={15}>
            <CameraIcon width={20} height={20} />
            <Text span fw={600}>{vehicle?.images?.length}</Text>
          </Group>

          {/* Custom image slider controlled by mouse hover */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            {images.length > 0 ? (
              <Image
                mah={200}
                mih={200}
                fit="cover"
                src={images[activeSlide] || "/products/product-placeholder.png"}
                alt={`Image ${activeSlide + 1}`}
              />
            ) : (
              <Image
                mah={200}
                mih={200}
                fit="cover"
                src={vehicle?.defaultImage || "/products/product-placeholder.png"}
                alt="Placeholder"
              />
            )}
          </div>

          {/* Progress bar with hover functionality */}
          <Group grow gap={2} my={2}>
            {images.map((_, index) => (
              <Progress
                key={index}
                size="xs"
                value={index === activeSlide ? 100 : 30}
                color={index === activeSlide ? "#E90808" : "#E0E0E0"}
                onMouseEnter={() => setActiveSlide(index)}
              />
            ))}
          </Group>
          <ActionIcon
          className="favorite-button" // Add this class
          variant="transparent"
          c={isFavorite ? 'red' : 'white'}
          pos="absolute"
          bottom={15}
          left={10}
          loading={isLoading}
          onClick={handleToggleFavorite}
          style={{ zIndex: 10 }} // Ensure button is above other elements
        >
          <IconStar
            width={20}
            height={20}
            fill={(token?.token?.user?.favoriteVehicles?.includes(vehicle?._id)) ? 'red' : 'transparent'}
            stroke={2}
          />
        </ActionIcon>
        </Card.Section>

        <Card.Section p="md">
          {/* Car details */}
          <Group justify="space-between" mb="md" align="center" wrap="nowrap">
            <Title order={6} lts={-0.3} fw={600} lineClamp={1}>
              {`${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`}
            </Title>
            <Box
              c="#FFF"
              bg="#E90808"
              p="5px 10px 5px 30px"
              style={{
                clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0% 100%)"
              }}
            >
              <Text fw={700} size="sm">Rs {formatPrice
              (vehicle?.price)}</Text>
            </Box>
          </Group>
          <Divider />
          <Flex mt="md" gap="md" justify="space-between" wrap="wrap">
            <Group c="dimmed" gap={rem(5)} align="center">
              <FaCalendarDays />
              <Text size="xs">{vehicle?.year}</Text>
            </Group>
            <Group c="dimmed" gap={rem(5)} align="center">
              <GearsHandle />
              <Text size="xs">{vehicle?.specifications?.transmission}</Text>
            </Group>
            <Group c="dimmed" gap={rem(5)} align="center">
              <FaLocationDot />
              <Text size="xs">{vehicle?.city}</Text>
            </Group>
          </Flex>
          <Flex mt="md" gap="md" justify="space-between" wrap="wrap">
            <Group c="dimmed" gap={rem(5)} align="center">
              <Text span c="dimmed" size="xs">ID#</Text>
              <Text c="dark" size="xs">{vehicle?.specifications?.stockId}</Text>
            </Group>
            <Group c="dimmed" gap={rem(5)} align="center">
              <FaClock />
              <Text size="xs">{getTimeAgo(vehicle?.createdAt)}</Text>
            </Group>
          </Flex>
        </Card.Section>
      </Card>
  );
};

export default CarCard;

