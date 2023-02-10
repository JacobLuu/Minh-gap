import React from 'react';
import { ESCALATED_ISSUES_STATUS } from 'gap-common/src/constants/enums';
import { ReactComponent as IconFlag } from 'gap-common/src/assets/images/icon_flag.svg';
import { ReactComponent as IconFlagFilled } from 'gap-common/src/assets/images/icon_flag_filled.svg';
import { ERROR_COLOR, SUCCESS_COLOR } from '../themes/Colors';

const GetEscalatedIssuesFlag = (value: string) => {
  const getEscalatedIssuesFlag = (value: string) => {
    switch (value) {
      case ESCALATED_ISSUES_STATUS.CREATED:
        return <IconFlagFilled fill={ERROR_COLOR} width={20} height={20} />;
      case ESCALATED_ISSUES_STATUS.ASSIGNED:
        return <IconFlagFilled fill={ERROR_COLOR} width={20} height={20} />;
      case ESCALATED_ISSUES_STATUS.SOLVED:
        return <IconFlagFilled fill={SUCCESS_COLOR} width={20} height={20} />;
      case ESCALATED_ISSUES_STATUS.DELETED:
        return <IconFlag width={20} height={20} />;
      default:
        return <IconFlag width={20} height={20} />;
    }
  };

  return getEscalatedIssuesFlag(value);
};

export default GetEscalatedIssuesFlag;
