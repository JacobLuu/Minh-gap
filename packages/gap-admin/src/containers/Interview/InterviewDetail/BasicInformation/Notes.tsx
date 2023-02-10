import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import NoteTextarea from 'gap-common/src/components/Note';
import { updateCandidateRequest } from '../reducer';
import { useAppDispatch } from '../../../../redux/hooks';
import { WHITE_COLOR } from '../../../../themes/Colors';

const Notes = ({ screeningCallNoteData }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = React.useState(true);

  const form = useForm({
    defaultValues: {
      basicInformationNote: screeningCallNoteData?.screening_call_note?.content,
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
    if (screeningCallNoteData?.screening_call_note) {
      form.reset({
        basicInformationNote:
          screeningCallNoteData?.screening_call_note?.content,
      });
    }
  }, [screeningCallNoteData]);

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

export default Notes;
