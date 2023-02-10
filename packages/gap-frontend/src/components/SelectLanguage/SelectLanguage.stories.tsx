import React from 'react';
import Stack from '@mui/material/Stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import SelectLanguage from '.';

export default {
  title: 'Gap Frontend/SelectLanguage',
  component: SelectLanguage,
} as ComponentMeta<typeof SelectLanguage>;

export const ControlSelectLanguage: ComponentStory<typeof SelectLanguage> = (
  args,
) => {
  const handleOnChange = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  return (
    <Stack spacing={2} maxWidth={300}>
      <SelectLanguage handleOnChange={handleOnChange} language="en" {...args} />
    </Stack>
  );
};
