"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BsGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import Select from "@/components/Select";
import { Title } from "@mantine/core";

export const ListingHeader = ({ type }) => {
  const ListingTitle = () => {
    switch (type) {
      case "cars":
        return "Cars";
      case "bikes":
        return "Bikes";
      case "trucks":
        return "Trucks";
      default:
        return "Cars";
    }
  };
  const router = useRouter();
  const searchParams = useSearchParams();

  const [view, setView] = useState("list");
  const [sortBy, setSortBy] = useState("");
  const sortOptions = [
    { value: "latest", label: "Date: Newest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];
  useEffect(() => {
    const sortParam = searchParams.get("sortBy");
    const viewParam = searchParams.get("view");

    if (sortParam) {
      setSortBy(sortParam);
    }

    if (viewParam) {
      setView(viewParam);
    }
  }, [searchParams]);

  const updateQueryParams = (newSortBy, newView) => {
    const params = new URLSearchParams(searchParams);

    if (newSortBy) {
      params.set("sortBy", newSortBy);
    }

    if (newView) {
      params.set("view", newView);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    updateQueryParams(val, view);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    updateQueryParams(sortBy, newView);
  };

  return (
    <div className="toolbox mt-4">
      <div className="toolbox-left">
        <Title order={2} lts={-0.4}>
          {ListingTitle()} for <span className="text-primary">Sale</span>
        </Title>
      </div>
      <div className="toolbox-right">
        <div className="select-filter-listing">
          <label htmlFor="sort_by">SORT BY:</label>
          <div className="select-custom">
            <Select
              className="form-select form-select-sm"
              aria-label="Sort By"
              id="sort_by"
              options={sortOptions}
              value={sortBy}
              onChange={handleSortChange}
            />
          </div>
        </div>
        <div className="grid-sort-btns">
          <button
            className={`sort-grid ${view === "grid" ? "active" : ""}`}
            onClick={() => handleViewChange("grid")}
          >
            <BsGridFill />
          </button>
          <button
            className={`sort-grid ${view === "list" ? "active" : ""}`}
            onClick={() => handleViewChange("list")}
          >
            <FaList />
          </button>
        </div>
      </div>
    </div>
  );
};
