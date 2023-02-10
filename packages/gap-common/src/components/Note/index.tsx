import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import TextareaAutoSize from '../TextareaAutoSize';

interface INoteTextarea {
  name: string;
  form: UseFormReturn<any, any>;
  title?: string;
  isEditing?: boolean;
  placeholder?: string;
  textareaMinRows?: number;
  handleEditNote?: () => void;
}

const NoteTextarea = ({
  name,
  form,
  title,
  isEditing,
  placeholder,
  handleEditNote,
  textareaMinRows,
}: INoteTextarea) => {
  const {
    formState: { isDirty },
  } = form;
  return (
    <Box>
      {isEditing ? (
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="subtitle1">{title}</Typography>
            <Button key="edit" variant="outlined" onClick={handleEditNote}>
              Edit
            </Button>
          </Box>
          <Divider />
          <Typography pt={4} variant="subtitle2">
            {form.getValues(name)}
          </Typography>
        </Box>
      ) : (
        <Box>
          {isDirty ? (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1">{title}</Typography>
              <Button key="save" variant="outlined" type="submit">
                Save
              </Button>
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1">{title}</Typography>
              <Button key="close" variant="outlined" onClick={handleEditNote}>
                Close
              </Button>
            </Box>
          )}

          <Controller
            name={name}
            control={form?.control}
            render={({ field }) => {
              return (
                <TextareaAutoSize
                  minRows={textareaMinRows || 8}
                  placeholder={placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  style={{
                    width: '100%',
                    marginTop: '12px',
                  }}
                />
              );
            }}
          />
        </Box>
      )}
    </Box>
  );
};

NoteTextarea.defaultProps = {
  title: '',
  textareaMinRows: 8,
  isEditing: true,
  placeholder: '',
  handleEditNote: () => {},
};

export default NoteTextarea;
