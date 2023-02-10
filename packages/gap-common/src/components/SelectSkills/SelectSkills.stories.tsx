import React from 'react';
import { useForm } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';

// eslint-disable-next-line import/no-named-as-default
import SelectSkills from './index';

export default {
  title: 'Gap Common/SelectSkills',
  component: SelectSkills,
} as ComponentMeta<typeof SelectSkills>;

const SKILLS_OPTIONS = [
  { label: 'Motion Design', value: 'Motion Design' },
  { label: 'Communication', value: 'Communication' },
  { label: 'UX Design', value: 'UX Design' },
  { label: 'HTML & CSS', value: 'HTML & CSS' },
  {
    label: 'Game Develope',
    value: 'Game Develope',
  },
  { label: 'Art Design', value: 'Art Design' },
];

export const ControlSelectSkills: ComponentStory<typeof SelectSkills> = (
  args,
) => {
  const form = useForm({
    defaultValues: {},
  });

  return (
    <Stack spacing={2} maxWidth={300}>
      <SelectSkills
        form={form}
        name="selectSkills"
        label="Additional Skills"
        required
        options={SKILLS_OPTIONS}
        placeholder="Skills selected"
        {...args}
      />
    </Stack>
  );
};
