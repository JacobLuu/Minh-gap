import React from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Stack from '@mui/material/Stack';
import RadioGroup from './RadioGroup';

export default {
  title: 'Gap Common/Radio Group',
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>;

export const RadioButtonGroup: ComponentStory<typeof RadioGroup> = (args) => {
  const form = useForm();
  return (
    <Stack spacing={2} maxWidth={300}>
      <RadioGroup
        {...args}
        options={[
          {
            option: 'test',
            value: '1',
          },
          {
            option: 'test 2',
            value: '2',
          },
          {
            option: 'test 3',
            value: '3',
          },
        ]}
        name="radioButtonGroup"
        form={form}
      />
    </Stack>
  );
};
