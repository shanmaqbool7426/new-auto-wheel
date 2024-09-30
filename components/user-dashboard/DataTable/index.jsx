import React from 'react';
import { DataTable as MantineDataTable } from 'mantine-datatable';
import 'mantine-datatable/styles.layer.css';
import classes from './DataTable.module.css'

export default function DataTable({ columns, records }) {
  const PAGE_SIZE = 14;
  const [page, setPage] = React.useState(1);
  // const [records, setRecords] = React.useState(records.slice(0, PAGE_SIZE));
  return (
    <MantineDataTable
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
    />
  )
}
