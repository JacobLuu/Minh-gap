import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';

import { Prompt, useHistory, useLocation } from 'react-router-dom';
import Dialog from 'gap-common/src/components/Dialog';

interface ConfirmBeforeLeaveModalProps {
  title: string;
  description: string;
  isBlocked: boolean;
}

const ConfirmBeforeLeaveModal = (props: ConfirmBeforeLeaveModalProps) => {
  const { title, description, isBlocked } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [lastLocation, setLastLocation] = useState(location);
  const [shouldUnload, setShouldUnload] = useState(false);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setShouldUnload(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const showModal = (nextLocation) => {
    openModal();
    setLastLocation(nextLocation);
  };

  const handleBlockedRoute = (nextLocation) => {
    if (!confirmedNavigation && isBlocked) {
      showModal(nextLocation);
      return false;
    }

    return true;
  };

  const handleConfirmNavigationClick = () => {
    closeModal();
    setConfirmedNavigation(true);
  };

  // Block react routes
  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      // Navigate to the previous blocked location with your navigate function
      setShouldUnload(true);
      history.push(lastLocation.pathname);
    }
  }, [confirmedNavigation, lastLocation, history]);

  // Block non-react routes
  useEffect(() => {
    const unload = (event) => {
      if (isBlocked && !shouldUnload) {
        event.returnValue = 'test';
      }
      if (shouldUnload) {
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', unload);
    return () => window.removeEventListener('beforeunload', unload);
  }, [isBlocked, shouldUnload]);
  return (
    <>
      <Prompt when message={handleBlockedRoute} />
      <Dialog
        title={title}
        description={description}
        isOpenDialog={isModalOpen}
        isContentAlignCenter
        maxWidth="380px"
      >
        <Box display="flex" justifyContent="center">
          <Button
            onClick={closeModal}
            variant="outlined"
            style={{ marginRight: '10px' }}
            autoFocus
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmNavigationClick}
            variant="contained"
            autoFocus
          >
            Yes
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default ConfirmBeforeLeaveModal;
