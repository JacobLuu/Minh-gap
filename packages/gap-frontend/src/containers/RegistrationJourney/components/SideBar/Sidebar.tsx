import { ReactComponent as IconCheckCircle } from 'gap-common/src/assets/images/icon_check_circle.svg';
import { ReactComponent as IconHamburger } from 'gap-common/src/assets/images/icon_hamburger.svg';
import { ReactComponent as IconInfo } from 'gap-common/src/assets/images/icon_info.svg';
import { ReactComponent as IconLock } from 'gap-common/src/assets/images/icon_lock.svg';
import {
  BLACK_COLOR,
  DISABLED_CONTENT_COLOR,
  INACTIVE_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR,
  WHITE_COLOR,
} from 'gap-common/src/themes/Colors';
import capitalize from 'lodash/capitalize';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { CANDIDATE_JOB_PROGRESS_STATUS } from '../../../../constants/enums';
import { useAppSelector } from '../../../../redux/hooks';
import { useBreakPoints } from '../../../../utils/customHooks';
import { selectProgressesSlice } from '../../reducers/progresses';
import { Text } from './styles';

import type { Step } from '../../RegistrationJourney';

interface SideBarProps {
  steps: Step[];
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
}

const SideBar = (props: SideBarProps) => {
  const { steps, currentStep, setCurrentStep } = props;
  const { t } = useTranslation();
  const { isScreenSm } = useBreakPoints();
  const { progresses } = useAppSelector(selectProgressesSlice);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const renderDesktopView = () => {
    return (
      <>
        <Box mb={4} display="flex">
          <Typography variant="h4">About you</Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          {steps.map((step) => {
            const progress = progresses.find(
              (progress) => progress.type === step.name,
            );
            const isProgressLocked =
              progress?.progress === CANDIDATE_JOB_PROGRESS_STATUS.LOCKED;
            return (
              <Box
                key={step.value}
                display="flex"
                alignItems="center"
                my={2}
                py={1.5}
                onClick={() => {
                  if (!isProgressLocked) setCurrentStep(step);
                }}
                sx={{ cursor: 'pointer' }}
              >
                <Text
                  variant="subtitle2"
                  $active={step.name === currentStep.name}
                  color={isProgressLocked && INACTIVE_COLOR}
                >
                  {t<string>(`registrationJourney:sidebar.${step.name}`)}
                </Text>
                <Box ml={2} display="flex">
                  {progress?.progress ===
                    CANDIDATE_JOB_PROGRESS_STATUS.COMPLETED && (
                    <IconCheckCircle
                      fill={SUCCESS_COLOR}
                      width={20}
                      height={20}
                    />
                  )}
                  {progress?.progress ===
                    CANDIDATE_JOB_PROGRESS_STATUS.LOCKED && (
                    <IconLock
                      fill={DISABLED_CONTENT_COLOR}
                      width={20}
                      height={20}
                    />
                  )}
                  {progress?.progress ===
                    CANDIDATE_JOB_PROGRESS_STATUS.IN_PROGRESS && (
                    <IconInfo fill={WARNING_COLOR} width={20} height={20} />
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </>
    );
  };

  const renderMobileView = () => {
    const isOpen = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <Backdrop
          sx={{
            color: WHITE_COLOR,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isOpen}
          onClick={handleClose}
        />
        <Button
          id="button"
          aria-controls={isOpen ? 'menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : undefined}
          onClick={handleClick}
          style={{
            fontWeight: 600,
            fontSize: 19,
            color: BLACK_COLOR,
          }}
        >
          <IconHamburger style={{ marginRight: 6 }} />
          {currentStep.name
            .split('_')
            .map((word) => capitalize(word))
            .join(' ')}
        </Button>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'button',
          }}
        >
          {steps.map((step) => {
            const progress = progresses.find(
              (progress) => progress.type === step.name,
            );
            const isProgressLocked =
              progress?.progress === CANDIDATE_JOB_PROGRESS_STATUS.LOCKED;
            return (
              <MenuItem
                key={step.value}
                onClick={() => {
                  if (!isProgressLocked) {
                    setCurrentStep(step);
                    handleClose();
                  }
                }}
                sx={{ cursor: 'pointer' }}
              >
                <Text
                  variant="subtitle2"
                  $active={step.name === currentStep.name}
                  color={isProgressLocked && INACTIVE_COLOR}
                >
                  {t<string>(`registrationJourney:sidebar.${step.name}`)}
                </Text>
                <Box ml={2} display="flex">
                  {progress?.progress ===
                    CANDIDATE_JOB_PROGRESS_STATUS.COMPLETED && (
                    <IconCheckCircle
                      fill={SUCCESS_COLOR}
                      width={20}
                      height={20}
                    />
                  )}
                  {progress?.progress ===
                    CANDIDATE_JOB_PROGRESS_STATUS.LOCKED && (
                    <IconLock
                      fill={DISABLED_CONTENT_COLOR}
                      width={20}
                      height={20}
                    />
                  )}
                  {progress?.progress ===
                    CANDIDATE_JOB_PROGRESS_STATUS.IN_PROGRESS && (
                    <IconInfo fill={WARNING_COLOR} width={20} height={20} />
                  )}
                </Box>
              </MenuItem>
            );
          })}
        </Menu>
      </>
    );
  };

  return <>{isScreenSm ? renderDesktopView() : renderMobileView()}</>;
};

export default memo(SideBar);
