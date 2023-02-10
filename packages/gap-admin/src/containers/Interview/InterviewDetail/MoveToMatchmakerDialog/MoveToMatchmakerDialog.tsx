import React from 'react';
import SuccessDialog from './SuccessDialog';
import ErrorDialog from './ErrorDialog';

interface IMoveToMatchmakerDialog {
  isDialogOpen: boolean;
  isSuccessDialog: boolean;
  handleDialog: () => void;
  handleMatchmakerMoveToInterview: () => void;
}

const MoveToMatchmakerDialog = ({
  isDialogOpen,
  isSuccessDialog,
  handleDialog,
  handleMatchmakerMoveToInterview,
}: IMoveToMatchmakerDialog) => {
  return (
    <>
      {isSuccessDialog ? (
        <SuccessDialog
          isDialogOpen={isDialogOpen}
          handleDialog={handleMatchmakerMoveToInterview}
          handleCloseDialog={handleDialog}
        />
      ) : (
        <ErrorDialog isDialogOpen={isDialogOpen} handleDialog={handleDialog} />
      )}
    </>
  );
};

export default MoveToMatchmakerDialog;
