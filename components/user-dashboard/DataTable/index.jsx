import React from 'react';
import { DataTable as MantineDataTable } from 'mantine-datatable';
import 'mantine-datatable/styles.layer.css';
import classes from './DataTable.module.css'

export default function DataTable({ 
  enablePagination = true, 
  columns, 
  records, 
  totalRecords,
  currentPage=1,
  onPageChange,
  pageSize = 10,
  loading = false,
  ...rest 
}) {
  // Only show pagination if enablePagination is true and we have records
  const shouldShowPagination = enablePagination && records?.length > 0;

  return (
    <MantineDataTable
      columns={columns}
      records={records}
      totalRecords={totalRecords}
      recordsPerPage={pageSize}
      page={currentPage}
      onPageChange={onPageChange}
      paginationText={({ from, to, totalRecords }) => 
        shouldShowPagination 
          ? `Showing ${from} to ${to} of ${totalRecords} results`
          : null
      }
      withPagination={shouldShowPagination}
      classNames={{
        root: classes.root,
        table: classes.table,
        header: classes.header,
        footer: classes.footer,
        pagination: classes.pagination,
      }}
      styles={{
        rowExpansionCellContent: {
          backgroundColor: '#f9f9f9',
        },
      }}
      fetching={loading}
      loaderSize="sm"
      loaderVariant="dots"
      {...rest}
    />
  )
}