import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import SignaturePad from './SignaturePad';

export default {
  title: 'Gap Common/SignaturePad',
  component: SignaturePad,
} as ComponentMeta<typeof SignaturePad>;

export const BaseTemplate: ComponentStory<typeof SignaturePad> = (arg) => (
  <SignaturePad signaturePadRef={React.useRef(null)} {...arg} />
);
