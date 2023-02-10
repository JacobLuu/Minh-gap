import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../../utils/history';
import globalStore from '../../containers/Global/reducer';
import loginSlice from '../../containers/Login/reducer';
import forgotPasswordSlice from '../../containers/ForgotPassword/reducer';
import resetPasswordSlice from '../../containers/ResetPassword/reducer';
import advertResponsesSlice from '../../containers/AdvertResponses/reducer';
import advertResponsesDetailSlice from '../../containers/AdvertResponses/AdvertResponsesDetail/reducer';
import rightToWorkHubSlice from '../../containers/RightToWorkHub/reducer';
import branchCandidatesSlice from '../../containers/BranchCandidates/reducer';
import branchCandidateSlice from '../../containers/BranchCandidates/ScreeningCall/reducer';
import branchInterviewSlice from '../../containers/BranchCandidates/InterviewTab/reducer';
import interviewSlice from '../../containers/Interview/reducer';
import interviewDetailSlice from '../../containers/Interview/InterviewDetail/reducer';
import escalatedIssuesSlice from '../../containers/EscalatedIssues/reducer';
import emailTemplatesSlice from '../../containers/EmailTemplates/reducer';
import emailTemplateSlice from '../../containers/EmailTemplates/EditingTemplate/reducer';
import branchesSlice from '../../containers/Branches/reducer';
import branchSlice from '../../containers/Branches/BranchDetail/reducer';
import candidatesSlice from '../../containers/Candidates/reducer';

const rootReducer = combineReducers({
  router: connectRouter(history),
  globalStore,
  loginSlice,
  forgotPasswordSlice,
  resetPasswordSlice,
  advertResponsesSlice,
  advertResponsesDetailSlice,
  rightToWorkHubSlice,
  branchCandidatesSlice,
  branchCandidateSlice,
  branchInterviewSlice,
  interviewSlice,
  interviewDetailSlice,
  escalatedIssuesSlice,
  emailTemplatesSlice,
  emailTemplateSlice,
  branchesSlice,
  candidatesSlice,
  branchSlice,
});

export default rootReducer;
