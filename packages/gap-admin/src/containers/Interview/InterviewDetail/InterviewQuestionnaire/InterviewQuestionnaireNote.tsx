import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import NoteTextarea from 'gap-common/src/components/Note';

import { useAppDispatch } from '../../../../redux/hooks';
import { updateCandidateRequest } from '../reducer';
import { WHITE_COLOR } from '../../../../themes/Colors';

const InterviewQuestionnaireNote = ({ interviewDetailData }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = React.useState(true);

  const form = useForm({
    defaultValues: {
      basicInformationNote: interviewDetailData?.screening_call_note?.content,
    },
  });

  const handleEditNote = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmitNote = (data) => {
    const interviewInformationInput = {
      candidate_id: id,
      screen_call_note_content: data.basicInformationNote,
    };
    dispatch(updateCandidateRequest(interviewInformationInput));
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (interviewDetailData?.screening_call_note) {
      form.reset({
        basicInformationNote: interviewDetailData?.screening_call_note?.content,
      });
    }
  }, [interviewDetailData]);

  return (
    <Box
      style={{ backgroundColor: WHITE_COLOR }}
      borderRadius="8px"
      px={5}
      pt={3}
      pb={5}
      mb={5}
    >
      <form
        noValidate
        onSubmit={form.handleSubmit(handleSubmitNote)}
        style={{ height: '100%' }}
      >
        <NoteTextarea
          name="basicInformationNote"
          form={form}
          handleEditNote={handleEditNote}
          title="Notes"
          placeholder="Take a note of screening call and interview process"
          isEditing={isEditing}
        />
      </form>
    </Box>
  );
};

export default InterviewQuestionnaireNote;
