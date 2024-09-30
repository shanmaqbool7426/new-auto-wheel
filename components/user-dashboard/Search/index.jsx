'use client'
import React from 'react';
import debounce from 'lodash/debounce';
import { TextInput } from '@mantine/core';
import { FaMagnifyingGlass } from "react-icons/fa6";
import classes from './Search.module.css'

export default function Search({ setSearchBy }) {
  const icon = <FaMagnifyingGlass />

  const debouncedSearch = debounce((value, setSearchBy) => {
    console.log('>>>>>>>',value)

    setSearchBy(value);
  }, 1000);

  const handleChangeSearch = (event) => {
    const { value } = event?.target;
    debouncedSearch(value, setSearchBy);
  };

  return (
    <TextInput
      onChange={handleChangeSearch}
      leftSection={icon}
      classNames={{
        input: classes.input,
        section: classes.section,
      }}
    />
  )
}
