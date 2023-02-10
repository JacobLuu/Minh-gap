import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from 'gap-common/src/components/Dialog';
import UploadFile from 'gap-common/src/components/UploadFile';
import { FILE_TYPE } from 'gap-common/src/constants/enums';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../../../redux/hooks';
import { postFilesDocumentRequest } from '../reducer';

const DocumentDialog = ({
  isDocumentDialogOpen,
  interviewDetailData,
  appliedJobValue,
  documentData,
  handleOnclick,
}) => {
  const dispatch = useAppDispatch();
  const schema = Yup.object().shape({
    key_information_document: Yup.mixed().nullable(),
    work_contract: Yup.mixed().nullable(),
    medical_contract: Yup.mixed().nullable(),
  });
  const form = useForm<any>({
    defaultValues: {
      key_information_document: {},
      work_contract: {},
      medical_contract: {},
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (data) => {
    const isKeyInformationDocumentTouched = form.getFieldState(
      FILE_TYPE.KEY_INFORMATION_DOCUMENT,
      form.formState,
    ).isTouched;
    const isWorkContractTouched = form.getFieldState(
      FILE_TYPE.WORK_CONTRACT,
      form.formState,
    ).isTouched;
    const isMedicalContractTouched = form.getFieldState(
      FILE_TYPE.MEDICAL_CONTRACT,
      form.formState,
    ).isTouched;

    if (isKeyInformationDocumentTouched) {
      dispatch(
        postFilesDocumentRequest({
          candidate_id: interviewDetailData?.id,
          job_id: appliedJobValue,
          type: FILE_TYPE.KEY_INFORMATION_DOCUMENT,
          file: data?.key_information_document,
        }),
      );
    }

    if (isWorkContractTouched) {
      dispatch(
        postFilesDocumentRequest({
          candidate_id: interviewDetailData?.id,
          job_id: appliedJobValue,
          type: FILE_TYPE.WORK_CONTRACT,
          file: data?.work_contract,
        }),
      );
    }

    if (isMedicalContractTouched) {
      dispatch(
        postFilesDocumentRequest({
          candidate_id: interviewDetailData?.id,
          job_id: appliedJobValue,
          type: FILE_TYPE.MEDICAL_CONTRACT,
          file: data?.medical_contract,
        }),
      );
    }

    handleOnclick();
  };

  useEffect(() => {
    const documents = {};
    documentData?.files?.forEach((file) => {
      documents[file.type] = new File([file?.url], file?.original_file_name, {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
    });

    form.reset(documents);
  }, [documentData]);

  return (
    <Dialog
      maxWidth="642px"
      isOpenDialog={isDocumentDialogOpen}
      title="Upload documents"
      handleCloseDialog={handleOnclick}
    >
      <form noValidate onSubmit={form.handleSubmit(handleSubmit)}>
        <Box mt={6} mb={5}>
          <Typography>Upload files</Typography>
        </Box>

        <Box mt={6} mb={3}>
          <Typography>Key Information Document</Typography>
        </Box>
        <UploadFile form={form} name="key_information_document" />

        <Box mb={3}>
          <Typography>Contract for Services & Terms of Engagement</Typography>
        </Box>
        <UploadFile form={form} name="work_contract" />

        <Box mb={3}>
          <Typography>Extended Medical Questionnaire</Typography>
        </Box>
        <UploadFile form={form} name="medical_contract" />

        <Stack direction="row" justifyContent="center" spacing={4}>
          <Button variant="outlined" onClick={handleOnclick}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Upload
          </Button>
        </Stack>
      </form>
    </Dialog>
  );
};

export default DocumentDialog;
