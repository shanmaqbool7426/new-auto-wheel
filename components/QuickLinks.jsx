"use client";
import { BASE_URL } from "@/constants/api-endpoints";
import { fetchAPI } from "@/services/fetchAPI";
import { Box, Title, SimpleGrid, Anchor } from "@mantine/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { fetchAPI, BASE_URL } from "../utils/api";

const QuickLinks = ({ titlePopular, titleUsed, vehicleType }) => {
  const [popularLinkData, setPopularLinkData] = useState([]);
  const [usedLinkData, setUsedLinkData] = useState([]);

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await fetchAPI(`${BASE_URL}/api/footer?vehicleType=${vehicleType}`);
        setPopularLinkData(res?.data.filter((linksData) => linksData.section === "popular-used"));
        setUsedLinkData(res?.data.filter((linksData) => linksData.section === "used-by-city"));
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    getFooterData();
  }, []);

  // Helper function to chunk array into groups
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr?.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  // Create chunks for both popular and used links
  const popularLinksChunks = popularLinkData ? chunkArray(popularLinkData, 2) : [];
  const usedLinksChunks = usedLinkData ? chunkArray(usedLinkData, 2) : [];

  return (
    <Box component="section" className="quick-links" py="56px">
      <Box className="container-xl">
        <SimpleGrid cols={1} mb="24px">
          <Title order={3} lh="1">
            {titlePopular ? titlePopular : "Popular Used Trucks"}
          </Title>
        </SimpleGrid>
        <SimpleGrid cols={{ base: 3, sm: 3, md: 6, lg: 6, xl: 6 }} spacing="md">
          {popularLinksChunks.map((chunk, index) => (
            <ul key={index} className="list-unstyled">
              {chunk.map((link) => (
                <li key={link._id}>
                  <Anchor component={Link} href={link.url} underline="never">
                    {link.title} for Sale
                  </Anchor>
                </li>
              ))}
            </ul>
          ))}
        </SimpleGrid>

        {/* Used Car Links */}
        <SimpleGrid cols={1} mb="24px" mt="56px">
          <Title order={3}>{titleUsed ? titleUsed : "Used Cars by City"}</Title>
        </SimpleGrid>

        <SimpleGrid cols={{ base: 3, sm: 3, md: 6, lg: 6, xl: 6 }} spacing="md">
          {usedLinksChunks.map((chunk, index) => (
            <ul key={index} className="list-unstyled">
              {chunk.map((link) => (
                <li key={link._id}>
                  <Anchor component={Link} href={link.url} underline="never">
                    Used {vehicleType}s {link.title}
                  </Anchor>
                </li>
              ))}
            </ul>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default QuickLinks;
