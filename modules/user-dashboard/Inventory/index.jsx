'use client';
import React from 'react';
import Search from '@/components/user-dashboard/Search';
import FormField from '@/components/user-dashboard/FormField';
import DataTable from '@/components/user-dashboard/DataTable';
import { Box } from '@mantine/core';
import classes from './Inventory.module.css';
import { getColumns, companies } from './data';
import useInventory from './useInventory';
import RowDetails from './RowDetails';

export default function Inventory() {
  const {
    setSearchBy,
    filterParams,
    handleChangeFilter,
    handleClickEditRow,
    handleClickDeleteRow,
    handleClickToggleRow,
  } = useInventory();

  const columns = getColumns(handleClickEditRow, handleClickDeleteRow, handleClickToggleRow)

  return (
    <>
      <Box className={classes.toolbar}>
        <Box className={classes.searchwrapper}>
          <Box className={classes.search}>
            <Search setSearchBy={setSearchBy} />
          </Box>
        </Box>

        <Box className={classes.actions}>
          <Box className={classes.action}>
            <FormField
              type="select"
              name="type"
              data={[
                { value: 'car', label: 'Car' },
                { value: 'bike', label: 'Bike' },
                { value: 'truck', label: 'Truck' },
              ]}
              placeholder="Select type"
              checkIconPosition="right"
              value={filterParams.type}
              onChange={(_value, option) => handleChangeFilter('type', option.value)}
            />
          </Box>
          <Box className={classes.action}>
            <FormField
              type="select"
              name="status"
              data={[
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
                { value: 'Pending', label: 'Pending' },
                { value: 'Expired', label: 'Expired' },
                { value: 'Rejected', label: 'Rejected' },
              ]}
              placeholder="Status"
              checkIconPosition="right"
              value={filterParams.status}
              onChange={(_value, option) => handleChangeFilter('status', option.value)}
            />
          </Box>
          <Box className={classes.actionLg}>
            <FormField
              type="select"
              name="date"
              data={[
                { value: 'newToOld', label: 'Date, new to old' },
                { value: 'oldToNew', label: 'Date, old to new' },
              ]}
              placeholder="Date, new to old"
              checkIconPosition="right"
              value={filterParams.date}
              onChange={(_value, option) => handleChangeFilter('date', option.value)}
            />
          </Box>
        </Box>
      </Box>

      <Box>
        <DataTable
          columns={columns}
          records={companies || []}
          rowExpansion={{
            content: ({ record }) => (
              <>
                <RowDetails record={record} />
              </>
            ),
          }}
        />
      </Box>
    </>
  )
}
