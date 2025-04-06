"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Pagination } from "@mantine/core";
import { useRouter, useParams, useSearchParams } from "next/navigation";

const ListingPagination = ({ data, type, isUsed = false }) => {
  const router = useRouter();
  const { slug } = useParams();
  const searchParams = useSearchParams();

  const pathSegments = slug ? [...slug] : [];
  const pageSegmentIndex = pathSegments.findIndex((segment) =>
    segment.startsWith("page_")
  );
  const currentPage =
    pageSegmentIndex > -1
      ? parseInt(pathSegments[pageSegmentIndex].replace("page_", ""), 10)
      : 1;

  const [pagination, setPagination] = useState({
    page: currentPage,
    limit: 10,
  });

  const updatePaginationInUrl = useCallback(
    (newPage) => {
      let updatedPathSegments = [...pathSegments];

      if (pageSegmentIndex > -1) {
        updatedPathSegments[pageSegmentIndex] = `page_${newPage}`;
      } else {
        updatedPathSegments.push(`page_${newPage}`);
      }

      const updatedPath = updatedPathSegments.join("/");
      const baseUrl = isUsed ? `/used-${type}s` : `/new/${type}`;

      const queryString = searchParams.toString();
      const finalUrl = queryString
        ? `${baseUrl}/search/${updatedPath}?${queryString}`
        : `${baseUrl}/search/${updatedPath}`;

      router.push(finalUrl, { scroll: false });
    },
    [pathSegments, pageSegmentIndex, searchParams, router, type, isUsed]
  );

  const handlePageChange = useCallback(
    (val) => {
      setPagination((prev) => ({
        ...prev,
        page: val,
      }));

      updatePaginationInUrl(val);
    },
    [updatePaginationInUrl]
  );

  useEffect(() => {
    if (
      pageSegmentIndex > -1 &&
      parseInt(pathSegments[pageSegmentIndex].replace("page_", ""), 10) !==
        pagination.page
    ) {
      setPagination((prev) => ({
        ...prev,
        page: parseInt(pathSegments[pageSegmentIndex].replace("page_", ""), 10),
      }));
    }
  }, []);

  return (
    <Pagination
      total={Math.ceil((data?.totalResults || 0) / pagination.limit)}
      value={pagination.page}
      onChange={handlePageChange}
      color="red"
      radius="md"
      withEdges
    />
  );
};

export default ListingPagination;
