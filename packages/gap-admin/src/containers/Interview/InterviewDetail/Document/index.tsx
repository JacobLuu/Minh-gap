import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Grid, MenuItem, Menu } from '@mui/material';
import DocumentCard from 'gap-common/src/components/DocumentCard';
import { FILE_STATUS, FILE_TYPE } from 'gap-common/src/constants/enums';
import { ReactComponent as IconEye } from 'gap-common/src/assets/images/icon_eye.svg';
import { ReactComponent as IconPdf } from 'gap-common/src/assets/images/icon_pdf_file.svg';
import { ReactComponent as IconMore } from 'gap-common/src/assets/images/icon_more.svg';
import { ReactComponent as IconTrash } from 'gap-common/src/assets/images/icon_trash.svg';
import { ReactComponent as IconArrowDown } from 'gap-common/src/assets/images/icon_arrow_down.svg';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import DocumentDialog from './DocumentDialog';
import { REQUEST_STATUS } from '../../../../constants/common';
import {
  updateDocumentStatusRequest,
  getFilesDocumentWithJobRequest,
  getFilesDocumentRequest,
  deleteFilesDocumentRequest,
  selectInterviewDetailStore,
  clearDocumentsState,
} from '../reducer';
import {
  BAR_TABLE,
  ERROR_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
  BLACK_COLOR,
} from '../../../../themes/Colors';

const Document = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [documentDetail, setDocumentDetail] = useState(null);
  const [anchorElAppliedJob, setAnchorElAppliedJob] =
    React.useState<null | HTMLElement>(null);
  const [appliedJobValue, setAppliedJobValue] = React.useState(null);
  const [appliedJobTitle, setAppliedJobTitle] = React.useState('');
  const [isDocumentDialogOpen, setDocumentDialogOpen] = useState(false);
  const isOpenRevoked = Boolean(anchorEl);
  const isOpenAppliedJob = Boolean(anchorElAppliedJob);
  const dispatch = useAppDispatch();
  const {
    interviewDetailData,
    documentsContracts,
    getFilesDocumentStatus,
    filesDocuments,
  } = useAppSelector(selectInterviewDetailStore);

  const { id } = useParams();
  const job = interviewDetailData?.jobs?.[0];
  const handleOpenAction = (e) => {
    setDocumentDetail({
      candidate_id: interviewDetailData?.id,
      job_id: e?.jobId,
      document_id: e?.documentId,
    });
    setAnchorEl(e.action.currentTarget);
  };
  const handleCloseDocument = () => {
    setDocumentDetail(null);
    setAnchorEl(null);
  };
  const handleDeleteDocument = () => {
    dispatch(deleteFilesDocumentRequest(documentDetail));
    handleCloseDocument();
  };

  const handleUploadDocumentDialog = () => {
    setDocumentDialogOpen(!isDocumentDialogOpen);
  };

  const handleCloseDocumentDialog = () => {
    setAnchorElAppliedJob(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAppliedJob(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectedAppliedJob = (data) => {
    setAppliedJobValue(data?.id);
    setAppliedJobTitle(`${data?.id} - ${data?.title} - ${job?.branch_name}`);
    handleClose();
    handleCloseDocumentDialog();
  };

  const handleReleaseDocument = () => {
    dispatch(clearDocumentsState());

    dispatch(
      updateDocumentStatusRequest({
        candidate_id: interviewDetailData?.id,
        job_id: appliedJobValue || job?.id,
        status: FILE_STATUS.RELEASED,
      }),
    );
  };

  const getFileUrl = (document) => {
    const type = document?.type;
    if (
      type === FILE_TYPE.WORK_CONTRACT ||
      type === FILE_TYPE.MEDICAL_CONTRACT
    ) {
      return document?.converted_file_url;
    }
    return document?.url;
  };

  useEffect(() => {
    if (interviewDetailData?.jobs?.length > 0) {
      dispatch(clearDocumentsState());
      dispatch(
        getFilesDocumentWithJobRequest({
          candidate_id: interviewDetailData?.id,
          job_id: appliedJobValue || job?.id,
          type: FILE_TYPE.KEY_INFORMATION_DOCUMENT,
        }),
      );
      dispatch(
        getFilesDocumentWithJobRequest({
          candidate_id: interviewDetailData?.id,
          job_id: appliedJobValue || job?.id,
          type: FILE_TYPE.WORK_CONTRACT,
        }),
      );
      dispatch(
        getFilesDocumentWithJobRequest({
          candidate_id: interviewDetailData?.id,
          job_id: appliedJobValue || job?.id,
          type: FILE_TYPE.MEDICAL_CONTRACT,
        }),
      );
    }
  }, [interviewDetailData, id, appliedJobValue]);

  useEffect(() => {
    if (Object.keys(interviewDetailData)?.length) {
      dispatch(
        getFilesDocumentRequest({
          candidate_id: interviewDetailData?.id,
          type: FILE_TYPE.RIGHT_TO_WORK,
        }),
      );
      dispatch(
        getFilesDocumentRequest({
          candidate_id: interviewDetailData?.id,
          type: FILE_TYPE.BANK_PROOF,
        }),
      );
      dispatch(
        getFilesDocumentRequest({
          candidate_id: interviewDetailData?.id,
          type: FILE_TYPE.CV,
        }),
      );
      dispatch(
        getFilesDocumentRequest({
          candidate_id: interviewDetailData?.id,
          type: FILE_TYPE.ADDRESS_PROOF,
        }),
      );
      dispatch(
        getFilesDocumentRequest({
          candidate_id: interviewDetailData?.id,
          type: FILE_TYPE.PASSPORT_CHECK_RESULT_REPORT,
        }),
      );
    }
  }, [interviewDetailData, id]);

  useEffect(() => {
    return () => {
      dispatch(clearDocumentsState());
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{ backgroundColor: WHITE_COLOR }}
      borderRadius="8px"
    >
      <Box p={5}>
        <Typography variant="subtitle1">Document</Typography>
      </Box>
      <Box
        style={{ backgroundColor: BAR_TABLE }}
        py={3}
        px={5}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography variant="body2">Documents & Contracts</Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            style={{ marginRight: '8px' }}
            onClick={handleUploadDocumentDialog}
            disabled={
              getFilesDocumentStatus === REQUEST_STATUS.REQUESTING ||
              (documentsContracts?.files?.length >= 3 &&
                documentsContracts?.files?.[0]?.status === FILE_STATUS.RELEASED)
            }
          >
            Upload documents
          </Button>
          <Button
            variant="outlined"
            disabled={
              getFilesDocumentStatus === REQUEST_STATUS.REQUESTING ||
              documentsContracts?.files?.[0]?.status === FILE_STATUS.RELEASED ||
              documentsContracts?.files?.length < 3
            }
            onClick={handleReleaseDocument}
          >
            Release Documents
          </Button>
        </Box>
      </Box>

      <Box px={4} pt={4} mb={4}>
        <Typography
          component="span"
          variant="body2"
          sx={{ display: 'inline-flex', cursor: 'pointer' }}
          ml={1}
          onClick={handleClick}
        >
          {appliedJobTitle ||
            `${job?.id} - ${job?.title} - ${job?.branch_name}`}
          <IconArrowDown
            style={{
              marginLeft: '12px',
              transform: isOpenAppliedJob ? 'rotate(-180deg)' : 'rotate(0deg)',
            }}
            fill={BLACK_COLOR}
          />
        </Typography>
      </Box>

      <Box key={documentsContracts?.job?.id}>
        <Grid container spacing={4} px={4} pb={4}>
          {(documentsContracts?.files || []).map((document) => (
            <Grid key={document?.id} item xs={12} sm={12} md={4} lg={4}>
              <DocumentCard
                buttonText="View details"
                type={document?.type}
                documentName={document?.original_file_name}
                updateAt={document?.uploaded_at}
                status={document?.status}
                fileUrl={getFileUrl(document)}
                iconPdf={<IconPdf fill={PRIMARY_COLOR} />}
                iconMore={<IconMore />}
                iconEye={<IconEye fill={PRIMARY_COLOR} />}
                handleOpenMenu={(event) =>
                  handleOpenAction({
                    action: event,
                    documentId: document?.id,
                    jobId: documentsContracts?.job?.id,
                  })
                }
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box style={{ backgroundColor: BAR_TABLE }} p={5}>
        <Typography variant="body2">Documents Provided by Candidate</Typography>
      </Box>

      <Grid container spacing={4} p={4}>
        {filesDocuments.map((document) => (
          <Grid key={document?.id} item xs={12} sm={12} md={4} lg={4}>
            <DocumentCard
              buttonText="View details"
              fileUrl={getFileUrl(document)}
              type={document.type}
              documentName={document.original_file_name}
              iconPdf={<IconPdf fill={PRIMARY_COLOR} />}
              iconEye={<IconEye fill={PRIMARY_COLOR} />}
            />
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={isOpenRevoked}
        id="menu"
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleDeleteDocument}>
          <Box display="flex">
            <Typography variant="subtitle1" color="text.error" mx={2}>
              Delete
            </Typography>
            <IconTrash fill={ERROR_COLOR} />
          </Box>
        </MenuItem>
      </Menu>

      <DocumentDialog
        isDocumentDialogOpen={isDocumentDialogOpen}
        handleOnclick={handleUploadDocumentDialog}
        appliedJobValue={appliedJobValue || job?.id}
        interviewDetailData={interviewDetailData}
        documentData={documentsContracts}
      />

      <Menu
        anchorEl={anchorElAppliedJob}
        open={isOpenAppliedJob}
        onClose={handleCloseDocumentDialog}
      >
        {interviewDetailData?.jobs?.map((item) => (
          <MenuItem
            key={item?.id}
            onClick={() => handleSelectedAppliedJob(item)}
          >
            {item?.title}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Document;
