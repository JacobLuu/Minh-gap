import Dropzone from 'gap-common/src/components/Dropzone';
import SignaturePad from 'gap-common/src/components/SignaturePad';
import { CONTENT_COLOR } from 'gap-common/src/themes/Colors';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import SignatureCanvas from 'react-signature-canvas';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import { FILE_STATUS_TYPE, FILE_TYPE } from '../../../../constants/enums';
import { useAppDispatch } from '../../../../redux/hooks';
import FileService from '../../../../services/FilesService';
import MeService from '../../../../services/MeService';
import { useSelectedTab } from '../../../../utils/customHooks';
import { convertDataURLtoPngFile } from '../../../../utils/miscellaneous';
import { setErrorMessages, setSuccessMessages } from '../../../Global/reducer';
import { getMeFilesRequest } from '../../reducers/meFiles';

import type { GAPFile } from '../../../../types/models';

enum SignatureTab {
  DRAW = 'draw',
  UPLOAD = 'upload',
}

type FormFile = GAPFile & { name: string; isDeleted?: boolean };

function isFormFile(file: File | FormFile): file is FormFile {
  return (file as FormFile).id !== undefined;
}

export interface ContractSignatureModalForm {
  files: (File | FormFile)[];
}

interface ContractSignatureModalProps {
  isOpen: boolean;
  handleClose: () => void;
  fileId: number;
  fileType: FILE_TYPE;
  selectedJobId: number;
}

const DEFAULT_FORM_VALUES: ContractSignatureModalForm = {
  files: [],
};

const ContractSignatureModal = (props: ContractSignatureModalProps) => {
  const { isOpen, handleClose, fileId, fileType, selectedJobId } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { selectedTab, handleChangeTab } = useSelectedTab(SignatureTab.DRAW);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signaturePadRef: React.MutableRefObject<SignatureCanvas> = useRef(null);

  const schema = Yup.object().shape({
    files: Yup.array().min(1, t('validation:common.required')),
  });

  const form = useForm<ContractSignatureModalForm>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  const handleDeleteFormFile = (deletedFile: File | FormFile) => {
    const files = form.getValues('files');
    if (isFormFile(deletedFile)) {
      const formFiles = files.map((file) => {
        if (isFormFile(file)) {
          return {
            ...file,
            isDeleted: file.isDeleted || file.id === deletedFile.id,
          };
        }
        return file;
      });
      form.setValue('files', formFiles);
    } else {
      const formFiles = files.filter((file: File | FormFile) => {
        if (
          !isFormFile(file) &&
          file.size === deletedFile.size &&
          file.name === deletedFile.name
        )
          return false;
        return true;
      });
      form.setValue('files', formFiles);
    }
  };

  const updateFileStatus = () => {
    return FileService.updateStatus(fileId, {
      status: FILE_STATUS_TYPE.STATUS_SIGNED,
    });
  };

  const signFile = (formData: FormData) => {
    setIsSubmitting(true);
    MeService.signFile(fileId, formData, selectedJobId)
      .then(updateFileStatus)
      .then(() => {
        dispatch(getMeFilesRequest({ fileType, jobId: selectedJobId }));
      })
      .then(() => {
        dispatch(
          setSuccessMessages([
            t<string>('registrationJourney:common.sign_success'),
          ]),
        );
      })
      .catch((error: unknown) => {
        dispatch(setErrorMessages([error]));
      })
      .finally(() => {
        setIsSubmitting(false);
        handleClose();
      });
  };

  const submitForm = (data: ContractSignatureModalForm) => {
    if (!isFormFile(data.files[0])) {
      const formData = new FormData();
      formData.set('file', data.files[0]);
      signFile(formData);
    }
  };

  const handleSubmitDrawnSignature = () => {
    if (signaturePadRef.current?.isEmpty()) {
      dispatch(
        setErrorMessages([
          t<string>('registrationJourney:common.signature_empty'),
        ]),
      );
    } else {
      const dataURL = signaturePadRef.current
        .getTrimmedCanvas()
        .toDataURL('image/svg+xml');
      const blob = convertDataURLtoPngFile(dataURL);
      const formData = new FormData();
      formData.set('file', blob);
      signFile(formData);
    }
  };

  useEffect(() => {
    return () => {
      if (isOpen) {
        handleChangeTab(null, SignatureTab.DRAW);
        form.reset(DEFAULT_FORM_VALUES);
      }
    };
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        style: { borderRadius: 20, padding: '32px 20px', width: 740 },
      }}
    >
      <form onSubmit={form.handleSubmit(submitForm)}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" mb={3} alignSelf="flex-start">
            {t<string>(
              'registrationJourney:contracts.signature_modal.header.title',
            )}
          </Typography>

          <Box alignSelf="flex-start" width="100%">
            <TabContext value={selectedTab}>
              <TabList onChange={handleChangeTab}>
                <Tab
                  value={SignatureTab.DRAW}
                  label={t<string>(
                    'registrationJourney:contracts.signature_modal.header.draw',
                  )}
                />
                <Tab
                  value={SignatureTab.UPLOAD}
                  label={t<string>(
                    'registrationJourney:contracts.signature_modal.header.upload',
                  )}
                />
              </TabList>
              <TabPanel value={SignatureTab.DRAW}>
                <SignaturePad
                  signaturePadRef={signaturePadRef}
                  width={560}
                  height={266}
                />
                <Typography
                  variant="subtitle2"
                  mt={5}
                  mb={8}
                  color={CONTENT_COLOR}
                >
                  {t<string>(
                    'registrationJourney:contracts.signature_modal.body.title',
                  )}
                </Typography>
              </TabPanel>
              <TabPanel value={SignatureTab.UPLOAD}>
                <Box mb={6}>
                  <Dropzone
                    form={form}
                    name="files"
                    maxSize={2}
                    fileFormats={['png']}
                    agreementText={t<string>(
                      'registrationJourney:contracts.signature_modal.body.title',
                    )}
                    handleDeleteFile={handleDeleteFormFile}
                  />
                </Box>
              </TabPanel>
            </TabContext>
          </Box>

          <Box display="flex" justifyContent="space-between" width="100%">
            <Box mr={3}>
              <Button
                variant="outlined"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                {t<string>(
                  'registrationJourney:contracts.signature_modal.actions.cancel',
                )}
              </Button>
            </Box>
            <Button
              type={selectedTab === SignatureTab.DRAW ? 'button' : 'submit'}
              variant="contained"
              onClick={
                selectedTab === SignatureTab.DRAW
                  ? handleSubmitDrawnSignature
                  : null
              }
              disabled={isSubmitting}
            >
              {t<string>(
                'registrationJourney:contracts.signature_modal.actions.accept',
              )}
            </Button>
          </Box>
        </Box>
      </form>
    </Dialog>
  );
};

export default React.memo(ContractSignatureModal);
