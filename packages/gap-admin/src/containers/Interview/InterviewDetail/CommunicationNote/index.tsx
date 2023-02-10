import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import NoteTextarea from 'gap-common/src/components/Note';

import {
  updateCommunicationNoteRequest,
  selectInterviewDetailStore,
} from '../reducer';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';

import { WHITE_COLOR } from '../../../../themes/Colors';

const CommunicationNote = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { communicationNoteData } = useAppSelector(selectInterviewDetailStore);

  const form = useForm({
    defaultValues: {
      interviewNote: communicationNoteData,
    },
  });

  const [isEditing, setIsEditing] = React.useState(true);
  const handleEditNote = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmitNote = (data) => {
    const interviewInformationInput = {
      candidate_id: id,
      content: data.interviewNote,
    };
    dispatch(updateCommunicationNoteRequest(interviewInformationInput));
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    form.reset({
      interviewNote: communicationNoteData,
    });
  }, [communicationNoteData]);

  return (
    <Box
      style={{ backgroundColor: WHITE_COLOR }}
      borderRadius="8px"
      mt={4}
      p={5}
    >
      <form
        noValidate
        onSubmit={form.handleSubmit(handleSubmitNote)}
        style={{ height: '100%' }}
      >
        <NoteTextarea
          name="interviewNote"
          form={form}
          handleEditNote={handleEditNote}
          title="Communication notes"
          placeholder="Take a note of screening call and interview process"
          isEditing={isEditing}
        />
      </form>
    </Box>
  );
};

export default CommunicationNote;
