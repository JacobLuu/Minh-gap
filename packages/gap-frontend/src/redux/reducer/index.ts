import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import createAccountSlice from '../../containers/CreateAccount/reducer';
import forgotPasswordSlice from '../../containers/ForgotPassword/reducer';
import getStartedSlice from '../../containers/GetStarted/reducer';
import globalStore from '../../containers/Global/reducer';
import loginSlice from '../../containers/Login/reducer';
import employmentHistoriesSlice from '../../containers/RegistrationJourney/reducers/employmentHistories';
import meSkillsSlice from '../../containers/RegistrationJourney/reducers/meSkills';
import meJobsSlice from '../../containers/RegistrationJourney/reducers/meJobs';
import trackingRecordsSlice from '../../containers/Welcome/reducers/trackingRecords';
import meEmergencyContactSlice from '../../containers/RegistrationJourney/reducers/meEmergencyContact';
import meFinancialInformationSlice from '../../containers/RegistrationJourney/reducers/meFinancialInformation';
import meAddressSlice from '../../containers/RegistrationJourney/reducers/meAddress';
import meFilesSlice from '../../containers/RegistrationJourney/reducers/meFiles';
import loqateAddressesSlice from '../../containers/RegistrationJourney/reducers/loqateAddresses';
import addressSlice from '../../containers/RegistrationJourney/reducers/address';
import skillsSlice from '../../containers/RegistrationJourney/reducers/skills';
import progressesSlice from '../../containers/RegistrationJourney/reducers/progresses';
import questionGroupsSlice from '../../containers/RegistrationJourney/reducers/questionGroups';
import ethnicitiesSlice from '../../containers/RegistrationJourney/reducers/ethnicities';
import nationalitiesSlice from '../../containers/RegistrationJourney/reducers/nationalities';
import meShareCodeSlice from '../../containers/RegistrationJourney/reducers/meShareCode';
import resetPasswordSlice from '../../containers/ResetPassword/reducer';
import history from '../../utils/history';

const appReducer = combineReducers({
  router: connectRouter(history),
  globalStore,
  forgotPasswordSlice,
  resetPasswordSlice,
  loginSlice,
  createAccountSlice,
  getStartedSlice,
  skillsSlice,
  meSkillsSlice,
  meJobsSlice,
  trackingRecordsSlice,
  meEmergencyContactSlice,
  employmentHistoriesSlice,
  meFinancialInformationSlice,
  meAddressSlice,
  loqateAddressesSlice,
  addressSlice,
  questionGroupsSlice,
  meFilesSlice,
  progressesSlice,
  ethnicitiesSlice,
  nationalitiesSlice,
  meShareCodeSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_ALL_STATE') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
