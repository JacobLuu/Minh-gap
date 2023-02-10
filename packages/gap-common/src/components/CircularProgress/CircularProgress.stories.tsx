import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Stack from '@mui/material/Stack';
import CircularProgressComponent from './CircularProgress';
import Images from '../../assets/images';

export default {
  title: 'Gap Common/Circular Progress',
  component: CircularProgressComponent,
} as ComponentMeta<typeof CircularProgressComponent>;

const randomProgress = () => {
  return Math.floor(Math.random() * 100);
};

export const CircularProgress: ComponentStory<
  typeof CircularProgressComponent
> = (args) => {
  return (
    <Stack spacing={2} maxWidth={300}>
      <CircularProgressComponent
        {...args}
        tooltipText="Information"
        icon={<img src={Images.icon_user} alt="icon progress" />}
        progress={randomProgress()}
      />
    </Stack>
  );
};
