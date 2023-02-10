import {
  JOURNEY_TYPE,
  INTERVIEW_METHOD_VALUE,
  ESCALATED_ISSUE_TYPE,
  CANDIDATE_STATUS,
} from 'gap-common/src/constants/enums';

export const scrollTop = (scrollToTopRef) => {
  scrollToTopRef?.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  });
};

export const getShortcutName = (name: string) => {
  return {
    children: `${name?.split(' ')[0][0]}`,
  };
};

export const getJourneyType = (journeyValue: string) => {
  switch (journeyValue) {
    case JOURNEY_TYPE.PASSPORT:
      return 'British/Irish Passport';
    case JOURNEY_TYPE.SHARE_CODE:
      return 'Share code';
    case JOURNEY_TYPE.OTHERS:
      return 'Other';
    default:
      return null;
  }
};

export const getInterviewMethod = (value: string) => {
  switch (value) {
    case INTERVIEW_METHOD_VALUE.REMOTE_INTERVIEW:
      return 'Remote';
    case INTERVIEW_METHOD_VALUE.IN_BRANCH:
      return 'In Branch';
    case INTERVIEW_METHOD_VALUE.CLIENT_LOCATION:
      return 'At Client’s Location';
    default:
      return null;
  }
};

export const getEscalatedIssueType = (value: string) => {
  switch (value) {
    case ESCALATED_ISSUE_TYPE.DUPLICATED:
      return 'Duplicated Data';
    case ESCALATED_ISSUE_TYPE.RIGHT_TO_WORK:
      return 'Right To Work';
    case ESCALATED_ISSUE_TYPE.OTHERS:
      return 'Others';
    default:
      return null;
  }
};

export const getCandidateStatus = (value: string) => {
  switch (value) {
    case CANDIDATE_STATUS.SCREENING_CALL:
      return 'Screening Call';
    case CANDIDATE_STATUS.INTERVIEW:
      return 'Interview';
    case CANDIDATE_STATUS.ARCHIVED:
      return 'Archived';
    case CANDIDATE_STATUS.MATCHMAKER:
      return 'Matchmaker';
    default:
      return null;
  }
};

export const showingRecordsPagination = (
  totalCount: number,
  page: number,
  rowsPerPage: number,
) => {
  let recordTo = 0;

  if (page * rowsPerPage < totalCount) {
    recordTo = page * rowsPerPage;
  } else recordTo = totalCount;

  return `Show ${recordTo || 0} results ${totalCount || 0} records`;
};
