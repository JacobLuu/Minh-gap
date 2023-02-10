import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Stack from '@mui/material/Stack';
import DocumentCard from './DocumentCard';
import { ReactComponent as IconEye } from '../../assets/images/icon_eye.svg';
import { ReactComponent as IconPdf } from '../../assets/images/icon_pdf_file.svg';
import { ReactComponent as IconMore } from '../../assets/images/icon_more.svg';
import { PRIMARY_COLOR } from '../../themes/Colors';

export default {
  title: 'Gap Common/Document Card',
  component: DocumentCard,
} as ComponentMeta<typeof DocumentCard>;

export const BaseTemplate: ComponentStory<typeof DocumentCard> = (args) => {
  return (
    <Stack spacing={2}>
      <DocumentCard
        type="cv"
        documentName="Document Name"
        status="Sent"
        updateAt={"1665283838"}
        buttonText="View details"
        iconPdf={<IconPdf fill={PRIMARY_COLOR} />}
        iconMore={<IconMore />}
        iconEye={<IconEye fill={PRIMARY_COLOR} />}
        {...args}
      />
    </Stack>
  );
};

export const WithoutStatus = BaseTemplate.bind({});

WithoutStatus.args = {
  iconMore: null,
  updateAt: '',
  status: '',
};
