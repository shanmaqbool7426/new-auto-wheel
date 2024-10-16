import React from 'react';
import { DataTable as MantineDataTable } from 'mantine-datatable';
import 'mantine-datatable/styles.layer.css';
import classes from './DataTable.module.css'

export default function DataTable({ enablePagination = true, columns, records, ...rest }) {
  const PAGE_SIZE = 14;
  const [page, setPage] = React.useState(1);

  const handleRowExpand = (record) => {
    if (onRowExpand) {
      onRowExpand(record.id);
    }
  };

  // console.log('expandedRecordIds',expandedRecordIds)

  return (
    <MantineDataTable
      columns={columns}
      records={records}
      totalRecords={enablePagination ? records.length : undefined}
      recordsPerPage={enablePagination ? PAGE_SIZE : undefined}
      page={enablePagination ? page : undefined}
      onPageChange={enablePagination ? (p) => setPage(p) : undefined}
      paginationText={enablePagination ? ({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} results` : undefined}
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
      {...rest}
      enablePagination={false}
    />
  )
}