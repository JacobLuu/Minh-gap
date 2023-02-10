import { ReactComponent as IconLogo } from 'gap-common/src/assets/images/icon_logo.svg';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { useAppDispatch } from '../../redux/hooks';
import avatarImg from '../../assets/images/background_img_login.png';
import logoImg from '../../assets/images/logo.svg';
import ProgressLine from '../../components/ProgressLine';
import SelectLanguageInput from '../../components/SelectLanguage/SelectLanguageInput';
import clientPath from '../../constants/clientPath';
import AuthenticationService from '../../services/AuthenticationService';
import { useBreakPoints } from '../../utils/customHooks';
import {
  removeAccessToken,
  removeRefreshToken,
  removeUser,
} from '../../utils/localStorage';
import { setErrorMessages } from '../Global/reducer';

interface HeaderProps {
  shouldShowProgress?: boolean;
}

const Header = (props: HeaderProps) => {
  const { shouldShowProgress } = props;
  const { i18n, t } = useTranslation();
  const history = useHistory();
  const [language, setLanguage] = useState<string>(i18n.language);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const { isScreenMd } = useBreakPoints();

  const dispatch = useAppDispatch();

  const handleChangeLanguage = (language: string) => {
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  const handleClickAvatar = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickProfile = () => {
    history.push(clientPath.PROFILE);
  };

  const logout = () => {
    AuthenticationService.logout()
      .then(() => {
        removeAccessToken();
        removeRefreshToken();
        removeUser();
        // reset all Redux state
        dispatch({ type: 'RESET_ALL_STATE' });
        history.push(clientPath.LOGIN);
      })
      .catch((error) => {
        setErrorMessages([error]);
      });
  };

  return (
    <>
      <Box>
        <Grid container alignItems="center">
          <Grid item xs={3} md={4}>
            {isScreenMd ? (
              <img src={logoImg} width="200px" alt="logo" data-test="logo" />
            ) : (
              <IconLogo />
            )}
          </Grid>
          <Grid item xs={0} md={1} />
          <Grid item xs={6} md={3} display="flex">
            <Box mx="auto">
              <SelectLanguageInput
                language={language}
                handleOnChange={handleChangeLanguage}
              />
            </Box>
          </Grid>
          <Grid item xs={0} md={3} />
          <Grid item xs={3} md={1}>
            <Avatar
              sx={{
                width: 44,
                height: 44,
                cursor: 'pointer',
                marginLeft: 'auto',
              }}
              src={avatarImg}
              onClick={handleClickAvatar}
            />
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleClickProfile}>
                <Typography variant="subtitle2">
                  {t<string>('header.profile')}
                </Typography>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Typography variant="subtitle2">
                  {t<string>('header.log_out')}
                </Typography>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Box>
      {shouldShowProgress && <ProgressLine />}
    </>
  );
};

Header.defaultProps = {
  shouldShowProgress: true,
};

export default memo(Header);
