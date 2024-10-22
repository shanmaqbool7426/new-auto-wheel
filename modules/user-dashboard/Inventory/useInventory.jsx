import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';

export default function useInventory() {
  const [searchBy, setSearchBy] = React.useState(null);

  const [filterParams, setFilterParams] = React.useState({
    type: 'car',
    status: 'Inactive',
    date: 'newToOld',
  });

  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
  };

  const handleClickEditRow = (e, id) => {
    e.stopPropagation();
    console.log('Edit Row', id);
    alert(`Edit Row ${id}`);
  }

  const handleClickDeleteRow = (e, id) => {
    e.stopPropagation();
    alert(`Delete Row ${id}`);
  }

  const handleClickToggleRow = (e, id) => {
    e.stopPropagation();
    alert(`Toggle Row ${id}`);
  }

  const [opened, { open: openModalMakeFeature, close: closeModalMakeFeature }] = useDisclosure(false);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      featuresDays: '',
    },
  });

  const handleSubmit = (values) => {
    console.log('Form Data:: ', values);
  };

  return {
    setSearchBy,
    filterParams,
    handleChangeFilter,
    handleClickEditRow,
    handleClickDeleteRow,
    handleClickToggleRow,
    opened,
    openModalMakeFeature,
    closeModalMakeFeature,
    form,
    handleSubmit
  };
}
