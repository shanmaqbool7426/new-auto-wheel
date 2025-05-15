import React from 'react';
import { Input, RangeSlider, Grid, NumberInput, rem } from '@mantine/core';

const RangeFilter = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  color = "#E90808",
  size = "xs",
  thumbSize = 16,
  hideControls = true,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange
}) => {
  return (
    <Input.Wrapper mb="lg">
      <Input.Label>{label}</Input.Label>
      <RangeSlider
        color={color}
        min={min}
        max={max}
        value={value}
        size={size}
        step={step}
        my="xs"
        thumbSize={thumbSize}
        styles={{
          thumb: {
            borderWidth: rem(2),
            padding: rem(2),
            borderColor: "#FFF",
          },
        }}
        onChange={onChange}
      />
      <Grid mt="md">
        <Grid.Col span={6}>
          <NumberInput
            hideControls={hideControls}
            value={minValue}
            min={min}
            max={maxValue}
            step={step}
            onChange={onMinChange}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            hideControls={hideControls}
            value={maxValue}
            min={minValue}
            max={max}
            step={step}
            onChange={onMaxChange}
          />
        </Grid.Col>
      </Grid>
    </Input.Wrapper>
  );
};

export default RangeFilter; 