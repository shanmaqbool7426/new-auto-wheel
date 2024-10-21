import React from 'react';
import { DataTable as MantineDataTable } from 'mantine-datatable';
import 'mantine-datatable/styles.layer.css';
import classes from './DataTable.module.css'

export default function DataTable({ enablePagination = true, columns, totalPages,totalRecords,records, ...rest }) {
  const PAGE_SIZE = 14;
  const [page, setPage] = React.useState(3);

  const handleRowExpand = (record) => {
    if (onRowExpand) {
      onRowExpand(record.id);
    }
  };
  
console.log('totalPages',totalPages)
  // console.log('expandedRecordIds',expandedRecordIds)

  return (
    <MantineDataTable
    columns={columns}
    records={records}
    totalRecords={totalRecords}
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
    styles={{
      rowExpansionCellContent: {
        backgroundColor: '#f9f9f9',
      },
    }}
    {...rest}
    />
  )
}