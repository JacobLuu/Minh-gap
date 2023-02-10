export enum STEP_NAME {
  PERSONAL_DETAILS = 'personal_details',
  SKILLS_AND_QUALIFICATIONS = 'skills_and_qualifications',
  EMPLOYMENT_HISTORY = 'employment_history',
  EMERGENCY_CONTACT = 'emergency_contact',
  ADDRESS_DETAILS = 'address_details',
  PERSONAL_PROTECTIVE_EQUIPMENT = 'personal_protective_equipment',
  RIGHT_TO_WORK_PROOFS = 'right_to_work_proofs',
  FINANCIAL_INFORMATION = 'financial_information',
  DECLARATIONS = 'declarations',
  CONTRACTS = 'contracts',
}

export enum RIGHT_TO_WORK_STATUS {
  PASSPORT = 'passport',
  SHARE_CODE = 'share_code',
  OTHER = 'other',
}

export enum REQUEST_STATUS {
  IDLE = 'IDLE',
  REQUESTING = 'REQUESTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum ANSWER_TYPE {
  ANSWER_YES = 'yes',
  ANSWER_NO = 'no',
  ANSWER_AGREE = 'agree',
  ANSWER_DISAGREE = 'disagree',
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

export enum QUESTION_TYPE {
  TYPE_YES_NO = 'yes_no',
  TYPE_FREE_TEXT = 'free_text',
  TYPE_YES_NO_TEXT = 'yes_no_text',
  TYPE_SELECT_SINGLE = 'select_single',
  TYPE_SELECT_MULTI = 'select_multi',
  TYPE_AGREE_DISAGREE = 'agree_disagree',
  TYPE_IMAGE = 'image',
}

export enum FILE_TYPE {
  TYPE_CV = 'cv',
  TYPE_DECLARATION_AGREEMENT = 'declaration_agreement',
  TYPE_ADDRESS_PROOF = 'address_proof',
  TYPE_PASSPORT = 'passport',
  TYPE_PASSPORT_CHECK_RESULT_REPORT = 'passport_check_result_report',
  TYPE_WORK_CONTRACT = 'work_contract',
  TYPE_MEDICAL_CONTRACT = 'medical_contract',
  TYPE_KEY_INFORMATION_DOCUMENT = 'key_information_document',
  TYPE_CANDIDATE_SIGNATURE = 'candidate_signature',
  TYPE_BANK_PROOF = 'bank_proof',
  TYPE_RIGHT_TO_WORK = 'right_to_work',
  TYPE_PROFILE_IMAGE_OF_RIGHT_TO_WORK = 'profile_image_of_right_to_work',
  TYPE_PROFILE_IMAGE = 'profile_image',
}

export enum FILE_STATUS_TYPE {
  STATUS_UPLOADED = 'uploaded',
  STATUS_RELEASED = 'released',
  STATUS_READ = 'read',
  STATUS_SIGNED = 'signed',
}

export enum CANDIDATE_JOB_PROGRESS_STATUS {
  LOCKED = 'locked',
  NO_INFO = 'no_info',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export enum CANDIDATE_JOB_PROGRESS_TYPE {
  PERSONAL_DETAILS = 'personal_details',
  SKILLS_AND_QUALIFICATIONS = 'skill_qualifications',
  EMPLOYMENT_HISTORY = 'employment_history',
  EMERGENCY_CONTACT = 'emergency_contact',
  PERSONAL_PROTECTIVE_EQUIPMENT = 'personal_protective_equipment',
  ADDRESS_DETAILS = 'address_details',
  RIGHT_TO_WORK_PROOFS = 'right_to_work_proofs',
  FINANCIAL_INFORMATION = 'financial_information',
  DECLARATIONS = 'declarations',
  CONTRACTS = 'contracts',
}

export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum JOURNEY_TYPE {
  PASSPORT = 'passport',
  SHARE_CODE = 'share_code',
  OTHERS = 'others',
}

export enum EMPLOYMENT_STATUS {
  FULLTIME = 'fulltime',
  PARTTIME = 'parttime',
}

export enum HISTORY_TYPE {
  EMPLOYMENT = 'employment',
  EDUCATION = 'education',
  OTHER = 'other',
}

export enum GBG_VERIFICATION_PROCESS_MESSAGE_TYPE {
  START_PROCESS_TO_GET_RESULT = 'StartProcessToGetResult',
  END_PROCESS_TO_GET_RESULT = 'EndProcessToGetResult',
}
