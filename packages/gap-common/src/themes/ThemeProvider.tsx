import React from 'react';
import { ThemeProvider as ThemeWrapper } from '@mui/material/styles';
import useTheme from './RootTheme';

interface IThemeProvider {
  children: any;
}

const createThemeProvider = (override = {}) => {
  const rootTheme = useTheme(override);
  return ({ children }: IThemeProvider) => {
    return <ThemeWrapper theme={rootTheme}>{children}</ThemeWrapper>;
  };
};

export default createThemeProvider;
