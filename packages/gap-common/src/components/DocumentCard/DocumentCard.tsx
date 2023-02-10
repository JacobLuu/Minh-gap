import React from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FILE_TYPE, FILE_STATUS } from 'gap-common/src/constants/enums';
import { Container, EllipsisText } from './styles';

interface DocumentCardProps {
  buttonText?: string;
  type: string;
  documentName: string;
  handleClick?: () => void;
  handleOpenMenu?: () => void;
  iconEye?: JSX.Element;
  iconMore?: JSX.Element;
  iconPdf: JSX.Element;
  updateAt?: string;
  fileUrl?: string;
  status?: string;
}

const DocumentCard = (props: DocumentCardProps) => {
  const {
    buttonText,
    type,
    documentName,
    status,
    fileUrl,
    updateAt,
    handleOpenMenu,
    handleClick,
    iconPdf,
    iconMore,
    iconEye,
  } = props;

  const getDocumentName = () => {
    let documentTitle = '';
    switch (type) {
      case FILE_TYPE.KEY_INFORMATION_DOCUMENT:
        documentTitle = 'Key Information Document: ';
        break;
      case FILE_TYPE.MEDICAL_CONTRACT:
        documentTitle = 'Extended Medical Questionnaire: ';
        break;
      case FILE_TYPE.WORK_CONTRACT:
        documentTitle = 'Contract for Services & Terms of Engagement: ';
        break;
      case FILE_TYPE.RIGHT_TO_WORK:
        documentTitle = 'Right to work: ';
        break;
      case FILE_TYPE.BANK_PROOF:
        documentTitle = 'Bank Details: ';
        break;
      case FILE_TYPE.CV:
        documentTitle = 'CV: ';
        break;
      case FILE_TYPE.ADDRESS_PROOF:
        documentTitle = 'Address Details: ';
        break;
      case FILE_TYPE.PASSPORT_CHECK_RESULT_REPORT:
        documentTitle = 'Passport: ';
        break;
      default:
        return null;
    }
    return documentTitle.concat(documentName);
  };

  const getFileStatus = () => {
    if (documentName === FILE_TYPE.KEY_INFORMATION_DOCUMENT) {
      if (status === FILE_STATUS.READ) {
        return {
          status: 'Read by the candidate',
          textColor: 'text.success',
        };
      }
    }

    switch (status) {
      case FILE_STATUS.UPLOADED:
        return {
          status: 'Not sent',
          textColor: 'text.error',
        };
      case FILE_STATUS.RELEASED:
        return {
          status: 'Sent',
          textColor: 'text.success',
        };
      case FILE_STATUS.READ:
        return {
          status: 'Awaiting Signature',
          textColor: 'text.warning',
        };
      case FILE_STATUS.SIGNED:
        return {
          status: 'Signed',
          textColor: 'text.success',
        };
      default:
        return null;
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        px={5}
        paddingTop="15px"
        paddingBottom="10px"
      >
        <Box sx={{ width: '85%' }} display="flex" mr={5}>
          {iconPdf}
          <Box
            ml={3}
            display="flex"
            alignItems="center"
            sx={{
              width: '85%',
              overflow: iconMore && status !== FILE_STATUS.RELEASED && 'hidden',
            }}
          >
            {updateAt ? (
              <Box sx={{ width: '100%' }}>
                <EllipsisText>{getDocumentName()}</EllipsisText>
                <EllipsisText variant="subtitle2">
                  Last updated on {moment.unix(updateAt).format('DD/MM/YYYY')}
                </EllipsisText>
              </Box>
            ) : (
              <EllipsisText>{getDocumentName()}</EllipsisText>
            )}
          </Box>
        </Box>
        {iconMore && status !== FILE_STATUS.RELEASED && (
          <Box width="40px">
            <Button onClick={handleOpenMenu}>{iconMore}</Button>
          </Box>
        )}
      </Box>
      {status && (
        <Box display="flex" justifyContent="space-between" px={5} my={2}>
          <Typography variant="subtitle2">Status</Typography>
          <Typography display="flex" alignItems="center" variant="subtitle2">
            <Typography
              component="span"
              className="dot"
              mr={3}
              color={getFileStatus()?.textColor}
            />
            <Typography
              variant="label"
              color={getFileStatus()?.textColor}
              component="span"
            >
              {getFileStatus()?.status}
            </Typography>
          </Typography>
        </Box>
      )}
      <Box mb={4} mx={5} onClick={handleClick} height="60px">
        {buttonText && (
          <Button
            href={fileUrl}
            target="_blank"
            variant="outlined"
            color="primary"
            fullWidth
          >
            <Box component="span" mr={2} mt={1.5}>
              {iconEye}
            </Box>
            {buttonText}
          </Button>
        )}
      </Box>
    </Container>
  );
};

DocumentCard.defaultProps = {
  buttonText: '',
  iconEye: null,
  iconMore: null,
  updateAt: '',
  handleOpenMenu: () => {},
  handleClick: () => {},
  status: '',
  fileUrl: '',
};

export default DocumentCard;
