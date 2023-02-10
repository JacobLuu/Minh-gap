import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import InputFieldPassword from './index';
import * as Validation from '../../constants/validation';

const InputFieldWrapper = (args: any) => {
  const form = useForm();
  useEffect(() => {
    if (args.errors) {
      Object.keys(args.errors).map((key: any) => {
        const typesValue: any = {};
        if (args.validateCriterias) {
          args.validateCriterias.forEach((validateCriteria: any) => {
            if (!args.passedValidate.includes(validateCriteria.type)) {
              typesValue[validateCriteria?.type] = validateCriteria?.message;
            }
          });
        }
        return form.setError(key, {
          message: args.errors[key],
          type: 'value',
          types: typesValue,
        });
      });
    }
  }, [args]);

  return (
    <Stack spacing={2} maxWidth={300}>
      <InputFieldPassword {...args} form={form} />
    </Stack>
  );
};

export default {
  title: 'Gap Common/Input Field Password',
  component: InputFieldWrapper,
} as ComponentMeta<typeof InputFieldWrapper>;

type Template = ComponentStoryObj<typeof InputFieldWrapper>;

export const Normal: Template = {
  args: {
    name: 'password',
    label: 'Password',
    placeholder: 'placeholder',
  },
};

export const ShowPassword: Template = {
  args: {
    name: 'password',
    label: 'Password',
    placeholder: 'placeholder',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await userEvent.type(
      canvas.getByPlaceholderText('placeholder'),
      'password',
    );
  },
};

export const Errors: Template = {
  args: {
    name: 'password',
    label: 'Password',
    placeholder: 'placeholder',
    errors: {
      password: 'Invalid password format',
    },
  },
};

export const ErrorsWithCriteriaAllErrors: Template = {
  args: {
    name: 'password',
    label: 'Password',
    placeholder: 'placeholder',
    showValidateCriteria: true,
    validateCriterias: [
      { type: 'min', message: Validation.PASSWORD_MIN_LENGTH_MESSAGE },
      {
        type: 'hasUpperCase',
        message: Validation.PASSWORD_CAPITAL_CHARACTER_MESSAGE,
      },
      { type: 'hasNumber', message: Validation.PASSWORD_NUMBER_MESSAGE },
    ],
    passedValidate: [],
    errors: {
      password: 'Invalid password format',
    },
  },
};

export const ErrorsWithCriteria1Pass: Template = {
  args: {
    name: 'password',
    label: 'Password',
    placeholder: 'placeholder',
    showValidateCriteria: true,
    validateCriterias: [
      { type: 'min', message: Validation.PASSWORD_MIN_LENGTH_MESSAGE },
      {
        type: 'hasUpperCase',
        message: Validation.PASSWORD_CAPITAL_CHARACTER_MESSAGE,
      },
      { type: 'hasNumber', message: Validation.PASSWORD_NUMBER_MESSAGE },
    ],
    passedValidate: ['min'],
    errors: {
      password: 'Invalid password format',
    },
  },
};
