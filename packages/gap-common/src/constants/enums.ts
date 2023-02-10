export enum EMPLOYMENT_STATUS {
  FULLTIME = 'fulltime',
  PARTTIME = 'parttime',
}

export enum HISTORY_TYPE {
  EMPLOYMENT = 'employment',
  EDUCATION = 'education',
  OTHER = 'other',
}

export enum TITLE {
  MR = 'mr',
  MRS = 'mrs',
  MISS = 'miss',
}

export enum INTERVIEW_DETAIL_STEPS {
  STEP1 = 1,
  STEP2 = 2,
  STEP3 = 3,
  STEP4 = 4,
  STEP5 = 5,
  STEP6 = 6,
}

export enum PROGRESS_STATUS {
  LOCKED = 'locked',
  NO_INFO = 'no_info',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export enum DAYS_OF_THE_WEEK {
  MON = 'monday',
  TUE = 'tuesday',
  WED = 'wednesday',
  THU = 'thursday',
  FRI = 'friday',
  SAT = 'saturday',
  SUN = 'sunday',
}

export enum DAYS_OF_THE_WEEK_SHORT {
  MON = 'mon',
  TUE = 'tue',
  WED = 'wed',
  THU = 'thu',
  FRI = 'fri',
  SAT = 'sat',
  SUN = 'sun',
}

export enum CONTACT_TIME {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
}

export enum CANDIDATE_STATUS {
  SCREENING_CALL = 'screening_call',
  INTERVIEW = 'interview',
  ARCHIVED = 'archived',
  MATCHMAKER = 'matchmaker',
}

export enum ESCALATED_ISSUES_LOGS_STATUS {
  ADDED = 'added',
  ASSIGNED = 'assigned',
  UPDATED = 'updated',
  DELETED = 'deleted',
  SOLVED = 'solved',
}

export enum ESCALATED_ISSUES_STATUS {
  CREATED = 'created',
  ASSIGNED = 'assigned',
  SOLVED = 'solved',
  DELETED = 'deleted',
}

export enum INTERVIEW_METHOD_VALUE {
  REMOTE_INTERVIEW = 'remote',
  IN_BRANCH = 'in_branch',
  CLIENT_LOCATION = 'client_location',
}

export enum URL_PARAM_KEYS {
  CURRENT_TAB = 'current_tab',
  APPLICANT_DETAIL_TAB = 'applicant_detail_tab',
}

export enum ANSWER_TYPE {
  ANSWER_YES = 'yes',
  ANSWER_NO = 'no',
  ANSWER_AGREE = 'agree',
  ANSWER_DISAGREE = 'disagree',
}

export enum APPLICANT_DETAILS_CATEGORY {
  PERSONAL_DETAILS = 'personal_details',
  SKILL_AND_QUALIFICATIONS = 'skill_qualifications',
  EMPLOYMENT_HISTORY = 'employment_history',
  PERSONAL_PROTECTIVE_EQUIPMENT = 'personal_protective_equipment',
  ADDRESS_DETAILS = 'address_details',
  FINANCIAL_INFORMATION = 'financial_information',
  RIGHT_TO_WORK_PROOFS = 'right_to_work_proofs',
  EMERGENCY_CONTACT = 'emergency_contact',
  DECLARATIONS = 'declarations',
}

export enum QUESTION_GROUP_TYPE {
  PERSONAL_PROTECTIVE_EQUIPMENTS = 'personal_protective_equipments',
  DECLARATIONS_TRANSPORT_AND_AVAILABILITY = 'declarations_transport_and_availability',
  DECLARATIONS_SEEKING = 'declarations_seeking',
  DECLARATIONS_PAYMENT = 'declarations_payment',
  DECLARATIONS_AGREEMENTS = 'declarations_agreements',
  DECLARATIONS_HEALTH_AND_DISABILITY = 'declarations_health_and_disability',
  DECLARATIONS_DISCLOSURE_AND_BARRING_SERVICE = 'declarations_disclosure_and_barring_service',
  DECLARATIONS_OVERALL_AGREEMENT = 'declarations_overall_agreement',
}

export enum INTERVIEW_ASSESSMENTS_TYPE {
  INTERVIEW_ASSESSMENTS = 'interview_assessments',
  INTERVIEW_ACCOMMODATION_AND_TRAVEL = 'interview_accommodation_and_travel',
  INTERVIEW_PAY_AND_BANKING = 'interview_pay_and_banking',
  INTERVIEW_EMPLOYMENT_HISTORY = 'interview_employment_history',
  INTERVIEW_MISC = 'interview_misc',
}

export enum QUESTION_TYPE {
  YES_NO = 'yes_no',
  FREE_TEXT = 'free_text',
  YES_NO_TEXT = 'yes_no_text',
  SELECT_SINGLE = 'select_single',
  SELECT_MULTI = 'select_multi',
  AGREE_DISAGREE = 'agree_disagree',
  IMAGE = 'image',
}

export enum FILE_TYPE {
  CV = 'cv',
  DECLARATION_AGREEMENT = 'declaration_agreement',
  ADDRESS_PROOF = 'address_proof',
  PASSPORT = 'passport',
  PASSPORT_CHECK_RESULT_REPORT = 'passport_check_result_report',
  WORK_CONTRACT = 'work_contract',
  MEDICAL_CONTRACT = 'medical_contract',
  KEY_INFORMATION_DOCUMENT = 'key_information_document',
  WORK_CONTRACT_SIGNATURE = 'work_contract_signature',
  MEDICAL_CONTRACT_SIGNATURE = 'medical_contract_signature',
  CANDIDATE_SIGNATURE = 'candidate_signature',
  BANK_PROOF = 'bank_proof',
  RIGHT_TO_WORK = 'right_to_work',
  PROFILE_IMAGE_OF_RIGHT_TO_WORK = 'profile_image_of_right_to_work',
  PROFILE_IMAGE = 'profile_image',
}

export enum FILE_STATUS {
  UPLOADED = 'uploaded',
  RELEASED = 'released',
  READ = 'read',
  SIGNED = 'signed',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum BRANCH_TYPE {
  BRANCH = 'branch',
  ON_SITE = 'onsite',
  SUB_SITE = 'subsite',
}

export enum JOURNEY_TYPE {
  PASSPORT = 'passport',
  SHARE_CODE = 'share_code',
  OTHERS = 'others',
}

export enum ESCALATED_ISSUE_TYPE {
  DUPLICATED = 'duplicated_data',
  RIGHT_TO_WORK = 'right_to_work',
  OTHERS = 'others',
}
