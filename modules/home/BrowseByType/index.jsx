"use client";
import React, { useEffect, useState } from "react";
import { Box, Pagination, Text, Title } from "@mantine/core";
import CarCard from "@/components/ui/CarCard";
import { fetchAPI } from "@/services/fetchAPI";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { RightArrowIcon } from "@/components/Icons";
import Link from "next/link";
import styles from './BrowseByType.module.css';
import { getLocalStorage } from "@/utils";

const BrowseByType = ({ bg, pagination, vehicles: initialVehicles }) => {
  const [selectedType, setSelectedType] = useState("All");
  const [vehicles, setVehicles] = useState(initialVehicles || []);
  const userData = getLocalStorage('user')
  const handleTypeChange = async (type) => {
    setSelectedType(type);
    const res = await fetchAPI(
      API_ENDPOINTS.VEHICLE.LIST_BY_TYPE(type === "All" ? "" : type) // Handle "All" case by passing an empty string
    );

    setVehicles(res || []);
  };

  useEffect(()=>{
    handleTypeChange(selectedType)
  },[])
  return (
    <section className={`browse-type-section py-5 ${bg || ""}`}>
      <Box className="container-xl">
        <Box className="row">
          <Box className="col">
            <Box className="d-flex align-items-center justify-content-between">
              <Title order={2} lts={-0.5}>
                Browse By{" "}
                <Text span c="#E90808" inherit>
                  Type
                </Text>
              </Title>
              <ul className="nav nav-pills gap-2" id="pills-tab" role="tablist">
                {[
                  { label: "All", value: "All" },
                  { label: "Cars", value: "car" },
                  { label: "Bike", value: "bike" },
                  { label: "Truck", value: "truck" },
                ].map((type, index) => (
                  <li key={index} className="nav-item" role="presentation">
                    <button
                      className={`${styles.typeItem} ${selectedType === type.value ? styles.active : ""
                        }`}
                      onClick={() => handleTypeChange(type.value)}
                    >
                      {type.label}
                    </button>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
          <Box className="col-lg-12">
            <Box className="tab-content" id="pills-tabContent">
              <Box className="tab-pane fade show active" id="pills-home">
                <Box className="row">
                  {vehicles?.data?.results?.map((vehicle, index) => (
                    <Box className="col-lg-3" key={index}>
                      <CarCard index={index} vehicle={vehicle} userData={userData} />
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box className="col-lg-12">
                <Box className="tab-content" id="pills-tabContent" mt="32px">
                  <Box className="tab-pane fade show active" id="pills-home">
                    <Box className="row">
                      {vehicles?.data?.map((vehicle, index) => (
                        <>
                          <Box className="col-lg-3 col-sm-6" key={index}>
                            <CarCard index={index} vehicle={vehicle} userData={userData} />
                          </Box>
                        </>
                      ))}
                      {selectedType !== "All" && (
                        <Link href={`/listing/${selectedType}s`}> 
                          {" "}
                          <Text fz="sm" c="#EB2321" ta="right">
                            Show More Ads <RightArrowIcon />
                          </Text>
                        </Link>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
              {pagination && (
                <Box className="col-lg-12">
                  <Pagination total={10} color="#EB2321" />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default BrowseByType;
