import logoImg from 'gap-common/src/assets/images/logo_mark.svg';
import React, { memo, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { ArrowForward } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

import SelectLanguageInput from '../../components/SelectLanguage/SelectLanguageInput';
import CLIENT_PATH from '../../constants/clientPath';
import { KEY, LATEST_JOB_APPLICATION } from '../../constants/cookie';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getParameterByName } from '../../utils';
import { useBreakPoints } from '../../utils/customHooks';
import {
  registerAdvertReactionRequest,
  selectTrackingRecordsSlice,
} from './reducers/trackingRecords';
import { HStack } from './styles';

function Welcome() {
  const { registerAdvertReactionCompleted, cookie } = useAppSelector(
    selectTrackingRecordsSlice,
  );
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language);
  const location = useLocation();
  const [cookies, setCookie] = useCookies([KEY, LATEST_JOB_APPLICATION]);
  const { isScreenSm } = useBreakPoints();

  const handleChangeLanguage = (language: string) => {
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    // Sample URL
    // http://localhost:3001/#/welcome?fxbranch=1&job_id=1&job_ref=gap_website&job_title=Software%20Engineer
    const jobBranchId = getParameterByName('fxbranch', location.search);
    const jobRef = getParameterByName('job_ref', location.search);
    const jobTitle = getParameterByName('job_title', location.search);
    const jobExternalId = getParameterByName('job_id', location.search);

    if (jobExternalId && jobBranchId) {
      const latestJobApp = `${jobBranchId}&${jobExternalId}&${jobTitle}&${jobRef}`;
      setCookie(LATEST_JOB_APPLICATION, latestJobApp);
    }

    // In local, referrer will be blank always.
    const referrer =
      document.referrer === '' ? 'no referrer' : document.referrer;

    const current_cookie = cookies.gap_personnel_welcome;
    let isThisFirstTime = true;
    if (current_cookie) {
      const checkString = `${jobBranchId}&${jobExternalId}&${jobRef}&${referrer}`;
      if (current_cookie.includes(checkString)) {
        isThisFirstTime = false;
      }
    }

    if (isThisFirstTime && jobExternalId) {
      dispatch(
        registerAdvertReactionRequest({
          branch_id: jobBranchId,
          external_job_id: jobExternalId,
          job_ref: jobRef,
          referrer: referrer,
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (!registerAdvertReactionCompleted) {
      return;
    }
    let current_cookie = cookies.gap_personnel_welcome;
    if (current_cookie && !current_cookie.includes(cookie)) {
      current_cookie = `${current_cookie},${cookie}`;
      setCookie(KEY, current_cookie);
    } else {
      setCookie(KEY, cookie);
    }
  }, [cookie]);

  return (
    <HStack mt={isScreenSm ? 21 : 6}>
      <Box>
        <img src={logoImg} alt="logo" />
      </Box>
      <Box mt={5}>
        <Typography variant="h2" textAlign="center">
          {t<string>('welcome.welcome_header')}
        </Typography>
      </Box>
      <HStack mt={2.5} width="65%">
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          {t<string>('welcome.welcome_description')}
        </Typography>
      </HStack>
      <HStack mt={5} width="100%">
        <Typography variant="body2">
          {t<string>('common.select_language.header')}
        </Typography>
        <Box mt={1} sx={{ pt: 2 }} width="60%" maxWidth={400}>
          <SelectLanguageInput
            language={language}
            handleOnChange={handleChangeLanguage}
          />
        </Box>
      </HStack>
      <Box mt={5}>
        <Button
          variant="contained"
          disabled={!language}
          component={Link}
          to={CLIENT_PATH.CREATE_ACCOUNT}
          data-test="get-started"
        >
          {t('welcome.btn_get_started')} <ArrowForward htmlColor="white" />
        </Button>
      </Box>
    </HStack>
  );
}

export default memo(Welcome);
