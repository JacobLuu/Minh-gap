import React, { memo } from 'react';

import { useAppSelector } from '../../../../redux/hooks';
import OtherRightToWork from '../OtherRightToWork';
import ShareCodeRightToWork from '../ShareCodeRightToWork';
import UKRightToWork from '../UKRightToWork';

import { selectLoginSlice } from '../../../Login/reducer';
import { JOURNEY_TYPE } from '../../../../constants/enums';
import type { JobOption } from '../../RegistrationJourney';

interface RightToWorkProps {
  selectedJob: JobOption;
}

const RightToWork = (props: RightToWorkProps) => {
  const { selectedJob } = props;
  const { userProfile } = useAppSelector(selectLoginSlice);

  const renderBody = (journeyType: JOURNEY_TYPE) => {
    switch (journeyType) {
      case JOURNEY_TYPE.SHARE_CODE:
        return <ShareCodeRightToWork selectedJob={selectedJob} />;
      case JOURNEY_TYPE.PASSPORT:
        return <UKRightToWork selectedJob={selectedJob} />;
      case JOURNEY_TYPE.OTHERS:
        return <OtherRightToWork selectedJob={selectedJob} />;
      default:
        return null;
    }
  };

  return <>{renderBody(userProfile?.journey_type)}</>;
};

RightToWork.defaultProps = {};

export default memo(RightToWork);
