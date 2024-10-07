import React from 'react';
import { DataTable as MantineDataTable } from 'mantine-datatable';
import 'mantine-datatable/styles.layer.css';
import classes from './DataTable.module.css'

export default function DataTable({ columns, records, expandedRecordIds, onRowExpand, ...rest }) {
  const PAGE_SIZE = 14;
  const [page, setPage] = React.useState(1);

  const handleRowExpand = (record) => {
    if (onRowExpand) {
      onRowExpand(record.id);
    }
  };

  console.log('expandedRecordIds',expandedRecordIds)

  return (
    <MantineDataTable
    {...rest}
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
    styles={{
      rowExpansionCellContent: {
        backgroundColor: '#f9f9f9',
      },
    }}
    expandedRecordIds={expandedRecordIds}
      onRowExpand={handleRowExpand}
    />
  )
}