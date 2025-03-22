'use client';
import React from 'react';
import Search from '@/components/user-dashboard/Search';
import FormField from '@/components/user-dashboard/FormField';
import DataTable from '@/components/user-dashboard/DataTable';
import { Box, Modal, Group, Button, Text } from '@mantine/core';
import classes from './Inventory.module.css';
import { getColumns } from './data';
import useInventory from './useInventory';
import RowDetails from './RowDetails';
import { IconModalClose } from '@/assets/icons';
import buttonStyles from '@/styles/user-dashboard/Button.module.css';

export default function Inventory() {
  const {
    searchBy,
    setSearchBy,
    filterParams,
    vehicles,
    handleChangeFilter,
    handleClickEditRow,
    handleClickDeleteRow,
    handleClickToggleRow,
    loading,
    error,
    handleExpandRow,
    expandedRowIds,
    handleToggleFeature,
    totalVehicles,
    totalPages,
    opened,
    openModalMakeFeature,
    closeModalMakeFeature,
    form,
    handleSubmit,
    deleteModalOpened,
    closeDeleteModal,
    vehicleToDelete,
    confirmDelete
  } = useInventory();

  const columns = getColumns(handleClickEditRow, handleClickDeleteRow, handleClickToggleRow, handleExpandRow, handleToggleFeature, openModalMakeFeature);

  console.log('searchBy',searchBy)
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Box className={classes.toolbar}>
        <Box className={classes.searchwrapper}>
          <Box className={classes.search}>
            <Search value={searchBy} setSearchBy={setSearchBy} />
          </Box>
        </Box>

        <Box className={classes.actions}>
          <Box className={classes.action}>
            <FormField
              type="select"
              name="type"
              data={[
                { value: '', label: 'All Types' },
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
                { value: '', label: 'All Statuses' },
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
          records={vehicles}
          totalRecords={totalVehicles}
          totalPages={totalPages}
          onRowExpand={handleExpandRow}
          expandedRecordIds={expandedRowIds}
          rowExpansion={{
            allowMultiple: false,
            content: ({ record }) => (
              <RowDetails record={record} />
            ),
          }}
        />
      </Box>

      <Modal.Root
        opened={opened}
        onClose={() => {
          closeModalMakeFeature();
          form.reset();
        }}
        size={'400px'}
        centered
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header className={classes.modalHeader}>
            <Modal.Title className={classes.modalHeaderTitle}>Make it Feature</Modal.Title>
            <Modal.CloseButton 
              icon={<IconModalClose />} 
              onClick={() => {
                closeModalMakeFeature();
                form.reset();
              }}
            />
          </Modal.Header>
          <Modal.Body className={classes.modalBody}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <FormField
                label="No of days"
                placeholder="Select days"
                type="select"
                data={[
                  { value: '7', label: '7 Days' },
                  { value: '14', label: '14 Days' },
                  { value: '28', label: '28 Days' },
                  { value: '30', label: '30 Days' },
                ]}
                error={form.errors.featuresDays}
                {...form.getInputProps('featuresDays')}
              />
              <Group grow gap='20px' className={classes.modalFooter}>
                <Button
                  type="button"
                  color="#919191"
                  variant="filled"
                  fullWidth
                  radius="20px"
                  classNames={{
                    root: buttonStyles.root,
                  }}
                  onClick={() => {
                    closeModalMakeFeature();
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="#E90808"
                  variant="filled"
                  fullWidth
                  radius="20px"
                  classNames={{
                    root: buttonStyles.root,
                  }}
                >
                  Confirm
                </Button>
              </Group>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Modal.Root
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        size={'400px'}
        centered
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header className={classes.modalHeader}>
            <Modal.Title className={classes.modalHeaderTitle}>Confirm Deletion</Modal.Title>
            <Modal.CloseButton 
              icon={<IconModalClose />} 
              onClick={closeDeleteModal}
            />
          </Modal.Header>
          <Modal.Body className={classes.modalBody}>
            <Text size="md" mb={20}>
              Are you sure you want to delete this vehicle?
            </Text>
            <Group grow gap='20px' className={classes.modalFooter}>
              <Button
                type="button"
                color="#919191"
                variant="filled"
                fullWidth
                radius="20px"
                classNames={{
                  root: buttonStyles.root,
                }}
                onClick={closeDeleteModal}
              >
                Cancel
              </Button>
              <Button
                type="button"
                color="#E90808"
                variant="filled"
                fullWidth
                radius="20px"
                classNames={{
                  root: buttonStyles.root,
                }}
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </Group>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  )
}