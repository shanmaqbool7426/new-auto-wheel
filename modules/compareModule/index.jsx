// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Anchor,
//   Box,
//   Button,
//   Card,
//   Title,
//   Text,
//   Image,
//   Flex,
//   Rating,
//   Table,
//   Paper,
//   Select,
//   Pagination,
// } from "@mantine/core";
// import QuickLinks from "@/components/QuickLinks";
// import { formatDate } from "@/utils";
// import Link from "next/link";

// const ITEMS_PER_PAGE = 10;

// const CompareModule = ({
//   reviewsVehicles,
//   reviewsVehiclesOverAll,
//   fetchMakesByTypeData,
//   variants,
//   make,
//   model,
//   type
// }) => {
//   const [selectedVariant, setSelectedVariant] = useState("All Versions");
//   const [sortBy, setSortBy] = useState("Latest");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filteredReviews, setFilteredReviews] = useState([]);
// console.log(reviewsVehicles,"vehicles")
//   useEffect(() => {
//     let filtered = reviewsVehicles?.data || [];

//     // Filter by variant
//     if (selectedVariant !== "All Versions") {
//       filtered = filtered.filter((review) =>
//         review.vehicle.toLowerCase().includes(selectedVariant.toLowerCase())
//       );
//     }

//     // Sort reviews
//     switch (sortBy) {
//       case "Highest Rated":
//         filtered.sort((a, b) => b.overAllRating - a.overAllRating);
//         break;
//       case "Lowest Rated":
//         filtered.sort((a, b) => a.overAllRating - b.overAllRating);
//         break;
//       case "Latest":
//       default:
//         filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     }

//     setFilteredReviews(filtered);
//     setCurrentPage(1);
//   }, [selectedVariant, sortBy, reviewsVehicles]);

//   const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);
//   const paginatedReviews = filteredReviews.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   return (
//     <Box component="section" className="car-specification">
//       <Box
//         className="background-search-verlay"
//         mb={{ base: 380, sm: 320, md: 200 }}
//         mt={60}
//       >
//         <Box className="container-xl">
//           <Box className="row">
//             <Box className="col-md-12">
//               <nav className="mt-3">
//                 <ol className="breadcrumb">
//                   <li className="breadcrumb-item">
//                     <Anchor href="/" component={Link}>Home</Anchor>
//                   </li>
//                   <li className="breadcrumb-item" aria-current="page">
//                     <Anchor href={`/reviews/${type}`} component={Link} tt="capitalize">{type} Reviews</Anchor>
//                   </li>
//                   <li className="breadcrumb-item active" aria-current="page">
//                     <Anchor href="#" tt="capitalize">
//                       {make} {model} Reviews
//                     </Anchor>
//                   </li>
//                 </ol>
//               </nav>
//             </Box>
//             <Box className="col-md-12">
//               <Box className="search-wrapper-card">
//                 <Card
//                   shadow="0px 4px 20px 0px #00000014"
//                   padding="lg"
//                   radius="sm"
//                 >
//                   <Title order={3} mb="md" tt="capitalize">
//                     {make} {model} Reviews
//                   </Title>
//                   <Box className="row mb-2">
//                     <Box className="col-lg-3 col-sm-6 col-6">
//                       <Card shadow="none" h="100%" withBorder py="lg">
//                         <Flex
//                           direction="column"
//                           gap="xs"
//                           h="100%"
//                           justify="center"
//                           align="center"
//                         >
//                           <Image
//                             src={
//                               reviewsVehicles?.data?.[0]?.vehicleId
//                                 ?.defaultImage
//                             }
//                             alt={`${make} Logo`}
//                             h={200}
//                             w={200}
//                           />
//                          <Link href={`/listing/${type}s/mk_${make}`}>
//                          <Button variant="outline" color="#E90808" mt="sm" tt="capitalize">
//                             Used {make} {`${type}s`}
//                           </Button>
//                          </Link>
//                         </Flex>
//                       </Card>
//                     </Box>
//                     <Box className="col-lg-2 col-sm-6 col-6 text-center">
//                       <Flex
//                         py={{ base: 20, sm: 0 }}
//                         direction="column"
//                         h="100%"
//                         align="center"
//                         justify="center"
//                       >
//                         <Box mb="sm">
//                           <Text fw="bold" size="lg" className="text-primary" tt="capitalize">
//                             {make} {model}
//                           </Text>
//                           <Text>Overall Ratings</Text>
//                         </Box>
//                         <Box mb="sm">
//                           <Flex justify="center" align="center" mb="sm">
//                             <Rating
//                               value={
//                                 reviewsVehiclesOverAll?.data?.overallAverage ||
//                                 0
//                               }
//                               readOnly
//                             />
//                             <Text>
//                               (
//                               {reviewsVehiclesOverAll?.data?.overallAverage?.toFixed(
//                                 1
//                               ) || 0}
//                               /5)
//                             </Text>
//                           </Flex>
//                           <Text>
//                             No of reviews (
//                             {reviewsVehiclesOverAll?.data?.totalReviews || 0})
//                           </Text>
//                         </Box>
//                         {/* <Button
//                           bg="#EB2321"
//                           ff="heading"
//                           autoContrast
//                           //   fullWidth
//                           mt="md"
//                           fw={500}
//                         >
//                           Write a Review
//                         </Button> */}
//                       </Flex>
//                     </Box>
//                     <Box className="col-lg-3 col-sm-6" mt="xl">
//                       <Table
//                         withRowBorders={false}
//                         verticalSpacing="md"
//                         horizontalSpacing="0"
//                       >
//                         <Table.Tbody>
//                           <Table.Tr>
//                             <Table.Td>Mileage</Table.Td>
//                             <Table.Td>
//                               <Flex justify="flex-end">
//                                 <Rating
//                                   value={
//                                     reviewsVehiclesOverAll?.data?.mileage || 0
//                                   }
//                                   readOnly
//                                 />
//                                 (
//                                 {reviewsVehiclesOverAll?.data?.mileage?.toFixed(
//                                   1
//                                 ) || 0}
//                                 /5)
//                               </Flex>
//                             </Table.Td>
//                           </Table.Tr>
//                           <Table.Tr>
//                             <Table.Td>Maintenance Cost</Table.Td>
//                             <Table.Td>
//                               <Flex justify="flex-end">
//                                 <Rating
//                                   value={
//                                     reviewsVehiclesOverAll?.data?.maintenance ||
//                                     0
//                                   }
//                                   readOnly
//                                 />
//                                 (
//                                 {reviewsVehiclesOverAll?.data?.maintenance?.toFixed(
//                                   1
//                                 ) || 0}
//                                 /5)
//                               </Flex>
//                             </Table.Td>
//                           </Table.Tr>
//                           <Table.Tr>
//                             <Table.Td>Safety</Table.Td>
//                             <Table.Td>
//                               <Flex justify="flex-end">
//                                 <Rating
//                                   value={
//                                     reviewsVehiclesOverAll?.data?.safety || 0
//                                   }
//                                   readOnly
//                                 />
//                                 (
//                                 {reviewsVehiclesOverAll?.data?.safety?.toFixed(
//                                   1
//                                 ) || 0}
//                                 /5)
//                               </Flex>
//                             </Table.Td>
//                           </Table.Tr>
//                         </Table.Tbody>
//                       </Table>
//                     </Box>
//                     <Box className="col-lg-3 col-sm-6" mt="xl">
//                       <Table
//                         withRowBorders={false}
//                         verticalSpacing="md"
//                         horizontalSpacing="0"
//                       >
//                         <Table.Tbody>
//                           <Table.Tr>
//                             <Table.Td>Features and Styling</Table.Td>
//                             <Table.Td>
//                               <Flex justify="flex-end">
//                                 <Rating
//                                   value={
//                                     reviewsVehiclesOverAll?.data?.features || 0
//                                   }
//                                   readOnly
//                                 />
//                                 (
//                                 {reviewsVehiclesOverAll?.data?.features?.toFixed(
//                                   1
//                                 ) || 0}
//                                 /5)
//                               </Flex>
//                             </Table.Td>
//                           </Table.Tr>
//                           <Table.Tr>
//                             <Table.Td>Comfort</Table.Td>
//                             <Table.Td>
//                               <Flex justify="flex-end">
//                                 <Rating
//                                   value={
//                                     reviewsVehiclesOverAll?.data?.comfort || 0
//                                   }
//                                   readOnly
//                                 />
//                                 (
//                                 {reviewsVehiclesOverAll?.data?.comfort?.toFixed(
//                                   1
//                                 ) || 0}
//                                 /5)
//                               </Flex>
//                             </Table.Td>
//                           </Table.Tr>
//                           <Table.Tr>
//                             <Table.Td>Performance</Table.Td>
//                             <Table.Td>
//                               <Flex justify="flex-end">
//                                 <Rating
//                                   value={
//                                     reviewsVehiclesOverAll?.data?.performance ||
//                                     0
//                                   }
//                                   readOnly
//                                 />
//                                 (
//                                 {reviewsVehiclesOverAll?.data?.performance?.toFixed(
//                                   1
//                                 ) || 0}
//                                 /5)
//                               </Flex>
//                             </Table.Td>
//                           </Table.Tr>
//                         </Table.Tbody>
//                       </Table>
//                     </Box>
//                   </Box>
//                 </Card>
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       <Box component="recent-reviews">
//         <Box className="container-xl">
//           <Box className="row">
//             <Box className="col-md-12" mb="xl">
//               <Title order={2} tt="capitalize">
//                 Recent {make} {model} Car{" "}
//                 <Text span inherit className="text-primary">
//                   Reviews
//                 </Text>
//               </Title>
//             </Box>
//             <Box className="col-md-12">
//               <Paper withBorder mb="lg" style={{ overflow: "hidden" }}>
//                 <Box p="lg" px="xl" className="border-bottom bg-light">
//                   <Box className="row align-items-center">
//                     <Box className="col-md-2 text-center text-md-start order-3 order-md-1">
//                       <Text p={{ base: "sm", md: 0 }}>
//                         <strong>
//                           {(currentPage - 1) * ITEMS_PER_PAGE + 1}
//                         </strong>{" "}
//                         -{" "}
//                         <strong>
//                           {Math.min(
//                             currentPage * ITEMS_PER_PAGE,
//                             filteredReviews.length
//                           )}
//                         </strong>{" "}
//                         of <strong>{filteredReviews.length}</strong> Results
//                       </Text>
//                     </Box>
//                     <Box className="col-md-6 col-sm-6 order-1 order-md-2">
//                       <Flex
//                         align="center"
//                         gap={{ base: "md", md: "xl" }}
//                         justify="stretch"
//                       >
//                         <Box
//                           component="label"
//                           fw={500}
//                           style={{ flex: "0 0 auto" }}
//                         >
//                           Select Variant :
//                         </Box>
//                         <Select
//                           id="variant"
//                           w="100%"
//                           size="md"
//                           placeholder="All Versions"
//                           data={["All Versions", ...variants]}
//                           value={selectedVariant}
//                           onChange={setSelectedVariant}
//                         />
//                       </Flex>
//                     </Box>
//                     <Box className="col-md-4 col-sm-6 order-2 order-md-3">
//                       <Flex
//                         align="center"
//                         gap={{ base: "md", md: "xl" }}
//                         justify="stretch"
//                       >
//                         <Box
//                           component="label"
//                           fw={500}
//                           style={{ flex: "0 0 auto" }}
//                         >
//                           Sort By :
//                         </Box>
//                         <Select
//                           id="sortBy"
//                           w="100%"
//                           size="md"
//                           placeholder="Sort By"
//                           data={["Latest", "Highest Rated", "Lowest Rated"]}
//                           value={sortBy}
//                           onChange={setSortBy}
//                         />
//                       </Flex>
//                     </Box>
//                   </Box>
//                 </Box>
//                 {reviewsVehicles?.data?.map((review, index) => {
//                   return (
//                     <Card
//                       key={index}
//                       py="xl"
//                       px={0}
//                       mx="xl"
//                       mb="lg"
//                       className="border-bottom customer-review-card"
//                       radius={0}
//                     >
//                       <Box className="row">
//                         <Box className="col-md-3">
//                           <Image
//                             src={review?.vehicleId?.defaultImage}
//                             alt="Toyota Logo"
//                             p="md"
//                           />
//                         </Box>
//                         <Box className="col-md-9">
//                           <Title className="text-primary" order={4} fw={600}>
//                             {review?.vehicleId?.make} {review?.vehicleId?.model}{" "}
//                             Review
//                           </Title>
//                           <Text>{`${review?.vehicleId?.year}  ${review?.vehicleId?.make}  ${review?.vehicleId?.model}    ${review?.vehicleId?.variant}`}</Text>
//                           <Flex align="center" mt="sm">
//                             <Rating defaultValue={review?.overAllRating} />
//                             <Text span inherit>
//                               ({review?.overAllRating})
//                             </Text>
//                           </Flex>
//                           <Text mt="5">
//                             No of reviews <strong>(50)</strong>
//                           </Text>
//                           <Text c="dimmed" fw="400" mt="md" size="lg">
//                             Posted by{" "}
//                             {`${
//                               review?.reviewBy
//                                 ? review?.reviewBy
//                                 : "Hamza Tahir"
//                             }`}{" "}
//                             on {formatDate(review?.createdAt)}
//                           </Text>
//                         </Box>
//                         <Box className="col-md-12">
//                           <Text>{review?.comment}</Text>
//                         </Box>
//                         <Box className="row" mt="md">
//                           <Box className="col-md-4">
//                             <Table withRowBorders={false} horizontalSpacing={0}>
//                               <Table.Tbody>
//                                 <Table.Tr>
//                                   <Table.Td>
//                                     <Text size="md">Mileage</Text>
//                                   </Table.Td>
//                                   <Table.Td>
//                                     <Flex justify="flex-end" gap={5}>
//                                       <Rating
//                                         defaultValue={review?.ratings?.mileage}
//                                       />
//                                       ({review?.ratings?.mileage}/5)
//                                     </Flex>
//                                   </Table.Td>
//                                 </Table.Tr>
//                                 <Table.Tr>
//                                   <Table.Td>
//                                     <Text size="md">Maintenance Cost</Text>
//                                   </Table.Td>
//                                   <Table.Td>
//                                     <Flex justify="flex-end" gap={5}>
//                                       <Rating
//                                         defaultValue={
//                                           review?.ratings?.maintenance
//                                         }
//                                       />
//                                       ({review?.ratings?.maintenance}/5)
//                                     </Flex>
//                                   </Table.Td>
//                                 </Table.Tr>
//                               </Table.Tbody>
//                             </Table>
//                           </Box>
//                           <Box className="col-md-4">
//                             <Table withRowBorders={false} horizontalSpacing={0}>
//                               <Table.Tbody>
//                                 <Table.Tr>
//                                   <Table.Td>
//                                     <Text size="md">Safety</Text>
//                                   </Table.Td>
//                                   <Table.Td>
//                                     <Flex justify="flex-end" gap={5}>
//                                       <Rating
//                                         defaultValue={review?.ratings?.safety}
//                                       />
//                                       ({review?.ratings?.safety}/5)
//                                     </Flex>
//                                   </Table.Td>
//                                 </Table.Tr>
//                                 <Table.Tr>
//                                   <Table.Td>
//                                     <Text size="md">Features and Styling</Text>
//                                   </Table.Td>
//                                   <Table.Td>
//                                     <Flex justify="flex-end" gap={5}>
//                                       <Rating
//                                         defaultValue={review?.ratings?.features}
//                                       />
//                                       ({review?.ratings?.features}/5)
//                                     </Flex>
//                                   </Table.Td>
//                                 </Table.Tr>
//                               </Table.Tbody>
//                             </Table>
//                           </Box>
//                           <Box className="col-md-4">
//                             <Table withRowBorders={false} horizontalSpacing={0}>
//                               <Table.Tbody>
//                                 <Table.Tr>
//                                   <Table.Td>
//                                     <Text size="md">Comfort</Text>
//                                   </Table.Td>
//                                   <Table.Td>
//                                     <Flex justify="flex-end" gap={5}>
//                                       <Rating
//                                         defaultValue={review?.ratings?.comfort}
//                                       />
//                                       ({review?.ratings?.comfort}/5)
//                                     </Flex>
//                                   </Table.Td>
//                                 </Table.Tr>
//                                 <Table.Tr>
//                                   <Table.Td>
//                                     <Text size="md">Performance</Text>
//                                   </Table.Td>
//                                   <Table.Td>
//                                     <Flex justify="flex-end" gap={5}>
//                                       <Rating
//                                         defaultValue={
//                                           review?.ratings?.performance
//                                         }
//                                       />
//                                       ({review?.ratings?.performance}/5)
//                                     </Flex>
//                                   </Table.Td>
//                                 </Table.Tr>
//                               </Table.Tbody>
//                             </Table>
//                           </Box>
//                         </Box>
//                       </Box>
//                     </Card>
//                   );
//                 })}
//               </Paper>
//             </Box>
//             <Box className="col-md-12">
//               <Pagination
//                 total={totalPages}
//                 value={currentPage}
//                 onChange={setCurrentPage}
//                 siblings={1}
//                 size="md"
//                 color="#E90808"
//               />
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       <QuickLinks />
//     </Box>
//   );
// };

// export default CompareModule;

// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Anchor,
//   Box,
//   Button,
//   Card,
//   Title,
//   Text,
//   Image,
//   Flex,
//   Rating,
//   Table,
//   Paper,
//   Select,
//   Pagination,
// } from "@mantine/core";
// import QuickLinks from "@/components/QuickLinks";
// import { formatDate } from "@/utils";
// import Link from "next/link";

// const ITEMS_PER_PAGE = 2;

// const CompareModule = ({
//   reviewsVehicles,
//   reviewsVehiclesOverAll,
//   variants,
//   make,
//   model,
//   type,
// }) => {
//   const [selectedVariant, setSelectedVariant] = useState("All Versions");
//   const [sortBy, setSortBy] = useState("Latest");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filteredReviews, setFilteredReviews] = useState([]);

//   useEffect(() => {
//     let filtered = reviewsVehicles?.data || [];

//     if (selectedVariant !== "All Versions") {
//       filtered = filtered.filter((review) =>
//         review.vehicle.toLowerCase().includes(selectedVariant.toLowerCase())
//       );
//     }

//     switch (sortBy) {
//       case "Highest Rated":
//         filtered.sort((a, b) => (b.overAllRating || 0) - (a.overAllRating || 0));
//         break;
//       case "Lowest Rated":
//         filtered.sort((a, b) => (a.overAllRating || 0) - (b.overAllRating || 0));
//         break;
//       case "Latest":
//       default:
//         filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     }

//     setFilteredReviews(filtered);
//     setCurrentPage(1);
//   }, [selectedVariant, sortBy, reviewsVehicles]);

//   const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);
//   const paginatedReviews = filteredReviews.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const renderRatingRow = (label, value) => (
//     <Table.Tr>
//       <Table.Td>{label}</Table.Td>
//       <Table.Td>
//         <Flex justify="flex-end">
//           <Rating value={value || 0} readOnly /> ({value?.toFixed(1) || 0}/5)
//         </Flex>
//       </Table.Td>
//     </Table.Tr>
//   );

//   return (
//     <Box component="section" className="car-specification">
//       <Box
//         className="background-search-verlay"
//         mb={{ base: 380, sm: 320, md: 200 }}
//         mt={60}
//       >
//         <Box className="container-xl">
//           <Box className="row">
//             <Box className="col-md-12">
//               <nav className="mt-3">
//                 <ol className="breadcrumb">
//                   <li className="breadcrumb-item">
//                     <Anchor href="/" component={Link}>Home</Anchor>
//                   </li>
//                   <li className="breadcrumb-item" aria-current="page">
//                     <Anchor href={`/reviews/${type}`} component={Link} tt="capitalize">{type} Reviews</Anchor>
//                   </li>
//                   <li className="breadcrumb-item active" aria-current="page">
//                     <Anchor href="#" tt="capitalize">
//                       {make} {model} Reviews
//                     </Anchor>
//                   </li>
//                 </ol>
//               </nav>
//             </Box>
//             {/* OverAll Review */}
//             <Box className="col-md-12">
//               <Box className="search-wrapper-card">
//                 <Card shadow="0px 4px 20px 0px #00000014" padding="lg" radius="sm">
//                   <Title order={3} mb="md" tt="capitalize">
//                     {make} {model} Reviews
//                   </Title>
//                   <Box className="row mb-2">
//                     <Box className="col-lg-3 col-sm-6 col-6">
//                       <Card shadow="none" h="100%" withBorder py="lg">
//                         <Flex direction="column" gap="xs" h="100%" justify="center" align="center">
//                           <Image
//                             src={reviewsVehicles?.data?.[0]?.vehicleId?.defaultImage}
//                             alt={`${make} Logo`}
//                             h={200}
//                             w={200}
//                           />
//                           <Link href={`/listing/${type}s/mk_${make}`}>
//                             <Button variant="outline" color="#E90808" mt="sm" tt="capitalize">
//                               Used {make} {`${type}s`}
//                             </Button>
//                           </Link>
//                         </Flex>
//                       </Card>
//                     </Box>
//                     <Box className="col-lg-2 col-sm-6 col-6 text-center">
//                       <Flex py={{ base: 20, sm: 0 }} direction="column" h="100%" align="center" justify="center">
//                         <Box mb="sm">
//                           <Text fw="bold" size="lg" className="text-primary" tt="capitalize">
//                             {make} {model}
//                           </Text>
//                           <Text>Overall Ratings</Text>
//                         </Box>
//                         <Box mb="sm">
//                           <Flex justify="center" align="center" mb="sm">
//                             <Rating value={reviewsVehiclesOverAll?.data?.overallAverage || 0} readOnly />
//                             <Text>({reviewsVehiclesOverAll?.data?.overallAverage?.toFixed(1) || 0}/5)</Text>
//                           </Flex>
//                           <Text>No of reviews ({reviewsVehiclesOverAll?.data?.totalReviews || 0})</Text>
//                         </Box>
//                       </Flex>
//                     </Box>
//                     <Box className="col-lg-3 col-sm-6" mt="xl">
//                       <Table withRowBorders={false} verticalSpacing="md" horizontalSpacing="0">
//                         <Table.Tbody>
//                           {renderRatingRow("Mileage", reviewsVehiclesOverAll?.data?.mileage)}
//                           {renderRatingRow("Maintenance Cost", reviewsVehiclesOverAll?.data?.maintenance)}
//                           {renderRatingRow("Safety", reviewsVehiclesOverAll?.data?.safety)}
//                         </Table.Tbody>
//                       </Table>
//                     </Box>
//                     <Box className="col-lg-3 col-sm-6" mt="xl">
//                       <Table withRowBorders={false} verticalSpacing="md" horizontalSpacing="0">
//                         <Table.Tbody>
//                           {renderRatingRow("Features and Styling", reviewsVehiclesOverAll?.data?.features)}
//                           {renderRatingRow("Comfort", reviewsVehiclesOverAll?.data?.comfort)}
//                           {renderRatingRow("Performance", reviewsVehiclesOverAll?.data?.performance)}
//                         </Table.Tbody>
//                       </Table>
//                     </Box>
//                   </Box>
//                 </Card>
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       <Box component="recent-reviews">
//         <Box className="container-xl">
//           <Box className="row">
//             <Box className="col-md-12" mb="xl">
//               <Title order={2} tt="capitalize">
//                 Recent {make} {model} Car <Text span inherit className="text-primary">Reviews</Text>
//               </Title>
//             </Box>
//             <Box className="col-md-12">
//               <Paper withBorder mb="lg" style={{ overflow: "hidden" }}>
//                 <Box p="lg" px="xl" className="border-bottom bg-light">
//                   <Box className="row align-items-center">
//                     <Box className="col-md-2 text-center text-md-start order-3 order-md-1">
//                       <Text p={{ base: "sm", md: 0 }}>
//                         <strong>{(currentPage - 1) * ITEMS_PER_PAGE + 1}</strong> - <strong>{Math.min(currentPage * ITEMS_PER_PAGE, filteredReviews.length)}</strong> of <strong>{filteredReviews.length}</strong> Results
//                       </Text>
//                     </Box>
//                     <Box className="col-md-6 col-sm-6 order-1 order-md-2">
//                       <Flex align="center" gap={{ base: "md", md: "xl" }} justify="stretch">
//                         <Box component="label" fw={500} style={{ flex: "0 0 auto" }}>
//                           Select Variant :
//                         </Box>
//                         <Select
//                           id="variant"
//                           w="100%"
//                           size="md"
//                           placeholder="All Versions"
//                           data={["All Versions", ...variants]}
//                           value={selectedVariant}
//                           onChange={setSelectedVariant}
//                         />
//                       </Flex>
//                     </Box>
//                     <Box className="col-md-4 col-sm-6 order-2 order-md-3">
//                       <Flex align="center" gap={{ base: "md", md: "xl" }} justify="stretch">
//                         <Box component="label" fw={500} style={{ flex: "0 0 auto" }}>
//                           Sort By :
//                         </Box>
//                         <Select
//                           id="sortBy"
//                           w="100%"
//                           size="md"
//                           placeholder="Sort By"
//                           data={["Latest", "Highest Rated", "Lowest Rated"]}
//                           value={sortBy}
//                           onChange={setSortBy}
//                         />
//                       </Flex>
//                     </Box>
//                   </Box>
//                 </Box>
//                 {paginatedReviews.map((review, index) => (
//                   <Card
//                     key={index}
//                     py="xl"
//                     px={0}
//                     mx="xl"
//                     mb="lg"
//                     className="border-bottom customer-review-card"
//                     radius={0}
//                   >
//                     <Box className="row">
//                       <Box className="col-md-3">
//                         <Image src={review?.vehicleId?.defaultImage} alt="Vehicle Image" p="md" />
//                       </Box>
//                       <Box className="col-md-9">
//                         <Title className="text-primary" order={4} fw={600}>
//                           {review?.vehicleId?.make} {review?.vehicleId?.model} Review
//                         </Title>
//                         <Text>{`${review?.vehicleId?.year} ${review?.vehicleId?.make} ${review?.vehicleId?.model} ${review?.vehicleId?.variant}`}</Text>
//                         <Flex align="center" mt="sm">
//                           <Rating defaultValue={review?.overAllRating} />
//                           <Text span inherit>({review?.overAllRating})</Text>
//                         </Flex>
//                         {console.log(review,"Test")}
//                         {/* <Text mt="5">
//                           No of reviews <strong>(50)</strong>
//                         </Text> */}
//                         <Text c="dimmed" fw="400" mt="md" size="lg">
//                           Posted by {review?.reviewBy || "Hamza Tahir"} on {formatDate(review?.createdAt)}
//                         </Text>
//                       </Box>
//                       <Box className="col-md-12">
//                         <Text>{review?.comment}</Text>
//                       </Box>
//                       <Box className="row" mt="md">
//                         <Box className="col-md-4">
//                           <Table withRowBorders={false} horizontalSpacing={0}>
//                             <Table.Tbody>
//                               {renderRatingRow("Mileage", review?.ratings?.mileage)}
//                               {renderRatingRow("Maintenance Cost", review?.ratings?.maintenance)}
//                             </Table.Tbody>
//                           </Table>
//                         </Box>
//                         <Box className="col-md-4">
//                           <Table withRowBorders={false} horizontalSpacing={0}>
//                             <Table.Tbody>
//                               {renderRatingRow("Safety", review?.ratings?.safety)}
//                               {renderRatingRow("Features and Styling", review?.ratings?.features)}
//                             </Table.Tbody>
//                           </Table>
//                         </Box>
//                         <Box className="col-md-4">
//                           <Table withRowBorders={false} horizontalSpacing={0}>
//                             <Table.Tbody>
//                               {renderRatingRow("Comfort", review?.ratings?.comfort)}
//                               {renderRatingRow("Performance", review?.ratings?.performance)}
//                             </Table.Tbody>
//                           </Table>
//                         </Box>
//                       </Box>
//                     </Box>
//                   </Card>
//                 ))}
//               </Paper>
//             </Box>
//             <Box className="col-md-12">
//               <Pagination
//                 total={totalPages}
//                 value={currentPage}
//                 onChange={setCurrentPage}
//                 siblings={1}
//                 size="md"
//                 color="#E90808"
//               />
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       <QuickLinks />
//     </Box>
//   );
// };

// export default CompareModule;
"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Anchor,
  Box,
  Button,
  Card,
  Title,
  Text,
  Image,
  Flex,
  Rating,
  Table,
  Paper,
  Select,
  Pagination,
  rem,
} from "@mantine/core";
import QuickLinks from "@/components/QuickLinks";
import { formatDate } from "@/utils";
import Link from "next/link";
import WriteReviewModal from "@/components/ui/WriteReviewModal";

const ITEMS_PER_PAGE = 8;

const CompareModule = ({
  reviewsVehicles,
  reviewsVehiclesOverAll,
  fetchMakesByTypeData,
  variants,
  make,
  model,
  type,
}) => {
  const [selectedVariant, setSelectedVariant] = useState("All Versions");
  const [sortBy, setSortBy] = useState("Latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const filteredReviews = useMemo(() => {
    let filtered = reviewsVehicles?.data || [];

    if (selectedVariant !== "All Versions") {
      filtered = filtered.filter((review) =>
        review.vehicle.toLowerCase().includes(selectedVariant.toLowerCase())
      );
    }

    // Stable sort with selected criteria
    return filtered.slice().sort((a, b) => {
      if (sortBy === "Highest Rated")
        return (b.overAllRating || 0) - (a.overAllRating || 0);
      if (sortBy === "Lowest Rated")
        return (a.overAllRating || 0) - (b.overAllRating || 0);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [selectedVariant, sortBy, reviewsVehicles]);

  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderRatingRow = (label, value) => (
    <Table.Tr>
      <Table.Td>{label}</Table.Td>
      <Table.Td>
        <Flex justify="flex-end">
          <Rating value={value || 0} readOnly /> ({value?.toFixed(1) || 0}/5)
        </Flex>
      </Table.Td>
    </Table.Tr>
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedVariant, sortBy]);

  return (
    <>
      <Box component="section" className="car-specification">
        <Box
          className="background-search-verlay"
          mb={{ base: 380, sm: 320, md: 200 }}
          mt={60}
        >
          <Box className="container-xl">
            <Box className="row">
              <Box className="col-md-12">
                <nav className="mt-3">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Anchor href="/" component={Link}>
                        Home
                      </Anchor>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Anchor
                        href={`/reviews/${type}`}
                        component={Link}
                        tt="capitalize"
                      >
                        {type} Reviews
                      </Anchor>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Anchor href="#" tt="capitalize">
                        {make} {model} Reviews
                      </Anchor>
                    </li>
                  </ol>
                </nav>
              </Box>
              {/* OverAll Review */}
              <Box className="col-md-12">
                <Box className="search-wrapper-card">
                  <Card
                    shadow="0px 4px 20px 0px #00000014"
                    padding="lg"
                    radius="sm"
                  >
                    <Title order={3} mb="md" tt="capitalize">
                      {make} {model} Reviews
                    </Title>
                    <Box className="row">
                      <Box className="col-lg-5">
                        <Box className="row justify-content-between">
                          <Box className="col">
                            <Card shadow="none" h="100%" withBorder py="lg">
                              <Flex
                                direction="column"
                                gap="xs"
                                h="100%"
                                justify="center"
                                align="center"
                              >
                                <Image
                                  src={
                                    reviewsVehicles?.data?.[0]?.vehicleId
                                      ?.defaultImage || "/placeholder.png"
                                  }
                                  alt={`${make} Logo`}
                                  h={200}
                                  w={200}
                                />
                                <Link href={`/listing/${type}s/mk_${make}`}>
                                  <Button
                                    variant="outline"
                                    color="#E90808"
                                    mt="sm"
                                    tt="capitalize"
                                  >
                                    Used {make} {`${type}s`}
                                  </Button>
                                </Link>
                              </Flex>
                            </Card>
                          </Box>
                          <Box className="col text-center">
                            <Flex
                              py={{ base: 20, sm: 0 }}
                              direction="column"
                              h="100%"
                              align="center"
                              justify="center"
                            >
                              <Box mb="sm">
                                <Text
                                  fw="bold"
                                  size="lg"
                                  className="text-primary"
                                  tt="capitalize"
                                >
                                  {make} {model}
                                </Text>
                                <Text>Overall Ratings</Text>
                              </Box>
                              <Box mb="sm">
                                <Flex justify="center" align="center" mb="sm">
                                  <Rating
                                    value={
                                      reviewsVehiclesOverAll?.data
                                        ?.overallAverage || 0
                                    }
                                    readOnly
                                  />
                                  <Text>
                                    (
                                    {reviewsVehiclesOverAll?.data?.overallAverage?.toFixed(
                                      1
                                    ) || 0}
                                    /5)
                                  </Text>
                                </Flex>
                                <Text>
                                  No of reviews <span style={{fontWeight:"600"}}>
                                  (
                                  {reviewsVehiclesOverAll?.data?.totalReviews ||
                                    0}
                                  )
                                  </span>
                                </Text>
                                <Box mt="xl">
                                  <Button onClick={openModal} variant="filled" mt="sm" tt="capitalize" color="#E90808">
                                    Write a Review
                                  </Button>
                                </Box>
                              </Box>
                            </Flex>
                          </Box>
                        </Box>
                      </Box>
                      <Box className="col-lg-7">
                        <Box className="row">
                          <Box className="col" mt="xl">
                            <Table
                              withRowBorders={false}
                              verticalSpacing="xs"
                              horizontalSpacing="xs"
                            >
                              <Table.Tbody>
                                {renderRatingRow(
                                  "Mileage",
                                  reviewsVehiclesOverAll?.data?.mileage
                                )}
                                {renderRatingRow(
                                  "Maintenance Cost",
                                  reviewsVehiclesOverAll?.data?.maintenance
                                )}
                                {renderRatingRow(
                                  "Safety",
                                  reviewsVehiclesOverAll?.data?.safety
                                )}
                              </Table.Tbody>
                            </Table>
                          </Box>
                          <Box className="col" mt="xl">
                            <Table
                              withRowBorders={false}
                              verticalSpacing="xs"
                              horizontalSpacing="xs"
                            >
                              <Table.Tbody>
                                {renderRatingRow(
                                  "Features and Styling",
                                  reviewsVehiclesOverAll?.data?.features
                                )}
                                {renderRatingRow(
                                  "Comfort",
                                  reviewsVehiclesOverAll?.data?.comfort
                                )}
                                {renderRatingRow(
                                  "Performance",
                                  reviewsVehiclesOverAll?.data?.performance
                                )}
                              </Table.Tbody>
                            </Table>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box component="recent-reviews">
          <Box className="container-xl">
            <Box className="row">
              <Box className="col-md-12" my="xl">
                <Title tt="capitalize" size={rem("26px")}>
                  Recent {make} {model} {type}{" "}
                  <Text span inherit className="text-primary">
                    Reviews
                  </Text>
                </Title>
              </Box>
              <Box className="col-md-12">
                <Paper withBorder mb="lg" style={{ overflow: "hidden" }}>
                  <Box p="lg" px="xl" className="border-bottom bg-light">
                    <Box className="row align-items-center">
                      <Box className="col-md-2 text-center text-md-start order-3 order-md-1">
                        <Text p={{ base: "sm", md: 0 }}>
                          <strong>
                            {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                          </strong>{" "}
                          -{" "}
                          <strong>
                            {Math.min(
                              currentPage * ITEMS_PER_PAGE,
                              filteredReviews.length
                            )}
                          </strong>{" "}
                          of <strong>{filteredReviews.length}</strong> Results
                        </Text>
                      </Box>
                      <Box className="col-md-6 col-sm-6 order-1 order-md-2">
                        <Flex
                          align="center"
                          gap={{ base: "md", md: "xl" }}
                          justify="stretch"
                        >
                          <Box
                            component="label"
                            fw={500}
                            style={{ flex: "0 0 auto" }}
                          >
                            Select Variant :
                          </Box>
                          <Select
                            id="variant"
                            w="100%"
                            size="md"
                            placeholder="All Versions"
                            data={["All Versions", ...variants]}
                            value={selectedVariant}
                            onChange={setSelectedVariant}
                            comboboxProps={{ shadow: "xl" }}
                          />
                        </Flex>
                      </Box>
                      <Box className="col-md-4 col-sm-6 order-2 order-md-3">
                        <Flex
                          align="center"
                          gap={{ base: "md", md: "xl" }}
                          justify="stretch"
                        >
                          <Box
                            component="label"
                            fw={500}
                            style={{ flex: "0 0 auto" }}
                          >
                            Sort By :
                          </Box>
                          <Select
                            id="sortBy"
                            w="100%"
                            size="md"
                            placeholder="Sort By"
                            data={["Latest", "Highest Rated", "Lowest Rated"]}
                            value={sortBy}
                            onChange={setSortBy}
                            comboboxProps={{ shadow: "xl" }}
                          />
                        </Flex>
                      </Box>
                    </Box>
                  </Box>
                  {paginatedReviews?.length === 0 && (
                    <Card
                      py="xl"
                      px={0}
                      mx="xl"
                      mb="lg"
                      className="border-bottom customer-review-card text-center"
                      radius={0}
                    >
                      <Text>No Reviews Found</Text>
                    </Card>
                  )}
                  {paginatedReviews.map((review, index) => (
                    <Card
                      key={index}
                      py="xl"
                      px={0}
                      mx="xl"
                      mb="lg"
                      className="border-bottom customer-review-card"
                      radius={0}
                    >
                      <Box className="row">
                        <Box className="col-md-3">
                          <Image
                            src={
                              review?.vehicleId?.defaultImage ||
                              "/placeholder.png"
                            }
                            alt="Vehicle Image"
                            p="md"
                          />
                        </Box>
                        <Box className="col-md-9">
                          <Title className="text-primary" order={4} fw={600}>
                            {review?.vehicleId?.make} {review?.vehicleId?.model}{" "}
                            Review
                          </Title>
                          {/* {review?.vehicleId &&<Text>{`${review?.vehicleId?.year} ${review?.vehicleId?.make} ${review?.vehicleId?.model} ${review?.vehicleId?.variant}`}</Text>} */}
                          <Text>{`${review?.vehicle}`}</Text>
                          <Flex align="center" mt="sm">
                            <Rating value={review?.overAllRating || 0} readOnly />
                            <Text span inherit>
                              ({review?.overAllRating || 0})
                            </Text>
                          </Flex>
                          <Text c="dimmed" fw="400" mt="md" size="md">
                            Posted by {review?.reviewBy || "Anonymous"} on{" "}
                            {formatDate(review?.createdAt)}
                          </Text>
                        </Box>
                        <Box className="col-md-12">
                          <Text>{review?.comment}</Text>
                        </Box>
                        <Box className="row" mt="md">
                          <Box className="col-md-4">
                            <Table withRowBorders={false} horizontalSpacing={0}>
                              <Table.Tbody>
                                {renderRatingRow(
                                  "Mileage",
                                  review?.ratings?.mileage
                                )}
                                {renderRatingRow(
                                  "Maintenance Cost",
                                  review?.ratings?.maintenance
                                )}
                              </Table.Tbody>
                            </Table>
                          </Box>
                          <Box className="col-md-4">
                            <Table withRowBorders={false} horizontalSpacing={0}>
                              <Table.Tbody>
                                {renderRatingRow(
                                  "Safety",
                                  review?.ratings?.safety
                                )}
                                {renderRatingRow(
                                  "Features and Styling",
                                  review?.ratings?.features
                                )}
                              </Table.Tbody>
                            </Table>
                          </Box>
                          <Box className="col-md-4">
                            <Table withRowBorders={false} horizontalSpacing={0}>
                              <Table.Tbody>
                                {renderRatingRow(
                                  "Comfort",
                                  review?.ratings?.comfort
                                )}
                                {renderRatingRow(
                                  "Performance",
                                  review?.ratings?.performance
                                )}
                              </Table.Tbody>
                            </Table>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  ))}
                </Paper>
              </Box>
              <Box className="col-md-12 text-center">
                <Pagination
                  total={totalPages}
                  value={currentPage}
                  onChange={setCurrentPage}
                  siblings={1}
                  size="md"
                  color="#E90808"
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <QuickLinks />
      </Box>
      <WriteReviewModal
        opened={isModalOpen}
        close={closeModal}
        fetchMakesByTypeData={fetchMakesByTypeData}
        fetchReviews={() => { }}
      />
    </>
  );
};

export default CompareModule;
