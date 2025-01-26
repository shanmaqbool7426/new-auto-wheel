"use client";
import {
  Flex,
  Text,
  Title,
  Anchor,
  Rating,
  Button,
  Group,
  Loader,
  Alert,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { fetchTopComparisonByTypeServer } from "@/actions/index"; // Adjust the import path as needed

const TopComparison = ({ title, type }) => {
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchComparisons = async () => {
      try {
        const data = await fetchTopComparisonByTypeServer(type);
       
        setComparisons(data); // Adjust based on your API response structure
      } catch (err) {
        console.error("Error fetching comparisons:", err);
        setError("Failed to load comparisons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchComparisons();
  }, [type]);

  if (loading) {
    return (
      <section className="comparison-products bg-light py-5">
        <div className="container-xl">
          <Flex justify="center" align="center" direction="column" gap="md">
            <Loader />
            <Text>Loading comparisons...</Text>
          </Flex>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="comparison-products bg-light py-5">
        <div className="container-xl">
          <Alert title="Error" color="red">
            {error}
          </Alert>
        </div>
      </section>
    );
  }

  if (comparisons?.data?.length === 0 || !comparisons?.data) {
    return (
      <section className="comparison-products bg-light py-5">
        <div className="container-xl">
          <Flex justify="space-between" align="center" mb="xl">
            {title ? (
              <Title order={2} lts={-0.5}>
                {title}
              </Title>
            ) : (
              <Title order={2} lts={-0.5}>
                Top{" "}
                <Text span color="#E90808" inherit>
                  Comparison
                </Text>
              </Title>
            )}

            {/* <Anchor component={Link} href="#" color="#E90808">
              Show all Comparisons
            </Anchor> */}
          </Flex>
          <Text size="lg" align="center">
            No comparisons to show
          </Text>
        </div>
      </section>
    );
  }


  return (
    <section className="comparison-products bg-light py-5">
      <div className="container-xl">
        <Flex justify="space-between" align="center" mb="xl">
          {title ? (
            <Title order={2} lts={-0.5}>
              {title}
            </Title>
          ) : (
            <Title order={2} lts={-0.5}>
              Top{" "}
              <Text span color="#E90808" inherit>
                Comparison
              </Text>
            </Title>
          )}

          {/* <Anchor component={Link} href="/comparisons" color="#E90808">
            Show all Comparisons
          </Anchor> */}
        </Flex>
        <div className="row">
          {comparisons?.data?.map((comparison, index) => (
            <div className="col-lg-4" key={index}>
              <div className="card comparison-card">
                <div className="two-col-comparison position-relative">
                  <div className="product-compare product-first justify-content-start">
                    <Image
                      src={comparison.vehicle1.defaultImage || ""}
                      width={143}
                      height={88}
                      className="img-fluid object-fit-cover"
                      // alt={`${comparison.vehicle1.make} ${comparison.vehicle1.model}`}
                    />
                  </div>
                  <span className="compare-txt">VS</span>
                  <div className="product-compare product-second justify-content-end">
                    <Image
                      src={comparison.vehicle2.defaultImage || ""}
                      width={143}
                      height={88}
                      className="img-fluid object-fit-cover"
                      // alt={`${comparison.vehicle2.make} ${comparison.vehicle2.model}`}
                    />
                  </div>
                </div>
                <div className="card-body">
                  <Group justify="space-between">
                    <Flex direction="column" gap="5">
                      <Title order={6} fw={600}>
                        {`${comparison.vehicle1.make} ${comparison.vehicle1.model} (${comparison.vehicle1.year})`}
                      </Title>
                      <Flex align="center" justify="center" gap={5}>
                      <Rating
                          value={comparison.vehicle1.averageRating || 0}
                          fractions={2}
                          readOnly
                        />
                        ({comparison.vehicle1.reviewCount || 0})
                      </Flex>
                    </Flex>
                    <Flex direction="column" gap="5">
                      <Title order={6} fw={600}>
                      {`${comparison.vehicle2.make} ${comparison.vehicle2.model} (${comparison.vehicle2.year})`}
                      </Title>
                      <Flex align="center" justify="center" gap={5}>
                        <Rating
                          value={comparison.vehicle2.averageRating || 0}
                          fractions={2}
                          readOnly
                        />
                        ({comparison.vehicle2.reviewCount || 0})
                      </Flex>
                    </Flex>
                    <Button
                      variant="outline"
                      color="#E90808"
                      fullWidth
                      size="md"
                      component={Link}
                      href={`/comparison/${type}/${comparison.vehicle1.make}-${comparison.vehicle1.model}-${comparison.vehicle1.variant}_${comparison.vehicle2.make}-${comparison.vehicle2.model}-${comparison.vehicle2.variant}`}
                    >
                      Compare
                    </Button>
                  </Group>
                </div>
              </div>
            </div>
            // <div className="col-lg-4 mb-4" key={index}>
            //   <div className="card comparison-card h-100">
            //     <div className="two-col-comparison position-relative p-3">
            //       <div className="product-compare product-first d-flex justify-content-start align-items-center">
            //         <Image
            //           src={comparison.vehicle1.defaultImage}
            //           width={143}
            //           height={88}
            //           className="img-fluid object-fit-cover"
            //           alt={`${comparison.vehicle1.make} ${comparison.vehicle1.model}`}
            //         />
            //       </div>
            //       <span className="compare-txt">VS</span>
            //       <div className="product-compare product-second d-flex justify-content-end align-items-center">
            //         <Image
            //           src={comparison.vehicle2.defaultImage}
            //           width={143}
            //           height={88}
            //           className="img-fluid object-fit-cover"
            //           alt={`${comparison.vehicle2.make} ${comparison.vehicle2.model}`}
            //         />
            //       </div>
            //     </div>
            //     <div className="card-body">
            //       <Group position="apart" align="flex-start">
            //         <Flex direction="column" gap="sm" style={{ flex: 1 }}>
            //           {/* Vehicle 1 Details */}
            //           <Flex direction="column" gap="xs">
            //             <Title order={6} fw={600}>
            //               {`${comparison.vehicle1.make} ${comparison.vehicle1.model} (${comparison.vehicle1.year})`}
            //             </Title>
            //             <Flex align="center" gap={5}>
            //               <Rating
            //                 value={comparison.vehicle1.averageRating || 0}
            //                 fractions={2}
            //                 readOnly
            //               />
            //               <Text size="sm" color="dimmed">
            //                 ({comparison.vehicle1.reviewCount || 0})
            //               </Text>
            //             </Flex>
            //             <Text size="sm" color="dimmed">
            //               Price: ₱{comparison.vehicle1.minPrice.toLocaleString()} - ₱{comparison.vehicle1.maxPrice.toLocaleString()}
            //             </Text>
            //           </Flex>

            //           {/* Vehicle 2 Details */}
            //           <Flex direction="column" gap="xs">
            //             <Title order={6} fw={600}>
            //               {`${comparison.vehicle2.make} ${comparison.vehicle2.model} (${comparison.vehicle2.year})`}
            //             </Title>
            //             <Flex align="center" gap={5}>
            //               <Rating
            //                 value={comparison.vehicle2.averageRating || 0}
            //                 fractions={2}
            //                 readOnly
            //               />
            //               <Text size="sm" color="dimmed">
            //                 ({comparison.vehicle2.reviewCount || 0})
            //               </Text>
            //             </Flex>
            //             <Text size="sm" color="dimmed">
            //               Price: ₱{comparison.vehicle2.minPrice.toLocaleString()} - ₱{comparison.vehicle2.maxPrice.toLocaleString()}
            //             </Text>
            //           </Flex>
            //         </Flex>
            //         <Button
            //           variant="outline"
            //           color="#E90808"
            //           size="md"
            //           component={Link}
            //           href={`/compare/${comparison.vehicle1.slug}-vs-${comparison.vehicle2.slug}`}
            //           style={{ alignSelf: "center" }}
            //         >
            //           Compare <BsArrowRight />
            //         </Button>
            //       </Group>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopComparison;
