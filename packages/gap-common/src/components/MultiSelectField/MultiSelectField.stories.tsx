import React from 'react';
import { useForm } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';

// eslint-disable-next-line import/no-named-as-default
import MultiSelectField from './index';

export default {
  title: 'Gap Common/MultiSelectField',
  component: MultiSelectField,
} as ComponentMeta<typeof MultiSelectField>;

export const ControlMultiSelectField: ComponentStory<
  typeof MultiSelectField
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
      <MultiSelectField
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
