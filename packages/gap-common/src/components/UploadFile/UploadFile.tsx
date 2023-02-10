import React from 'react';
import { Controller, useWatch } from 'react-hook-form';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import { BORDER_COLOR, ERROR_COLOR } from '../../themes/Colors';

const UploadFile = (props) => {
  const { name, form } = props;
  const { formState } = form;
  const hasError = formState.errors[name];

  const getFileName = useWatch({
    control: form.control,
    name: name,
  });

  return (
    <Controller
      name={name}
      control={form.control}
      render={() => {
        return (
          <Box mb={5}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                height: '60px',
                border: hasError
                  ? `1px solid ${ERROR_COLOR}`
                  : `1px solid ${BORDER_COLOR}`,
                borderRadius: '8px',
              }}
            >
              <Typography sx={{ marginLeft: '16px' }} color="text.content">
                {getFileName?.name || 'No file selected'}
              </Typography>

              <Stack direction="row" spacing={2}>
                {getFileName?.name && (
                  <Button
                    sx={{
                      height: '36px',
                      borderRadius: '8px',
                    }}
                    onClick={() => form.setValue(name, {})}
                    variant="outlined"
                    component="span"
                  >
                    Remove
                  </Button>
                )}
                <label htmlFor={name}>
                  <input
                    hidden
                    id={name}
                    type="file"
                    accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => {
                      form.setValue(name, e.target.files[0], {
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    }}
                  />
                  <Button
                    sx={{
                      height: '36px',
                      marginRight: '16px',
                      borderRadius: '8px',
                    }}
                    variant="contained"
                    component="span"
                  >
                    Upload
                  </Button>
                </label>
              </Stack>
            </Box>
            <FormHelperText
              sx={{
                paddingLeft: '14px',
              }}
              error
            >
              {formState.errors[name]?.message}
            </FormHelperText>
          </Box>
        );
      }}
    />
  );
};

UploadFile.defaultProps = {};

export default UploadFile;
