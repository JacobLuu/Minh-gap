import React from 'react';
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import {
  ComponentMeta,
  ComponentStoryObj,
  ComponentStory,
} from '@storybook/react';

import DatePicker from './DatePicker';

const InputFieldWrapper: ComponentStory<typeof DatePicker> = (args) => {
  const form = useForm();

  return (
    <Stack spacing={2} maxWidth={300}>
      <DatePicker {...args} form={form} />
    </Stack>
  );
};

export default {
  title: 'Gap Common/ Date Picker',
  component: InputFieldWrapper,
} as ComponentMeta<typeof DatePicker>;

type Template = ComponentStoryObj<typeof DatePicker>;

export const InputPhoneNumber: Template = {
  args: {
    name: 'interviewDate',
    label: 'Interview date',
    disabled: false,
    required: true,
    placeholder: 'Select contact date',
  },
};
