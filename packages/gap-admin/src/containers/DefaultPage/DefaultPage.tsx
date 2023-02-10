import React from 'react';
import { Wrapper } from './styles';
import { isAdmin, isConsultant, isCompliance } from '../../utils/userRoles';
import CLIENT_PATH from '../../constants/clientPath';
import history from '../../utils/history';
import { getAccountInfo } from '../../utils/localStorage';

function DefaultPage() {
  React.useEffect(() => {
    if (isAdmin()) {
      history.replace(CLIENT_PATH.ANALYTICS);
    } else if (isCompliance()) {
      history.replace(CLIENT_PATH.RIGHT_TO_WORK_HUB);
    } else if (isConsultant()) {
      history.replace(CLIENT_PATH.ADVERT_RESPONSES);
    }
  }, [getAccountInfo]);

  return <Wrapper />;
}

export default React.memo(DefaultPage);
