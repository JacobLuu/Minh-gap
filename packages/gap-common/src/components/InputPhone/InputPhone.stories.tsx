import React from 'react';
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import {
  ComponentMeta,
  ComponentStoryObj,
  ComponentStory,
} from '@storybook/react';

import InputPhone from './InputPhone';

const InputFieldWrapper: ComponentStory<typeof InputPhone> = (args) => {
  const form = useForm();

  return (
    <Stack spacing={2} maxWidth={300}>
      <InputPhone {...args} form={form} />
    </Stack>
  );
};

export default {
  title: 'Gap Common/ Input Phone',
  component: InputFieldWrapper,
} as ComponentMeta<typeof InputPhone>;

type Template = ComponentStoryObj<typeof InputPhone>;

export const InputPhoneNumber: Template = {
  args: {
    name: 'phoneNumber',
    label: 'Phone number',
    disabled: false,
    required: true,
    placeholder: 'Enter your phone number',
  },
};
