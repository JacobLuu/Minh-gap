import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import { ReactComponent as IconSearch } from 'gap-common/src/assets/images/icon_search.svg';
import {
  ComponentMeta,
  ComponentStoryObj,
  ComponentStory,
} from '@storybook/react';
import { ICON_COLOR } from '../../themes/Colors';

import InputField from './InputField';

const InputFieldWrapper: ComponentStory<typeof InputField> = (args) => {
  const form = useForm();
  useEffect(() => {
    if (args.errors) {
      Object.keys(args.errors).map((key: any) => {
        return form.setError(key, {
          message: args.errors[key],
          type: 'value',
          types: {},
        });
      });
    }
  }, [args]);

  return (
    <Stack spacing={2} maxWidth={300}>
      <InputField {...args} form={form} />
    </Stack>
  );
};

export const InputIcon: ComponentStory<typeof InputField> = (args) => {
  const form = useForm();
  return (
    <Stack spacing={2} maxWidth={300}>
      <InputField
        {...args}
        form={form}
        placeholder="Search for candidate, email, ..."
        $hasAdornment
        name="search"
        icon={
          <InputAdornment position="start">
            <IconSearch color={ICON_COLOR} />
          </InputAdornment>
        }
      />
    </Stack>
  );
};

export default {
  title: 'Gap Common/Input Field',
  component: InputFieldWrapper,
} as ComponentMeta<typeof InputField>;

type Template = ComponentStoryObj<typeof InputField>;

export const Input: Template = {
  args: {
    variant: 'outlined',
    type: 'text',
    name: 'text',
    label: 'Text',
    required: false,
    placeholder: 'placeholder',
  },
};

export const Email: Template = {
  args: {
    variant: 'outlined',
    type: 'email',
    name: 'email',
    label: 'Email',
    required: false,
    placeholder: 'placeholder',
  },
};

export const Password: Template = {
  args: {
    variant: 'outlined',
    type: 'password',
    name: 'password',
    label: 'Password',
    required: false,
    placeholder: 'placeholder',
  },
};

export const Errors: Template = {
  args: {
    variant: 'outlined',
    type: 'email',
    name: 'email',
    label: 'Email',
    required: false,
    placeholder: 'placeholder',
    errors: {
      email: 'Invalid email format',
    },
  },
};
