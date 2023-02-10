import React, { useEffect } from 'react';
import { Box, Typography, Button, Tooltip } from '@mui/material';
import { ReactComponent as IconQuestion } from 'gap-common/src/assets/images/icon_question.svg';
import { useParams } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { WHITE_COLOR, INACTIVE_COLOR } from '../../../themes/Colors';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import TextareaAutoSize from '../../../components/TextareaAutoSize';
import Records from './Records';
import {
  getContactLogRequest,
  postContactLogRequest,
  selectAdvertResponsesDetailSlice,
} from './reducer';

interface ContactLogForm {
  contactLog: string;
}

// contactLogsData;
const ContactLog = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { contactLogsData } = useAppSelector(selectAdvertResponsesDetailSlice);

  const form = useForm<ContactLogForm>({
    defaultValues: { contactLog: '' },
  });

  const interviewContactLog = useWatch({
    control: form.control,
    name: 'contactLog',
  });

  const handleSubmit = (data) => {
    dispatch(
      postContactLogRequest({
        candidate_id: id,
        content: data.contactLog,
      }),
    );
    form.reset({
      contactLog: '',
    });
  };

  useEffect(() => {
    dispatch(
      getContactLogRequest({
        candidate_id: id,
      }),
    );
  }, []);

  return (
    <Box
      style={{
        backgroundColor: WHITE_COLOR,
        padding: '16px 20px',
        height: 'fit-content',
        marginLeft: '20px',
      }}
      borderRadius="8px"
    >
      <form noValidate onSubmit={form.handleSubmit(handleSubmit)}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1">Contact Log</Typography>
            <Tooltip
              title="this function is to note communication with candidate"
              placement="top"
              arrow
            >
              <IconQuestion
                fill={INACTIVE_COLOR}
                style={{ marginLeft: '5px' }}
              />
            </Tooltip>
          </Box>

          <Button
            disabled={interviewContactLog?.trim()?.length === 0}
            type="submit"
            variant="outlined"
          >
            Log note
          </Button>
        </Box>

        <Controller
          name="contactLog"
          control={form.control}
          render={({ field }) => {
            return (
              <TextareaAutoSize
                minRows={6}
                placeholder="Take a note for your contact log"
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
      </form>

      <Box pt={4}>
        <Typography pb={1} variant="subtitle1">
          Records
        </Typography>
        <Records contactLogsData={contactLogsData} />
      </Box>
    </Box>
  );
};

export default ContactLog;
