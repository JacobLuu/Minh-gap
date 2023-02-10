import React, { FC, ReactElement } from 'react';
import { CssBaseline } from '@mui/material';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import createThemProvider from 'gap-common/src/themes';
import store from '../redux/store';

const ThemeProvider = createThemProvider();

const AllTheProviders: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
