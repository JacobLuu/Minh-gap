import React from 'react';
import DatePicker from 'react-datepicker';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';
import { Controller } from 'react-hook-form';
import Images from '../../../../gap-admin/src/assets/images';
import { CONTENT_COLOR, ERROR_COLOR } from '../../themes/Colors';

import { Wrapper } from './style';
import 'react-datepicker/dist/react-datepicker.css';

const TimePicker = ({ label, required, form, name, disabled, placeholder }) => {
  const { formState } = form;
  const hasError = formState.errors[name];
  return (
    <Wrapper>
      <Controller
        control={form.control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            {label && (
              <Box pb={2}>
                <Typography
                  sx={{ color: hasError ? ERROR_COLOR : CONTENT_COLOR }}
                  variant="caption"
                  className="label"
                  mb={2}
                >
                  {label}{' '}
                </Typography>
                {required && (
                  <Typography component="span" color="text.error">
                    *
                  </Typography>
                )}
              </Box>
            )}
            <DatePicker
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="HH:mm"
              timeFormat="HH:mm"
              selected={value || ''}
              disabled={disabled}
              onChange={(e) => {
                onChange(e);
              }}
              customInput={
                <InputMask mask="99:99">
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      placeholder={placeholder}
                      fullWidth
                      variant="outlined"
                      error={Boolean(form.formState.errors[name])}
                      helperText={form.formState.errors[name]?.message}
                      InputProps={{
                        endAdornment: (
                          <img
                            src={Images.icon_clock}
                            width="18"
                            height="18"
                            alt="Time picker"
                          />
                        ),
                      }}
                    />
                  )}
                </InputMask>
              }
            />
          </>
        )}
      />
    </Wrapper>
  );
};

export default TimePicker;
