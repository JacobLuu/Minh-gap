import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import Dialog from 'gap-common/src/components/Dialog';
import TextareaAutoSize from '../../../../components/TextareaAutoSize';
import { useAppDispatch } from '../../../../redux/hooks';
import { postMissingInformationRequest } from '../reducer';
import RequestLog from './RequestLog';

const RequestMissingInformationDialog = ({
  candidateId,
  isDialogOpen,
  handleDialog,
}) => {
  const dispatch = useAppDispatch();

  const form = useForm();

  const handleRequestMissingInformation = (data) => {
    dispatch(
      postMissingInformationRequest({
        candidateId: candidateId,
        contentLog: data.contentLog,
      }),
    );
    form.reset();
  };

  return (
    <Dialog
      maxWidth="589px"
      isOpenDialog={isDialogOpen}
      handleCloseDialog={handleDialog}
      title="Request missing information"
    >
      <form
        noValidate
        onSubmit={form.handleSubmit(handleRequestMissingInformation)}
        style={{ height: '100%' }}
      >
        <Box>
          <Typography variant="subtitle1" mb={3}>
            Request description
          </Typography>
          <Controller
            name="contentLog"
            control={form.control}
            render={({ field }) => {
              return (
                <TextareaAutoSize
                  minRows={4}
                  placeholder="Enter your description about missing information request"
                  value={field.value}
                  onChange={field.onChange}
                  style={{
                    width: '100%',
                  }}
                />
              );
            }}
          />
        </Box>
        <Box my={10} display="flex" justifyContent="space-between">
          <Button color="primary" variant="outlined" onClick={handleDialog}>
            Cancel
          </Button>

          <Button
            color="primary"
            variant="contained"
            onClick={handleDialog}
            type="submit"
          >
            Send request
          </Button>
        </Box>
      </form>
      <Typography variant="subtitle1">Request Log</Typography>
      <RequestLog candidateId={candidateId} />
    </Dialog>
  );
};

export default RequestMissingInformationDialog;
