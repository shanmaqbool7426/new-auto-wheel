import React from 'react';

export default function useUserReviews() {
  const [searchBy, setSearchBy] = React.useState(null);

  const [filterParams, setFilterParams] = React.useState({
    date: 'newToOld',
  });

  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
  };

  const handleClickDeleteRow = (id) => {
    alert(`Delete Row ${id}`);
  }

  return {
    setSearchBy,
    filterParams,
    handleChangeFilter,
    handleClickDeleteRow,
  };
}
