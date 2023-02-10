import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Dropzone from './Dropzone';

export default {
  title: 'Gap Common/Dropzone',
  component: Dropzone,
} as ComponentMeta<typeof Dropzone>;

export const BaseTemplate: ComponentStory<typeof Dropzone> = (arg) => (
  <Dropzone
    maxSize={20}
    handleChange={() => {}}
    fileFormats={['pdf']}
    {...arg}
  />
);

export const MultipleFiles = BaseTemplate.bind({});
export const MultipleFormats = MultipleFiles.bind({});
export const WithAgreementText = MultipleFiles.bind({});

MultipleFiles.args = {
  maxFiles: 5,
  fileFormats: ['pdf'],
};

MultipleFormats.args = {
  fileFormats: ['png', 'pdf', 'svg'],
};

WithAgreementText.args = {
  agreementText:
    'By signing this application with an electronic signature , I agree signature will be as valid as handwritten signature to the extent allowed by local law',
};
