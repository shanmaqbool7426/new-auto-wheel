'use client';
import React from 'react';
import Search from '@/components/user-dashboard/Search';
import FormField from '@/components/user-dashboard/FormField';
import DataTable from '@/components/user-dashboard/DataTable';
import { Box, Text } from '@mantine/core';
import classes from './Followers.module.css';
import { getColumns } from './data';
import useFollowings from './useFollowings';

export default function Following({userId}) {
  const {
    followers,
    loading,
    error,
    setSearchBy,
    filterParams,
    pagination,
    handleChangeFilter,
    handlePageChange,
    handleUnfollow,
  } = useFollowings(userId);

  const columns = getColumns(handleUnfollow);
console.log('pagination',pagination)
  // if (loading) return <Loader />;
  // if (error) return <Text color="red">{error}</Text>;

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
              onChange={(value) => handleChangeFilter('date', value)}
            />
          </Box>
        </Box>
      </Box>

      <Box>
        <DataTable
          columns={columns}
          records={followers || []}
          totalRecords={pagination.total}
          totalPages={pagination.totalPages}
          page={pagination.page}
          onPageChange={handlePageChange}
          pageSize={pagination.limit}
          loading={loading}
          loaderSize="sm"
          emptyState={
            error ? (
              <Text color="red" align="center" p="md">
                {error}
              </Text>
            ) : (
              <Text align="center" p="md">
                No following users found
              </Text>
            )
          }
        />
      </Box>

      {/* <Box mt="md" display="flex" justifyContent="center">
        <Pagination
          total={pagination.totalPages}
          value={pagination.page}
          onChange={handlePageChange}
        />
      </Box> */}
    </>
  )
}
