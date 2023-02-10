import React from 'react';
import { useForm } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import InputSelectField from '.';

export default {
  title: 'Gap Common/InputSelectField',
  component: InputSelectField,
} as ComponentMeta<typeof InputSelectField>;

export const ControlMultiSelectField: ComponentStory<
  typeof InputSelectField
> = (args) => {
  const form = useForm({
    defaultValues: {
      multiselect: [],
    },
    mode: 'onChange',
  });
  const handleSelect = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  return (
    <Stack spacing={2} maxWidth={300}>
      <InputSelectField
        form={form}
        handleSelect={handleSelect}
        name="multiselect"
        options={[
          { label: 'tom', value: 1 },
          { label: 'eddie', value: 2 },
          { label: 'kira', value: 3 },
        ]}
        placeholder="Select company to be in the list"
        {...args}
      />
    </Stack>
  );
};
