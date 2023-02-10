import React from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Stack from '@mui/material/Stack';
import CheckBox from './CheckBox';

export default {
  title: 'Gap Common/Check Box Group',
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

export const CheckBoxButton: ComponentStory<typeof CheckBox> = (args) => {
  const form = useForm();
  return (
    <Stack spacing={2} maxWidth={300}>
      <CheckBox
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
        name="CheckBoxButton"
        form={form}
      />
    </Stack>
  );
};

export const CheckBoxMultiOption: ComponentStory<typeof CheckBox> = (args) => {
  const form = useForm();
  return (
    <Stack spacing={2} maxWidth={300}>
      <CheckBox
        {...args}
        $multiOption
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
        name="checkBox"
        form={form}
      />
    </Stack>
  );
};
