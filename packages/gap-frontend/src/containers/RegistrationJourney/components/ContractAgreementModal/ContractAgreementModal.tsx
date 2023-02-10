import CheckBox from 'gap-common/src/components/CheckBox';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import type { IOptionCheckBox as CheckBoxOption } from 'gap-common/src/components/CheckBox';

import { PRIMARY_COLOR } from 'gap-common/src/themes/Colors';
import logoImg from '../../../../assets/images/logo.svg';
import { FILE_STATUS_TYPE, FILE_TYPE } from '../../../../constants/enums';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getMeFilesRequest, selectMeFilesSlice } from '../../reducers/meFiles';
import FileService from '../../../../services/FilesService';

interface ContractAgreementForm {
  hasReadContract: CheckBoxOption[];
}

export type { ContractAgreementForm };

interface ContractAgreementModalProps {
  isOpen: boolean;
  handleClose: () => void;
  fileType: FILE_TYPE;
  handleSign: () => void;
  selectedJobId: number;
}

const ContractAgreementModal = (props: ContractAgreementModalProps) => {
  const { isOpen, handleClose, fileType, handleSign, selectedJobId } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { files } = useAppSelector(selectMeFilesSlice);

  const DEFAULT_FORM_VALUES: ContractAgreementForm = {
    hasReadContract: [],
  };

  const schema = Yup.object().shape({
    hasReadContract: Yup.array()
      .of(Yup.string())
      .required(t('validation:common.required')),
  });

  const form = useForm<ContractAgreementForm>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  const hasReadContract = form.watch('hasReadContract').length === 1;

  const isKeyInformationDocument =
    fileType === FILE_TYPE.TYPE_KEY_INFORMATION_DOCUMENT;

  const handleConfirm = () => {
    if (isKeyInformationDocument) {
      const { url, id } = files[fileType].files[0];
      if (url) {
        const pdfWindow = window.open();
        pdfWindow.location.href = url;

        FileService.updateStatus(id, {
          status: FILE_STATUS_TYPE.STATUS_READ,
        }).then(() => {
          dispatch(getMeFilesRequest({ fileType, jobId: selectedJobId }));
          handleClose();
        });
      }
    } else {
      handleSign();
    }
  };

  const options = [
    {
      option: t<string>(
        `registrationJourney:contracts.body.${fileType}_confirmation`,
      ),
      value: t<string>(
        `registrationJourney:contracts.body.${fileType}_confirmation`,
      ),
    },
  ];

  useEffect(() => {
    return () => {
      if (!isOpen) form.reset(DEFAULT_FORM_VALUES);
    };
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        style: { borderRadius: 20, padding: '32px 20px', width: 369 },
      }}
    >
      <form>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box mb={6}>
            <img src={logoImg} width="200px" alt="logo" data-test="logo" />
          </Box>
          <Typography variant="h4" color={PRIMARY_COLOR} mb={3}>
            {t<string>(`registrationJourney:contracts.body.${fileType}`)}
          </Typography>

          <Typography variant="subtitle2">
            {t<string>(
              `registrationJourney:contracts.modal.content.${fileType}`,
            )}
          </Typography>

          <Box my={5}>
            {/* FIXME: This doesnt work as expected with $multiOption={false} */}
            <CheckBox
              form={form}
              row
              options={options}
              name="hasReadContract"
              $multiOption={false}
            />
          </Box>

          <Box display="flex" justifyContent="center">
            <Box mr={3}>
              <Button variant="outlined" onClick={handleClose}>
                {t<string>('registrationJourney:common.close')}
              </Button>
            </Box>
            <Button
              variant="contained"
              disabled={!hasReadContract}
              onClick={handleConfirm}
            >
              {isKeyInformationDocument
                ? t<string>('registrationJourney:common.confirm_and_open')
                : t<string>('registrationJourney:common.confirm_and_sign')}
            </Button>
          </Box>
        </Box>
      </form>
    </Dialog>
  );
};

export default React.memo(ContractAgreementModal);
