'use client';
import React from 'react';
import Search from '@/components/user-dashboard/Search';
import FormField from '@/components/user-dashboard/FormField';
import DataTable from '@/components/user-dashboard/DataTable';
import { Box, Loader, Text } from '@mantine/core';
import classes from './Favorite.module.css';
import { getColumns } from './data';
import useFavorite from './useFavorite';

export default function Favorite({ userId }) { // Accept userId as a prop
  const {
    favoriteVehicles,
    loading,
    error,
    setSearchBy,
    filterParams,
    handleChangeFilter,
    handleClickDeleteRow,
    page,
    totalPages,
    totalVehicles,
    handlePageChange,
  } = useFavorite(userId);

  const columns = getColumns(handleClickDeleteRow);

  // if (loading) return <Loader />;
  // if (error) return <Text color="red">Error fetching favorite vehicles</Text>;

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
              onChange={(_value, option) => {
                if (option) {
                  handleChangeFilter('date', option.value);
                }
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box>
        <DataTable
          columns={columns}
          records={favoriteVehicles || []}
          totalRecords={totalVehicles}
          totalPages={totalPages}
          page={page}
          onPageChange={handlePageChange}
          pageSize={10}
          loading={loading}
          loaderSize="sm"
        />
      </Box>
    </>
  );
}
