import React from 'react';

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

  const handleClickEditRow = (id) => {
    console.log('Edit Row', id);
    alert(`Edit Row ${id}`);
  }

  const handleClickDeleteRow = (id) => {
    alert(`Delete Row ${id}`);
  }

  const handleClickToggleRow = (id) => {
    alert(`Toggle Row ${id}`);
  }

  return {
    setSearchBy,
    filterParams,
    handleChangeFilter,
    handleClickEditRow,
    handleClickDeleteRow,
    handleClickToggleRow,
  };
}
