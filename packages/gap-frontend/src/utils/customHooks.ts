import React from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const scrollTop = (scrollToTopRef) => {
  scrollToTopRef?.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  });
};

export const useSelectedTab = (initialTab: string) => {
  const [selectedTab, setSelectedTab] = React.useState<string>(initialTab);

  const handleChangeTab = (
    _event: React.ChangeEvent<{}>,
    tabValue: number | string,
  ) => {
    setSelectedTab(String(tabValue));
  };

  return {
    selectedTab,
    handleChangeTab,
  };
};

export const useBreakPoints = () => {
  const theme = useTheme();
  const isScreenXs = useMediaQuery(theme.breakpoints.up('xs'));
  const isScreenSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isScreenMd = useMediaQuery(theme.breakpoints.up('md'));
  const isScreenLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isScreenXl = useMediaQuery(theme.breakpoints.up('xl'));

  return {
    isScreenXs,
    isScreenSm,
    isScreenMd,
    isScreenLg,
    isScreenXl,
  };
};

export default {
  scrollTop,
  useSelectedTab,
  useBreakPoints,
};
