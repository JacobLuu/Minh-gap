import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import Dialog from 'gap-common/src/components/Dialog';
import { useParams } from 'react-router-dom';
import InputField from 'gap-common/src/components/InputField';
import InputPhone from 'gap-common/src/components/InputPhone';
import RadioGroup from 'gap-common/src/components/RadioGroup';
import DatePicker from 'gap-common/src/components/DatePicker';
import MultiSelectField from 'gap-common/src/components/MultiSelectField';
import AutocompleteField from 'gap-common/src/components/AutocompleteField/ControlAutocompleteField';
import {
  TITLE,
  CONTACT_TIME,
  DAYS_OF_THE_WEEK,
  JOURNEY_TYPE as COMMON_JOURNEY_TYPE,
} from 'gap-common/src/constants/enums';
import { useAppDispatch } from '../../../redux/hooks';
import { clearInitialState, updateCandidateRequest } from './reducer';

const TITLES = [TITLE.MR, TITLE.MRS, TITLE.MISS];

const DATA_OF_WEEKS = [
  DAYS_OF_THE_WEEK.MON,
  DAYS_OF_THE_WEEK.TUE,
  DAYS_OF_THE_WEEK.WED,
  DAYS_OF_THE_WEEK.THU,
  DAYS_OF_THE_WEEK.FRI,
  DAYS_OF_THE_WEEK.SAT,
  DAYS_OF_THE_WEEK.SUN,
];

const DATA_OF_DAY = [
  CONTACT_TIME.MORNING,
  CONTACT_TIME.AFTERNOON,
  CONTACT_TIME.EVENING,
];

const JOURNEY_TYPE = [
  {
    option: 'British/Irish Passport',
    value: COMMON_JOURNEY_TYPE.PASSPORT,
  },
  {
    option: 'Share code',
    value: COMMON_JOURNEY_TYPE.SHARE_CODE,
  },
  {
    option: 'Other',
    value: COMMON_JOURNEY_TYPE.OTHERS,
  },
];

const EditInformationDialog = ({
  form,
  isInterviewInformation,
  handleEditInformation,
}) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const handleSubmit = (data) => {
    const interviewInformationInput = {
      candidate_id: id,
      title: data.title,
      first_name: data?.firstName,
      middle_name: data?.middleName,
      last_name: data?.lastName,
      email: data.email,
      phone_number: data.phoneNumber,
      date_of_birth: moment(data.dateOfBirth).format('MM/DD/yyyy'),
      contact_dates: data.contactDates,
      contact_times: data.contactTimes,
      journey_type: data.journeyType,
    };

    dispatch(updateCandidateRequest(interviewInformationInput));
  };

  useEffect(() => {
    return () => {
      dispatch(clearInitialState());
    };
  }, []);

  return (
    <Dialog
      maxWidth="638px"
      isOpenDialog={isInterviewInformation}
      handleCloseDialog={handleEditInformation}
      title="Advertisement respond information"
    >
      <Typography variant="body1" mb={4}>
        Candidates Information
      </Typography>
      <form noValidate onSubmit={form.handleSubmit(handleSubmit)}>
        <Grid container spacing={5}>
          <Grid xs={12}>
            <AutocompleteField
              required
              form={form}
              name="title"
              label="Title"
              options={TITLES}
              placeholder="Choose a title"
            />
          </Grid>
          <Grid xs={4}>
            <InputField
              required
              name="firstName"
              label="First name"
              placeholder="First name"
              form={form}
              disabled={false}
            />
          </Grid>
          <Grid xs={4}>
            <InputField
              name="middleName"
              label="Middle name (Optional)"
              placeholder="Middle name"
              form={form}
            />
          </Grid>
          <Grid xs={4}>
            <InputField
              required
              name="lastName"
              label="Last name"
              placeholder="Last name"
              form={form}
              disabled={false}
            />
          </Grid>

          <Grid xs={6}>
            <InputField
              required
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email address"
              form={form}
              disabled={false}
            />
          </Grid>
          <Grid xs={6}>
            <InputPhone
              required
              name="phoneNumber"
              label="Phone number"
              placeholder="Enter your phone number"
              form={form}
            />
          </Grid>

          <Grid xs={12}>
            <DatePicker
              required
              name="dateOfBirth"
              label="Date of birth"
              form={form}
              placeholder="--/--/----"
            />
          </Grid>

          <Grid xs={12}>
            <Typography variant="body1" mt={5}>
              Contact time
            </Typography>
          </Grid>

          <Grid xs={6}>
            <MultiSelectField
              form={form}
              required
              name="contactDates"
              label="Contact date"
              titleSelected="days selected"
              options={DATA_OF_WEEKS}
              placeholder="Select Contact Date"
            />
          </Grid>
          <Grid xs={6}>
            <MultiSelectField
              form={form}
              required
              name="contactTimes"
              label="Contact time"
              titleSelected="times selected"
              options={DATA_OF_DAY}
              placeholder="Select Contact Time"
            />
          </Grid>

          <Grid xs={12}>
            <Typography variant="body1" mt={5}>
              Right to work status
            </Typography>
            <Typography variant="subtitle2" color="text.content">
              Provide the status of your right to work to be confirmed by GAP
            </Typography>
          </Grid>

          <Grid xs={12}>
            <RadioGroup
              row
              form={form}
              name="journeyType"
              options={JOURNEY_TYPE}
            />
          </Grid>

          <Grid xs={6}>
            <Button
              color="primary"
              fullWidth
              variant="outlined"
              onClick={handleEditInformation}
            >
              Cancel
            </Button>
          </Grid>
          <Grid xs={6}>
            <Button type="submit" color="primary" fullWidth variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default EditInformationDialog;
