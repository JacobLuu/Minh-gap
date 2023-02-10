import React from 'react';
import { Box, Button, InputAdornment, Stack, Typography } from '@mui/material';
import Dialog from 'gap-common/src/components/Dialog';
import InputField from 'gap-common/src/components/InputField';
import RadioGroup from 'gap-common/src/components/CheckBox';
import { ReactComponent as IconSearch } from 'gap-common/src/assets/images/icon_search.svg';
import { useForm } from 'react-hook-form';
import { ICON_COLOR } from '../../../../themes/Colors';

const AssigningEscalatedIssue = ({ isDialogOpen, handleOnclick }) => {
  const form = useForm();
  return (
    <Dialog
      maxWidth="500px"
      isOpenDialog={isDialogOpen}
      handleCloseDialog={handleOnclick}
      title="Assign escalated issue"
    >
      <Typography variant="subtitle2">
        Assign escalated issue to other members
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" my={4}>
        <InputField
          sx={{ width: '460px' }}
          form={form}
          placeholder="Member name"
          $hasAdornment
          name="search"
          icon={
            <InputAdornment position="start">
              <IconSearch fill={ICON_COLOR} />
            </InputAdornment>
          }
        />
      </Box>
      <RadioGroup
        name="Assignee"
        $multiOption
        form={form}
        options={[
          {
            option: 'Thomas Anderson',
            role: 'Consultant',
            value: 1,
          },
          {
            option: 'Alison Silva',
            role: 'Compliance',
            value: 2,
          },
          {
            option: 'James Mclean',
            role: 'Compliance',
            value: 3,
          },
        ]}
      />
      <Stack direction="row" justifyContent="center" spacing={4} mt={5}>
        <Button
          color="primary"
          variant="outlined"
          sx={{ marginBottom: '15px' }}
          onClick={handleOnclick}
        >
          Close
        </Button>

        <Button
          color="primary"
          variant="contained"
          sx={{ marginBottom: '15px' }}
          onClick={handleOnclick}
        >
          Assign issue
        </Button>
      </Stack>
    </Dialog>
  );
};

export default AssigningEscalatedIssue;
