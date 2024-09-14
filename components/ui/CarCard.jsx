import { GearsHandle } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import styles from "../../app/styles/components/product.module.scss";

import React from "react";
import { FaLocationDot, FaCalendarDays, FaClock } from "react-icons/fa6";
import { Box } from "@mantine/core";

const CarCard = ({ vehicle, index }) => {
  return (

    <Box className="card product-card">
      <img
        src={vehicle?.defaultImage ? vehicle?.defaultImage : "/products/product-placeholder.png"}
        alt="..."
        style={{objectFit:'cover',maxHeight:'160px',minHeight:'160px'}}
      />
      <div className="progress-bars">
        <span className="single-bar active"></span>
        <span className="single-bar"></span>
        <span className="single-bar"></span>
      </div>
      <div className="card-body">
        <div className="product-content">
          <Link href={`/detail/${vehicle?.slug}`} className="d-inline-block w-50 lc-2 product-title">
            {`${vehicle?.year}  ${vehicle?.make} ${vehicle?.model}`}
          </Link>
          <div className="product-price">Rs {vehicle?.price}</div>
        </div>
        <div className="product-meta">
          <div className="meta-info d-flex justify-content-between align-items-center">
            <span className="text-muted d-flex align-items-center gap-1">
              <FaCalendarDays /> {vehicle?.year}
            </span>
            <span className="text-muted d-flex align-items-center gap-1">
              <GearsHandle />  {vehicle?.specifications?.transmission}
            </span>
            <span className="text-muted d-flex align-items-center gap-1">
              <FaLocationDot /> {vehicle?.city}
            </span>
          </div>
          <div className="stock-info d-flex justify-content-between align-items-center mt-2">
            <span>
              <span className="text-muted">stock#</span> {vehicle?.specifications?.stockId}
            </span>
            <span className="text-muted">
              <FaClock /> (Updated 1 month ago)
            </span>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default CarCard;
