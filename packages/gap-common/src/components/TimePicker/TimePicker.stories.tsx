import React from 'react';
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import {
  ComponentMeta,
  ComponentStoryObj,
  ComponentStory,
} from '@storybook/react';

import TimePicker from './TimePicker';

const InputFieldWrapper: ComponentStory<typeof TimePicker> = (args) => {
  const form = useForm();

  return (
    <Stack spacing={2} maxWidth={300}>
      <TimePicker {...args} form={form} />
    </Stack>
  );
};

export default {
  title: 'Gap Common/ Time Picker',
  component: InputFieldWrapper,
} as ComponentMeta<typeof TimePicker>;

type Template = ComponentStoryObj<typeof TimePicker>;

export const InputPhoneNumber: Template = {
  args: {
    name: 'interviewTime',
    label: 'Interview time',
    disabled: false,
    required: true,
    placeholder: 'Select contact time',
  },
};
