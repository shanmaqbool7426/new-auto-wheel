import React from 'react';
import { DataTable as MantineDataTable } from 'mantine-datatable';
import { Text, Flex, Box } from '@mantine/core';
import Image from 'next/image';
import 'mantine-datatable/styles.layer.css';
import classes from './DataTable.module.css';

export default function DataTable({ columns, records, idAccessor = 'id' }) {
  const PAGE_SIZE = 14;
  const [page, setPage] = React.useState(1);

  const expandedContent = (record) => (
    <Flex className={classes.expandedContent} align="center">
      <Box className={classes.expandedImageContainer}>
        {/* <Image src={record.title.image} alt="car" width={100} height={60} objectFit="cover" /> */}
      </Box>
      <Flex className={classes.expandedDetails}>
      <Box>
            <Text><strong>Views</strong></Text>
            <Text>{record.views}</Text>
          </Box>
          <Box>
            <Text><strong>Clicks</strong></Text>
            <Text>{record.views}</Text>
          </Box>
          <Box>
            <Text><strong>No View</strong></Text>
            <Text>{record.views}</Text>
          </Box>
          <Box>
            <Text><strong>City</strong></Text>
            <Text>{record.city}</Text>
          </Box>
          <Box>
            <Text><strong>Mileage</strong></Text>
            <Text>{record.specifications.mileage}</Text>
          </Box>
          <Box>
            <Text><strong>Transmission</strong></Text>
            <Text>{record.specifications.transmission}</Text>
          </Box>
          <Box>
            <Text><strong>Fuel Type</strong></Text>
            <Text>{record.specifications.fuelType}</Text>
          </Box>
          <Box>
            <Text><strong>Rego Expire</strong></Text>
            <Text>{record.specifications.regoExpire}</Text>
          </Box>
      </Flex>
    </Flex>
  );

  return (
    <MantineDataTable
      withBorder
      withColumnBorders
      columns={columns}
      records={records}
      totalRecords={records.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p) => setPage(p)}
      paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} results`}
      classNames={{
        root: classes.root,
        table: classes.table,
        header: classes.header,
        footer: classes.footer,
        pagination: classes.pagination,
      }}
      rowExpansion={{
        content: ({ record }) => expandedContent(record),
      }}
    />
  );
}