import React from 'react';

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

export const getErrorMessage = ({ error, message }: any) => {
  let errorMessage = error?.response?.data?.message;
  if (!errorMessage && error?.response?.data?.errors?.length > 0) {
    errorMessage = error?.response?.data.errors[0]?.message;
  }
  if (!errorMessage) errorMessage = message || 'Something went wrong';
  return errorMessage;
};
