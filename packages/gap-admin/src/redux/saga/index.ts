import { all } from 'redux-saga/effects';
import loginSaga from '../../containers/Login/saga';
import forgotPasswordSaga from '../../containers/ForgotPassword/saga';
import resetPasswordSaga from '../../containers/ResetPassword/saga';
import advertResponsesSaga from '../../containers/AdvertResponses/saga';
import advertResponsesDetailSaga from '../../containers/AdvertResponses/AdvertResponsesDetail/saga';
import rightToWorkHubSaga from '../../containers/RightToWorkHub/saga';
import branchCandidatesSaga from '../../containers/BranchCandidates/saga';
import branchCandidateSaga from '../../containers/BranchCandidates/ScreeningCall/saga';
import branchInterviewSaga from '../../containers/BranchCandidates/InterviewTab/saga';
import interviewSaga from '../../containers/Interview/saga';
import interviewDetailSaga from '../../containers/Interview/InterviewDetail/saga';
import escalatedIssuesSaga from '../../containers/EscalatedIssues/saga';
import emailTemplatesSaga from '../../containers/EmailTemplates/saga';
import emailTemplateSaga from '../../containers/EmailTemplates/EditingTemplate/saga';
import branchesSaga from '../../containers/Branches/saga';
import branchSaga from '../../containers/Branches/BranchDetail/saga';
import candidatesSaga from '../../containers/Candidates/saga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    forgotPasswordSaga(),
    resetPasswordSaga(),
    advertResponsesSaga(),
    advertResponsesDetailSaga(),
    rightToWorkHubSaga(),
    branchCandidatesSaga(),
    branchCandidateSaga(),
    branchInterviewSaga(),
    interviewSaga(),
    interviewDetailSaga(),
    escalatedIssuesSaga(),
    emailTemplatesSaga(),
    emailTemplateSaga(),
    branchesSaga(),
    branchSaga(),
    candidatesSaga(),
  ]);
}
