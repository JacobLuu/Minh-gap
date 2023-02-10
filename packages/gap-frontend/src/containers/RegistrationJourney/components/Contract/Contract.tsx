import { ReactComponent as IconPdfFile } from 'gap-common/src/assets/images/icon_pdf_file.svg';
import {
  BORDER_COLOR,
  DISABLED_CONTENT_COLOR,
  PRIMARY_COLOR,
  SUCCESS_COLOR,
} from 'gap-common/src/themes/Colors';
import React, { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { FILE_STATUS_TYPE, FILE_TYPE } from '../../../../constants/enums';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import FileService from '../../../../services/FilesService';
import { useBreakPoints } from '../../../../utils/customHooks';
import { getMeFilesRequest, selectMeFilesSlice } from '../../reducers/meFiles';
import ContractAgreementModal from '../ContractAgreementModal';
import ContractSignatureModal from '../ContractSignatureModal';

interface ContractProps {
  fileId: number;
  isViewable: boolean;
  fileType: FILE_TYPE;
  isSignable?: boolean;
  selectedJobId: number;
  shouldHaveBorder?: boolean;
}

const Contract = (props: ContractProps) => {
  const { isScreenSm } = useBreakPoints();
  const dispatch = useAppDispatch();
  const [isContractAgreementModalOpen, setIsContractAgreementModalOpen] =
    useState(false);
  const [isContractSignatureModalOpen, setIsContractSignatureModalOpen] =
    useState(false);
  const {
    fileId,
    isViewable,
    fileType,
    isSignable,
    selectedJobId,
    shouldHaveBorder,
  } = props;
  const { t } = useTranslation();

  const { files } = useAppSelector(selectMeFilesSlice);

  const hasBeenSigned =
    files[fileType].files[0].status === FILE_STATUS_TYPE.STATUS_SIGNED;

  const isKeyInformationDocument =
    fileType === FILE_TYPE.TYPE_KEY_INFORMATION_DOCUMENT;

  const handleViewFile = () => {
    const { url } = files[fileType].files[0];
    if (url) {
      const pdfWindow = window.open();
      pdfWindow.location.href = url;

      if (!hasBeenSigned) {
        FileService.updateStatus(fileId, {
          status: FILE_STATUS_TYPE.STATUS_READ,
        }).then(() => {
          dispatch(getMeFilesRequest({ fileType, jobId: selectedJobId }));
          setIsContractAgreementModalOpen(false);
        });
      }
    }
  };

  const viewButtonBoxWidth = useMemo(() => {
    if (isScreenSm) return 'auto';
    if (!isScreenSm && isSignable) return '45%';
    if (!isScreenSm && !isSignable) return '100%';
  }, [isScreenSm, isSignable]);

  return (
    <>
      <Box
        display="flex"
        alignItems={isScreenSm ? 'center' : 'flex-start'}
        justifyContent="space-between"
        flexDirection={isScreenSm ? 'row' : 'column'}
      >
        <Box display="flex" alignItems="center">
          <IconPdfFile
            fill={isViewable ? PRIMARY_COLOR : DISABLED_CONTENT_COLOR}
          />
          <Typography ml={4} color={!isViewable && DISABLED_CONTENT_COLOR}>
            {t<string>(`registrationJourney:contracts.body.${fileType}`)}
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent={isScreenSm ? 'flex-end' : 'space-between'}
          width={isScreenSm ? 'auto' : '100%'}
          mt={isScreenSm ? 0 : 3}
        >
          <Box width={viewButtonBoxWidth}>
            <Button
              variant="outlined"
              disabled={!isViewable}
              onClick={() => {
                if (isKeyInformationDocument) {
                  setIsContractAgreementModalOpen(true);
                } else {
                  handleViewFile();
                }
              }}
              style={{
                width: isScreenSm ? 'auto' : '100%',
              }}
            >
              {t<string>('registrationJourney:contracts.body.view')}
            </Button>
          </Box>

          {isSignable && (
            <Box ml={isScreenSm ? 3 : 0} width={isScreenSm ? 'auto' : '45%'}>
              <Button
                variant="outlined"
                disabled={!isViewable}
                onClick={() => {
                  setIsContractAgreementModalOpen(true);
                }}
                style={{
                  width: isScreenSm ? 'auto' : '100%',
                }}
              >
                {t<string>('registrationJourney:contracts.body.sign')}
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {isViewable && isKeyInformationDocument && (
        <Typography mt={4} color={SUCCESS_COLOR} variant="subtitle2">
          {t<string>(
            `registrationJourney:contracts.body.${fileType}_confirmation`,
          )}
        </Typography>
      )}

      {hasBeenSigned && !isKeyInformationDocument && (
        <Typography mt={4} color={SUCCESS_COLOR} variant="subtitle2">
          {t<string>(`registrationJourney:contracts.body.${fileType}_signed`)}
        </Typography>
      )}

      {shouldHaveBorder && (
        <Box my={4} borderBottom={`1px dashed ${BORDER_COLOR}`} />
      )}

      <ContractAgreementModal
        isOpen={isContractAgreementModalOpen}
        handleClose={() => {
          setIsContractAgreementModalOpen(false);
        }}
        fileType={fileType}
        handleSign={() => {
          setIsContractAgreementModalOpen(false);
          setIsContractSignatureModalOpen(true);
        }}
        selectedJobId={selectedJobId}
      />

      {isSignable && (
        <ContractSignatureModal
          isOpen={isContractSignatureModalOpen}
          handleClose={() => {
            setIsContractSignatureModalOpen(false);
          }}
          fileId={fileId}
          fileType={fileType}
          selectedJobId={selectedJobId}
        />
      )}
    </>
  );
};

Contract.defaultProps = {
  isSignable: true,
  shouldHaveBorder: true,
};

export default memo(Contract);
