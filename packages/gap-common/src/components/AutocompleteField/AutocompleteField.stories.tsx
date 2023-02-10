/* eslint-disable no-console */
import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';

// eslint-disable-next-line import/no-named-as-default
import AutocompleteField from './index';
import ControlAutocompleteField from './ControlAutocompleteField';

export default {
  title: 'Gap Common/Autocomplete',
  component: AutocompleteField,
} as ComponentMeta<typeof AutocompleteField>;

export const BaseTemplate: ComponentStory<typeof AutocompleteField> = (
  args,
) => (
  <Stack maxWidth={300}>
    <AutocompleteField
      {...args}
      options={[
        { label: 'tom', value: 1 },
        { label: 'eddie', value: 2 },
        { label: 'kira', value: 3 },
      ]}
      placeholder="Placeholder"
    />
  </Stack>
);

export const SearchBar: ComponentStory<typeof AutocompleteField> = (args) => {
  const form = useForm({
    defaultValues: {
      test: 'Ipsum has been the industry standard dummy',
    },
    mode: 'onChange',
  });

  const handleSelect = () => {
    console.log('🚀 ~ handleSelect ~ data', form.getValues('test'));
  };

  return (
    <Stack spacing={2} maxWidth={300}>
      <AutocompleteField
        {...args}
        sx={{ height: 20 }}
        options={[
          { label: 'tom', value: 1 },
          { label: 'eddie', value: 2 },
          { label: 'kira', value: 3 },
        ]}
        placeholder="Search for an Activity"
        $shouldHaveSearchBar
        style={{ height: 36 }}
      />

      <ControlAutocompleteField
        {...args}
        form={form}
        name="test"
        onSelect={handleSelect}
        placeholder="Controller Search bar"
        $shouldHaveSearchBar
        options={[
          { label: 'tom', value: 1 },
          { label: 'eddie', value: 2 },
          { label: 'kira', value: 3 },
        ]}
      />
    </Stack>
  );
};

export const SelectField: ComponentStory<typeof AutocompleteField> = (args) => {
  const form = useForm({
    defaultValues: {
      test: 'Ipsum has been the industry standard dummy',
    },
    mode: 'onChange',
  });

  const handleSelect = () => {
    console.log('🚀 ~ handleSelect ~ data', form.getValues('test'));
  };

  return (
    <Stack spacing={2} maxWidth={300}>
      <AutocompleteField
        {...args}
        options={[
          { label: 'tom', value: 1 },
          { label: 'eddie', value: 2 },
          { label: 'kira', value: 3 },
        ]}
        placeholder="Choose a user"
      />

      <ControlAutocompleteField
        {...args}
        form={form}
        name="test"
        onSelect={handleSelect}
        placeholder="Controller Search bar"
        options={[
          { label: 'tom', value: 1 },
          { label: 'eddie', value: 2 },
          { label: 'kira', value: 3 },
        ]}
      />
    </Stack>
  );
};
