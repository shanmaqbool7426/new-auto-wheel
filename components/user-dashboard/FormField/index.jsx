import React from 'react';
import {
  TextInput,
  Select,
  Textarea,
  Checkbox,
  RadioGroup,
  Radio,
  DatePicker,
  Switch,
  PasswordInput,
  NumberInput,
  MultiSelect,
} from '@mantine/core';
import styles from './FormField.module.css';
import { FaChevronDown } from "react-icons/fa6";

export default function FormField(props) {
  const { type, data, options, ...rest } = props;

  const icon = <FaChevronDown />

  const componentMap = {
    'text': () => (
      <TextInput
        {...rest}
        classNames={{
          label: styles.label,
          input: styles.input,
        }}
      />
    ),
    'password': () => (
      <PasswordInput
        {...rest}
        classNames={{
          label: styles.label,
          input: styles.input,
        }}
      />
    ),
    'select': () => (
      <Select
        data={data}
        rightSection={icon}
        {...rest}
        classNames={{
          label: styles.label,
          input: styles.input,
          section: styles.selectSection,
          dropdown: styles.selectDropdown,
          option: styles.selectOption,
        }}
      />),
    'checkbox': () => (
      <Checkbox
        {...rest}
        checked={rest.value}
        classNames={{
          label: styles.label,
        }}
      />
    ),
    'switch': () => <Switch {...rest} />,
    'multiselect': () => <MultiSelect data={data} {...rest} />,
    'textarea': () => <Textarea {...rest} />,
    'radio': () => <RadioGroup {...rest}>{options.map((option) => (<Radio key={option.value} value={option.value} label={option.label} />))}</RadioGroup>,
    // 'date': () => <DatePicker {...rest} />,
    'number': () => <NumberInput {...rest} />,
  };

  return componentMap[type] ? componentMap[type]() : <TextInput {...rest} />;
};
