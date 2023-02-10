import { all } from 'redux-saga/effects';

import createAccountSaga from '../../containers/CreateAccount/saga';
import forgotPasswordSaga from '../../containers/ForgotPassword/saga';
import getStartedSaga from '../../containers/GetStarted/saga';
import loginSaga from '../../containers/Login/saga';
import employmentHistoriesSaga from '../../containers/RegistrationJourney/sagas/employmentHistories';
import meJobsSaga from '../../containers/RegistrationJourney/sagas/meJobs';
import trackingRecordsSaga from '../../containers/Welcome/sagas/trackingRecords';
import meEmergencyContactSaga from '../../containers/RegistrationJourney/sagas/meEmergencyContact';
import meFinancialInformationSaga from '../../containers/RegistrationJourney/sagas/meFinancialInformation';
import meSkillsSaga from '../../containers/RegistrationJourney/sagas/meSkills';
import meAddressSaga from '../../containers/RegistrationJourney/sagas/meAddress';
import addressSaga from '../../containers/RegistrationJourney/sagas/address';
import skillsSaga from '../../containers/RegistrationJourney/sagas/skills';
import questionGroupsSaga from '../../containers/RegistrationJourney/sagas/questionGroups';
import meFilesSaga from '../../containers/RegistrationJourney/sagas/meFiles';
import progressesSaga from '../../containers/RegistrationJourney/sagas/progresses';
import ethnicitiesSaga from '../../containers/RegistrationJourney/sagas/ethnicities';
import nationalitiesSaga from '../../containers/RegistrationJourney/sagas/nationalities';
import meShareCodeSaga from '../../containers/RegistrationJourney/sagas/meShareCode';
import resetPasswordSaga from '../../containers/ResetPassword/saga';

export default function* rootSaga() {
  yield all([
    forgotPasswordSaga(),
    resetPasswordSaga(),
    loginSaga(),
    createAccountSaga(),
    getStartedSaga(),
    skillsSaga(),
    meSkillsSaga(),
    meJobsSaga(),
    trackingRecordsSaga(),
    meEmergencyContactSaga(),
    employmentHistoriesSaga(),
    meFinancialInformationSaga(),
    meAddressSaga(),
    addressSaga(),
    questionGroupsSaga(),
    meFilesSaga(),
    progressesSaga(),
    ethnicitiesSaga(),
    nationalitiesSaga(),
    meShareCodeSaga(),
  ]);
}
