import InputSelectField from 'gap-common/src/components/InputSelectField';
import RadioGroup from 'gap-common/src/components/RadioGroup';
import { CONTENT_COLOR } from 'gap-common/src/themes/Colors';
import React, { memo, useEffect } from 'react';
import {
  FieldArrayWithId,
  useFieldArray,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { IOptionRadioGroup as RadioOption } from 'gap-common/src/components/RadioGroup';

import {
  ANSWER_TYPE,
  CANDIDATE_JOB_PROGRESS_STATUS,
  CANDIDATE_JOB_PROGRESS_TYPE,
  QUESTION_GROUP_TYPE,
  QUESTION_TYPE,
} from '../../../../constants/enums';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import ProgressesService from '../../../../services/ProgressesService';
import QuestionGroupsService from '../../../../services/QuestionGroupsService';
import { useBreakPoints } from '../../../../utils/customHooks';
import { setErrorMessages, setSuccessMessages } from '../../../Global/reducer';
import { getProgressesRequest } from '../../reducers/progresses';
import {
  getQuestionGroupRequest,
  selectQuestionGroups,
} from '../../reducers/questionGroups';

import type { AddAnswersRequest } from '../../../../types/Requests';
import type { JobOption } from '../../RegistrationJourney';

const radioOptions: RadioOption[] = [
  {
    value: ANSWER_TYPE.ANSWER_YES,
    option: 'Yes',
  },
  {
    value: ANSWER_TYPE.ANSWER_NO,
    option: 'No',
  },
];

const bootSizes: { label: string; value: string }[] = [];

for (let i = 7; i <= 14; i += 0.5) {
  bootSizes.push({ label: `${i}`, value: `${i}` });
}

export interface QuestionFieldProps {
  field: FieldArrayWithId<PersonalProtectiveEquipmentForm, 'questions', 'key'>;
  form: UseFormReturn<PersonalProtectiveEquipmentForm, any>;
  index: number;
}

const QuestionField = (props: QuestionFieldProps) => {
  const { field, form, index } = props;
  const { t } = useTranslation();

  if (field.type === QUESTION_TYPE.TYPE_YES_NO) {
    return (
      <Box display="flex" flexDirection="column" mb={6}>
        <Typography color="text.content" variant="caption">
          {t<string>(
            `registrationJourney:personal_protective_equipment.body.question_label_${
              index + 1
            }`,
          )}
          &nbsp;
          <Box component="span" color="text.error">
            *
          </Box>
        </Typography>
        <RadioGroup
          form={form}
          row
          options={radioOptions}
          name={`questions.${index}.answer.answer.0`}
        />
      </Box>
    );
  }
  if (field.type === QUESTION_TYPE.TYPE_SELECT_SINGLE) {
    return (
      <Box mb={6}>
        <InputSelectField
          name={`questions.${index}.answer.answer.0`}
          label={t<string>(
            `registrationJourney:personal_protective_equipment.body.question_label_${
              index + 1
            }`,
          )}
          placeholder={t<string>(
            `registrationJourney:personal_protective_equipment.body.question_label_${
              index + 1
            }`,
          )}
          required
          defaultValue={form.getValues(`questions.${index}.answer.answer.0`)}
          form={form}
          options={bootSizes}
        />
      </Box>
    );
  }
};

export interface PersonalProtectiveEquipmentForm {
  questions: {
    id: number;
    type: QUESTION_TYPE;
    answer: {
      // string[] type is to conform the type of the boot size question
      answer: ANSWER_TYPE[] | string[];
    };
  }[];
}

const DEFAULT_FORM_VALUES: PersonalProtectiveEquipmentForm = {
  questions: [],
};

interface PersonalProtectiveEquipmentProps {
  selectedJob: JobOption;
}

const PersonalProtectiveEquipment = (
  props: PersonalProtectiveEquipmentProps,
) => {
  const { selectedJob } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isScreenSm } = useBreakPoints();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const questionGroupsState = useAppSelector(selectQuestionGroups);
  const questionGroup =
    questionGroupsState.questionGroups[
      QUESTION_GROUP_TYPE.PERSONAL_PROTECTIVE_EQUIPMENTS
    ];

  const schema = Yup.object({
    questions: Yup.array().of(
      Yup.object({
        id: Yup.number(),
        answer: Yup.object({
          answer: Yup.array().of(
            Yup.string().required(t('validation:common.required')),
          ),
        }),
      }),
    ),
  });

  const form = useForm<PersonalProtectiveEquipmentForm>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema),
  });

  const questionsFieldArray = useFieldArray({
    control: form.control,
    name: 'questions',
    keyName: 'key',
  });

  const getQuestionGroup = () => {
    dispatch(
      getQuestionGroupRequest(
        QUESTION_GROUP_TYPE.PERSONAL_PROTECTIVE_EQUIPMENTS,
      ),
    );
  };

  const updateProgressStatus = (status: CANDIDATE_JOB_PROGRESS_STATUS) =>
    ProgressesService.updateProgress(
      CANDIDATE_JOB_PROGRESS_TYPE.PERSONAL_PROTECTIVE_EQUIPMENT,
      {
        progress: status,
      },
      selectedJob.id,
    );

  const handleOnSubmitFulfilled = () => {
    getQuestionGroup();
    dispatch(
      getProgressesRequest({
        jobId: selectedJob.id,
      }),
    );
    dispatch(
      setSuccessMessages([
        t<string>('registrationJourney:common.submit_success'),
      ]),
    );
  };

  const createPayload = (data: PersonalProtectiveEquipmentForm) => {
    const payload: AddAnswersRequest = {
      answers: [],
    };

    payload.answers = data.questions.map((question) => {
      return {
        question_id: question.id,
        answer: question.answer.answer,
      };
    });

    return payload;
  };

  const submitForm = (data: PersonalProtectiveEquipmentForm) => {
    setIsSubmitting(true);
    const payload = createPayload(data);

    QuestionGroupsService.addAnswers(
      QUESTION_GROUP_TYPE.PERSONAL_PROTECTIVE_EQUIPMENTS,
      payload,
    )
      .then(() => updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.COMPLETED))
      .then(handleOnSubmitFulfilled)
      .catch((error: unknown) => {
        dispatch(setErrorMessages([error]));
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleSaveProgress = () => {
    setIsSubmitting(true);
    const data = form.getValues();
    const payload = createPayload(data);

    QuestionGroupsService.addAnswers(
      QUESTION_GROUP_TYPE.PERSONAL_PROTECTIVE_EQUIPMENTS,
      payload,
    )
      .then(() =>
        updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.IN_PROGRESS),
      )
      .then(handleOnSubmitFulfilled)
      .catch((error: unknown) => {
        dispatch(setErrorMessages([error]));
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    getQuestionGroup();
  }, []);

  useEffect(() => {
    if (questionGroup) {
      form.reset({
        questions: questionGroup.questions.map((question) => {
          return {
            id: question.id,
            type: question.type,
            answer: {
              answer: question.answer ? question.answer.answer : [''],
            },
          };
        }),
      });
    }
  }, [questionGroup]);

  return (
    <>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <Box mb={8}>
          <Typography variant="subtitle1">
            {t<string>(
              'registrationJourney:personal_protective_equipment.header.title',
            )}
          </Typography>
          <Typography
            variant="subtitle2"
            color={CONTENT_COLOR}
            fontWeight={400}
          >
            {t<string>(
              'registrationJourney:personal_protective_equipment.header.subtitle',
            )}
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
        >
          {questionsFieldArray.fields.map((field, index) => {
            return (
              <QuestionField
                key={field.key}
                field={field}
                form={form}
                index={index}
              />
            );
          })}
        </Box>

        <Box
          mt={6}
          display="flex"
          justifyContent={isScreenSm ? 'flex-end' : 'space-between'}
          width="100%"
        >
          <Box mr={isScreenSm ? 3 : 0} width={isScreenSm ? 'auto' : '45%'}>
            <Button
              onClick={handleSaveProgress}
              variant="outlined"
              disabled={isSubmitting}
              style={{
                width: isScreenSm ? 'auto' : '100%',
              }}
            >
              {t<string>('registrationJourney:common.save_progress')}
            </Button>
          </Box>
          <Box width={isScreenSm ? 'auto' : '45%'}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              style={{
                width: isScreenSm ? 'auto' : '100%',
              }}
            >
              {t<string>('registrationJourney:common.submit')}
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default memo(PersonalProtectiveEquipment);
