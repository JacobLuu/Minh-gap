import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import TextareaAutoSize from '../../../components/TextareaAutoSize';
import { WHITE_COLOR } from '../../../themes/Colors';
import { REQUEST_STATUS } from '../../../constants/common';
import {
  updateCandidateRequest,
  selectAdvertResponsesDetailSlice,
} from './reducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

interface IScreeningCallNoteData {
  screeningCallNoteData: {
    id: number;
    type: string;
    content: string;
    posted_at: number;
    user: {
      id: string;
      name: string;
    };
  };
}

const CallNote = ({ screeningCallNoteData }: IScreeningCallNoteData) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { advertResponsesDetailStatus } = useAppSelector(
    selectAdvertResponsesDetailSlice,
  );
  const [screeningNoteValue, setScreeningNoteValue] = useState('');

  const handleSubmit = () => {
    const interviewInformationInput = {
      candidate_id: id,
      screen_call_note_content: screeningNoteValue,
    };
    setScreeningNoteValue('');
    dispatch(updateCandidateRequest(interviewInformationInput));
  };
  return (
    <Box
      style={{
        backgroundColor: WHITE_COLOR,
        padding: '16px 20px',
        height: 'fit-content',
      }}
      borderRadius="8px"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Typography variant="subtitle1">Screening call note</Typography>
        <Button
          variant="outlined"
          onClick={handleSubmit}
          disabled={
            advertResponsesDetailStatus === REQUEST_STATUS.REQUESTING ||
            screeningNoteValue.trim().length === 0
          }
        >
          Save
        </Button>
      </Box>
      <TextareaAutoSize
        minRows={20}
        placeholder="Take a note of screening call process"
        defaultValue={screeningCallNoteData?.content || ''}
        onChange={(e) => setScreeningNoteValue(e.target.value)}
        style={{
          width: '100%',
          marginTop: '12px',
        }}
      />
    </Box>
  );
};

export default CallNote;
