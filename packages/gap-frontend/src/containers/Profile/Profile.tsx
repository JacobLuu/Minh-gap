import { ReactComponent as IconArrowBack } from 'gap-common/src/assets/images/icon_arrow_back.svg';
import {
  BLACK_COLOR,
  WHITE_COLOR,
  PRIMARY_COLOR,
} from 'gap-common/src/themes/Colors';
import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import avatarImg from '../../assets/images/background_img_login.png';
import { useBreakPoints, useSelectedTab } from '../../utils/customHooks';
import Header from '../GetStarted/Header';
import BasicInformation from './components/BasicInformation';
import Password from './components/Password';

enum ProfileTab {
  INFORMATION = 'information',
  PASSWORD = 'password',
}

const Profile = () => {
  const { t } = useTranslation();
  const { isScreenSm, isScreenMd, isScreenLg } = useBreakPoints();
  const history = useHistory();
  const { selectedTab, handleChangeTab } = useSelectedTab(
    ProfileTab.INFORMATION,
  );

  const containerPaddingX = useMemo(() => {
    if (isScreenLg) return 24;
    if (isScreenMd) return 18;
    if (isScreenSm) return 12;
    return 4;
  }, [isScreenSm, isScreenMd, isScreenLg]);

  const handleClick = () => {
    history.goBack();
  };

  return (
    <Box px={containerPaddingX} py={4}>
      <Header shouldShowProgress={false} />
      <Box
        display="flex"
        alignItems="center"
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
        mt={10}
      >
        <IconArrowBack
          style={{
            marginRight: '12px',
            transform: 'rotate(-90deg)',
          }}
          fill={BLACK_COLOR}
        />
        <Typography variant="subtitle2">
          {t<string>('profile.breadcrumb')}
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Box mt={6} mb={12}>
          <Avatar
            sx={{
              width: 125,
              height: 125,
              cursor: 'pointer',
              border: `5px solid ${WHITE_COLOR}`,
              boxShadow: `0 0 0 2px ${PRIMARY_COLOR}`,
            }}
            src={avatarImg}
          />
        </Box>
        <TabContext value={selectedTab}>
          <TabList onChange={handleChangeTab}>
            <Tab
              value={ProfileTab.INFORMATION}
              label={t<string>('profile.information_tab.tab_name')}
            />
            <Tab
              value={ProfileTab.PASSWORD}
              label={t<string>('profile.password_tab.tab_name')}
            />
          </TabList>
          <TabPanel value={ProfileTab.INFORMATION}>
            <BasicInformation />
          </TabPanel>
          <TabPanel value={ProfileTab.PASSWORD}>
            <Password />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default memo(Profile);
