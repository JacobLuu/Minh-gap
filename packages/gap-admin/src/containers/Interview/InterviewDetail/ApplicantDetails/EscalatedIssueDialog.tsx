import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Dialog from 'gap-common/src/components/Dialog';
import { Controller } from 'react-hook-form';
import AutocompleteField from 'gap-common/src/components/AutocompleteField/ControlAutocompleteField';
import { ESCALATED_ISSUES_STATUS } from 'gap-common/src/constants/enums';
import { useAppDispatch } from '../../../../redux/hooks';
import {
  escalatedIssuesRequest,
  updateEscalatedIssuesRequest,
} from '../reducer';
import IssueLogs from './IssueLogs';
import TextareaAutoSize from '../../../../components/TextareaAutoSize';
import { ESCALATED_ISSUE_OPTION } from '../../../../constants/common';

const EscalatedIssueDialog = ({
  form,
  category,
  isDialogOpen,
  handleDialogOpen,
  escalatedIssuesLogs,
  interviewDetailData,
}) => {
  const [isDialogSolveIssueOpen, setIsDialogSolveIssueOpen] =
    useState<boolean>(false);

  const [isDialogUnsavedOpen, setIsDialogUnsavedOpen] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleOnclickEscalatedIssue = (data) => {
    const personalDetailsEscalatedIssueData = {
      candidate_id: interviewDetailData?.id,
      type: data?.issueType?.value,
      content: data?.contentLog,
      category: category,
    };

    if (escalatedIssuesLogs?.length > 0) {
      dispatch(
        updateEscalatedIssuesRequest({
          ...personalDetailsEscalatedIssueData,
          issue_id: escalatedIssuesLogs?.[0]?.id,
          status: ESCALATED_ISSUES_STATUS.CREATED,
          message: 'Issue log success.',
        }),
      );
    } else {
      dispatch(escalatedIssuesRequest(personalDetailsEscalatedIssueData));
    }
    handleDialogOpen();
  };

  const handleSolveEscalatedIssue = (data) => {
    const personalDetailsEscalatedIssueData = {
      candidate_id: interviewDetailData?.id,
      type: data?.issueType?.value,
      content: data?.contentLog,
      category: category,
    };

    dispatch(
      updateEscalatedIssuesRequest({
        ...personalDetailsEscalatedIssueData,
        issue_id: escalatedIssuesLogs?.[0]?.id,
        status: ESCALATED_ISSUES_STATUS.SOLVED,
        message: 'Issue solved success.',
      }),
    );
    handleDialogOpen();
  };

  const handleUnsavedCancel = () => {
    setIsDialogUnsavedOpen(false);
  };

  const handleUnsaved = () => {
    handleUnsavedCancel();
    handleDialogOpen();
    form.reset();
  };

  const handleSolveIssue = () => {
    setIsDialogSolveIssueOpen(!isDialogSolveIssueOpen);
  };

  const handleSolveIssueCancel = () => {
    setIsDialogSolveIssueOpen(false);
  };

  const formStateStatus =
    !form?.formState?.isSubmitSuccessful && form?.formState?.isDirty;

  return (
    <Dialog maxWidth="477px" isOpenDialog={isDialogOpen}>
      <form noValidate>
        <Box
          mb={6}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4">Escalated issue</Typography>

          <AutocompleteField
            required
            form={form}
            $shouldHaveFlag
            name="issueType"
            fullWidth={false}
            sx={{ width: '220px' }}
            options={ESCALATED_ISSUE_OPTION}
            placeholder="Choose issue type"
          />
        </Box>

        <Controller
          name="contentLog"
          control={form?.control}
          render={({ field }) => {
            return (
              <TextareaAutoSize
                minRows={8}
                placeholder="Why this section marked as escalated issue"
                value={field.value}
                onChange={field.onChange}
                error={form.formState.errors.contentLog}
                style={{
                  width: '100%',
                  marginTop: '12px',
                }}
              />
            );
          }}
        />

        <Stack direction="row" justifyContent="center" spacing={4} mt={5}>
          <Button
            color="primary"
            variant="outlined"
            sx={{ marginBottom: '15px' }}
            onClick={() =>
              formStateStatus
                ? setIsDialogUnsavedOpen(true)
                : handleDialogOpen()
            }
          >
            Close
          </Button>

          {escalatedIssuesLogs?.length > 0 && (
            <Button
              color="primary"
              variant="outlined"
              sx={{ marginBottom: '15px' }}
              onClick={() => {
                handleSolveIssue();
              }}
            >
              Solve issue
            </Button>
          )}

          <Button
            color="primary"
            variant="contained"
            sx={{ marginBottom: '15px' }}
            type="submit"
            onClick={form.handleSubmit(handleOnclickEscalatedIssue)}
          >
            {escalatedIssuesLogs?.length > 0 ? 'Save' : 'Add'}
          </Button>
        </Stack>

        <Dialog
          title="Solve issue?"
          description="Are you sure you have solved this issue? Your action will be saved to logs"
          isOpenDialog={isDialogSolveIssueOpen}
          isContentAlignCenter
          maxWidth="380px"
        >
          <Box display="flex" justifyContent="center">
            <Button
              onClick={handleSolveIssueCancel}
              variant="outlined"
              style={{ marginRight: '10px' }}
              autoFocus
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                handleSolveIssue();
                form.handleSubmit(handleSolveEscalatedIssue)();
              }}
              variant="contained"
              autoFocus
            >
              Yes
            </Button>
          </Box>
        </Dialog>
      </form>
      {escalatedIssuesLogs?.length > 0 && (
        <Typography variant="subtitle1" fontWeight={500} mt={5}>
          Issue logs
        </Typography>
      )}

      <IssueLogs escalatedIssuesLogs={escalatedIssuesLogs} />

      <Dialog
        title="Unsaved changes"
        description="You haven’t saved current escalated issue
        Do you want to save ?"
        isOpenDialog={isDialogUnsavedOpen}
        isContentAlignCenter
        maxWidth="380px"
      >
        <Box display="flex" justifyContent="center">
          <Button
            onClick={handleUnsavedCancel}
            variant="outlined"
            style={{ marginRight: '10px' }}
            autoFocus
          >
            Cancel
          </Button>
          <Button onClick={handleUnsaved} variant="contained" autoFocus>
            Yes
          </Button>
        </Box>
      </Dialog>
    </Dialog>
  );
};

export default EscalatedIssueDialog;
