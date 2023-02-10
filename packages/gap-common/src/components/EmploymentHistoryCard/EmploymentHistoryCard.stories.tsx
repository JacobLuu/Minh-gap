import {
  EMPLOYMENT_STATUS,
  HISTORY_TYPE,
} from 'gap-common/src/constants/enums';
import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ReactComponent as EditIcon } from '../../assets/images/icon_log_edit.svg';
import EmploymentHistoryCard from './EmploymentHistoryCard';

export default {
  title: 'Gap Common/EmploymentHistoryCard',
  component: EmploymentHistoryCard,
} as ComponentMeta<typeof EmploymentHistoryCard>;

const employmentHistory = {
  company_name: 'Something',
  job_title: 'Something',
  start_date: 1665283838,
  end_date: 1669283838,
  history_type: HISTORY_TYPE.EMPLOYMENT,
  employment_status: EMPLOYMENT_STATUS.FULLTIME,
  job_description: 'Something',
};

export const BaseTemplate: ComponentStory<typeof EmploymentHistoryCard> = (
  arg,
) => (
  <EmploymentHistoryCard
    employmentHistory={employmentHistory}
    buttonText="Edit"
    handleClick={() => {}}
    icon={<EditIcon />}
    {...arg}
  />
);

export const WithoutAction = BaseTemplate.bind({});

WithoutAction.args = {
  buttonText: '',
};
