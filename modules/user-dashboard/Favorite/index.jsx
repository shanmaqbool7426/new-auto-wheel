'use client';
import React from 'react';
import Search from '@/components/user-dashboard/Search';
import FormField from '@/components/user-dashboard/FormField';
import DataTable from '@/components/user-dashboard/DataTable';
import { Box } from '@mantine/core';
import classes from './Favorite.module.css';
import { getColumns, favoriteData } from './data';
import useFavorite from './useFavorite';

export default function Favorite() {
  const {
    setSearchBy,
    filterParams,
    handleChangeFilter,
    handleClickDeleteRow,
  } = useFavorite();

  const columns = getColumns(handleClickDeleteRow)

  return (
    <>
      <Box className={classes.toolbar}>
        <Box className={classes.searchwrapper}>
          <Box className={classes.search}>
            <Search setSearchBy={setSearchBy} />
          </Box>
        </Box>

        <Box className={classes.actions}>
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
          records={favoriteData || []}
        />
      </Box>
    </>
  )
}
