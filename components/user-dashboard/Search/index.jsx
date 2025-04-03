'use client'
import React, { useEffect, useRef } from 'react';
import { TextInput } from '@mantine/core';
import { FaMagnifyingGlass } from "react-icons/fa6";
import classes from './Search.module.css'

export default function Search({ setSearchBy, value }) {
  const icon = <FaMagnifyingGlass />
  const inputRef = useRef(null);

  const handleChangeSearch = (event) => {
    const { value } = event.target;
    setSearchBy(value);
  };

  useEffect(() => {
    // This will focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <TextInput
      ref={inputRef}
      placeholder='Search by make, model, variant'
      onChange={handleChangeSearch}
      leftSection={icon}
      value={value}
      autoFocus // This should work in most cases
      classNames={{
        input: classes.input,
        section: classes.section,
      }}
    />
  )
}