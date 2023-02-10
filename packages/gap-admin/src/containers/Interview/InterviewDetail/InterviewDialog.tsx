import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Dialog from 'gap-common/src/components/Dialog';
import { getShortcutName } from 'gap-common/src/utils/customHooks';
import { Link } from 'react-router-dom';

const InterviewDialog = ({ isUserInfoOpen, data, handleClickOnAvatar }) => {
  const fullName = [data?.first_name, data?.middle_name, data?.last_name];

  return (
    <Dialog
      maxWidth="344px"
      isOpenDialog={isUserInfoOpen}
      isContentAlignCenter
      handleCloseDialog={handleClickOnAvatar}
      urlIcon={
        <Avatar
          sx={{
            width: 80,
            height: 80,
            margin: '0 auto 16px auto',
          }}
          src={data?.profile_image_url}
          {...getShortcutName(data?.first_name)}
          onClick={handleClickOnAvatar}
        />
      }
    >
      <Box mb={6}>
        <Typography variant="subtitle1">{fullName?.join(' ')}</Typography>
        <Typography pb={2} variant="subtitle2" color="text.content">
          {data.email}
        </Typography>
        <Typography variant="subtitle2" color="text.content">
          {data.phone_number}
        </Typography>
      </Box>
      <Button
        fullWidth
        color="primary"
        component={Link}
        to={`interview/${data?.id}/?currentTab=interview_questionnaire`}
        variant="outlined"
        sx={{ marginBottom: '15px' }}
        onClick={handleClickOnAvatar}
      >
        Interview Page
      </Button>

      <Button
        fullWidth
        color="primary"
        variant="outlined"
        component={Link}
        to={`interview/${data?.id}/?currentTab=applicant_details&applicantDetailTab=employment_history`}
        sx={{ marginBottom: '15px' }}
        onClick={handleClickOnAvatar}
      >
        Employment History
      </Button>

      <Button
        fullWidth
        color="primary"
        component={Link}
        variant="outlined"
        to={`interview/${data?.id}/?currentTab=documents`}
        sx={{ marginBottom: '15px' }}
        onClick={handleClickOnAvatar}
      >
        Key Candidate Documents
      </Button>
    </Dialog>
  );
};

export default InterviewDialog;
