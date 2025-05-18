"use client";

import { Group, Badge, rem } from "@mantine/core";
import Link from "next/link";
import { MdClose } from "react-icons/md";

const filterConfigs = {
  mk_: { type: "make", label: "make" },
  md_: { type: "model", label: "model" },
  vr_: { type: "variant", label: "variant" },
  vt_: { type: "variant", label: "variant" },
  ct_: { type: "city", label: "city" },
  bt_: { type: "bodyType", label: "bodyType" },
  tr_: { type: "transmission", label: "transmission" },
  dr_: { type: "drive", label: "drive" },
  cl_: { type: "exteriorColor", label: "exteriorColor" },
  ft_: { type: "fuelType", label: "fuelType" },
  pr_: { type: "price", label: "price", isRange: true },
  yr_: { type: "year", label: "year", isRange: true },
  ml_: { type: "mileage", label: "mileage", isRange: true },
};

export const FilterBadges = ({ params, searchParams }) => {
  const slug = params.slug;

  const removeFilter = (fullValue) => {
    const urlParts = window.location.pathname.split('/');
    const vehicleType = urlParts[1];
    const filteredSlug = slug.filter((item) => item !== fullValue);
    let newPath = `/${vehicleType}/search/${filteredSlug.join('/')}`;

    if (searchParams?.view) {
      newPath += `?view=${searchParams.view}`;
    }

    return newPath;
  };

  const renderBadges = () => {
    return slug
      .map((item, index) => {
        const prefix = Object.keys(filterConfigs).find((key) =>
          item.startsWith(key)
        );
        if (!prefix) return null;

        const config = filterConfigs[prefix];
        let value = item.replace(prefix, "");
        
        try {
          value = decodeURIComponent(value).replace(/-/g, ' ');
        } catch (e) {
          console.error("Error decoding URL parameter:", e);
        }
        
        const displayValue = config.isRange
          ? value.split("_").join(" - ")
          : value;

        return (
          <Badge
            pt={rem(5)}
            pb={rem(20)}
            px={rem(12)}
            variant="light"
            fw={500}
            fz={rem(12)}
            color="#E90808"
            key={`${config.type}-${index}`}
            rightSection={
              <Link href={removeFilter(item)}>
                <MdClose
                  style={{
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                    ":hover": {
                      opacity: 0.7,
                    },
                  }}
                />
              </Link>
            }
            styles={{
              rightSection: {
                "&:hover": {
                  opacity: 0.7,
                },
              },
            }}
          >
            {displayValue}
          </Badge>
        );
      })
      .filter(Boolean);
  };

  return (
    <Group
      gap="xs"
      mb="md"
      justify="flex-start"
      pb="1rem"
      style={{ borderBottom: "1px solid #CCCCCC" }}
    >
      {renderBadges()}
    </Group>
  );
}; 