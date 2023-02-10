import 'react-image-lightbox/style.css';

import { ReactComponent as Eye } from 'gap-common/src/assets/images/icon_eye.svg';
import { ReactComponent as Flag } from 'gap-common/src/assets/images/icon_flag.svg';
import { ReactComponent as PdfFile } from 'gap-common/src/assets/images/icon_pdf_file.svg';
import { ReactComponent as Trash } from 'gap-common/src/assets/images/icon_trash.svg';
import AutocompleteField from 'gap-common/src/components/AutocompleteField';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';

import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import {
  FILE_TYPE,
  JOURNEY_TYPE,
} from '../../../../../../gap-common/src/constants/enums';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import {
  BAR_TABLE,
  CONTENT_COLOR,
  ERROR_COLOR,
  INACTIVE_COLOR,
  PRIMARY_COLOR,
  SUCCESS_COLOR,
  WHITE_COLOR,
  BLACK_COLOR,
} from '../../../../themes/Colors';
import ImageMatchDialog from '../ImageMatchDialog';

import {
  selectInterviewDetailStore,
  getFilesDocumentRequest,
} from '../reducer';
import { Image, ImageContainer, MenuCircle } from './style';

const interviewImagesData = [
  {
    url: 'https://picsum.photos/200/300',
    id: 1,
  },
  {
    url: 'https://picsum.photos/200/300',
    id: 2,
  },
];

const statusOption = [
  {
    label: 'Further Action required',
    value: 1,
  },
  {
    label: 'More information required',
    value: 2,
  },
  {
    label: 'Escalate Further',
    value: 3,
  },
];
// currently using mock data, will be replaced when integrate API
const RightToWorkProofs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessImageMatchDialogOpen, setIsSuccessImageMatchDialogOpen] =
    useState(false);
  const [isUnsuccessImageMatchDialogOpen, setIsUnsuccessImageMatchDialogOpen] =
    useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElMenu);

  const { interviewDetailData } = useAppSelector(selectInterviewDetailStore);
  const dispatch = useAppDispatch();
  const journeyType = interviewDetailData.journey_type;

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    imageIndex,
  ) => {
    setAnchorElMenu(event.currentTarget);
    setPhotoIndex(imageIndex);
  };

  const handleClose = () => {
    setAnchorElMenu(null);
  };

  const handleConfirmIdentityCheck = () => {
    setIsSuccessImageMatchDialogOpen(true);
  };

  useEffect(() => {
    const candidateId = interviewDetailData.id;
    if (candidateId) {
      dispatch(
        getFilesDocumentRequest({
          candidate_id: candidateId,
          type: FILE_TYPE.RIGHT_TO_WORK,
        }),
      );
    }
  }, [interviewDetailData.id]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{ backgroundColor: WHITE_COLOR }}
      borderRadius="8px"
    >
      <Box
        p={5}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="center">
          <Typography mr={2} variant="subtitle1">
            Right to Work
          </Typography>
          <Flag width={20} height={20} fill={INACTIVE_COLOR} />
        </Box>

        <Stack direction="row" spacing={4}>
          <AutocompleteField
            sx={{ width: '120px' }}
            options={statusOption}
            defaultValue="Status"
          />
          <Button variant="outlined" color="success">
            Approve
          </Button>
          <Button variant="outlined" color="error">
            Reject
          </Button>
        </Stack>
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
          <Typography variant="body2">Right To Work Information</Typography>
        </Box>
      </Box>

      <Grid container mx={5} my={5}>
        <Grid item sm={12}>
          <Box mb={2}>
            <Typography variant="label" color="text.content">
              Right to Work Journey
            </Typography>
          </Box>

          <Typography variant="subtitle2" color={BLACK_COLOR} fontWeight={500}>
            {journeyType === JOURNEY_TYPE.SHARE_CODE && 'Share code'}
            {journeyType === JOURNEY_TYPE.PASSPORT && 'British/Irish Passport'}
            {journeyType === JOURNEY_TYPE.OTHERS && 'Other'}
          </Typography>
        </Grid>
      </Grid>

      <Box
        px={5}
        py={3}
        style={{ backgroundColor: BAR_TABLE }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body2">Interview Images (2/3 Images)</Typography>
        <Stack direction="row" spacing={4}>
          <Button
            variant="outlined"
            color="success"
            onClick={handleConfirmIdentityCheck}
          >
            Confirm Initial Identity Check
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleConfirmIdentityCheck}
          >
            Reject Identify
          </Button>
        </Stack>
      </Box>
      <Box px={5} py={3}>
        {interviewImagesData?.map((item, index) => (
          <ImageContainer key={item?.id}>
            <MenuCircle onClick={(e) => handleClick(e, index)} />
            <Image src={item?.url} />
          </ImageContainer>
        ))}
      </Box>

      <Box
        px={5}
        py={3}
        style={{ backgroundColor: BAR_TABLE }}
        display="flex"
        alignItems="center"
      >
        <Typography
          variant="body2"
          sx={{ borderRight: '2px solid currentColor' }}
          pr={3}
          mr={3}
        >
          Right To Work Documents
        </Typography>
        <Typography variant="body2">Request document</Typography>
      </Box>

      <Grid container px={5} py={4}>
        <Grid item sm={12} md={4}>
          <Box mb={2}>
            <Typography variant="label" color="text.content">
              File name
            </Typography>
          </Box>
        </Grid>

        <Grid item sm={12} md={4}>
          <Box mb={2}>
            <Typography variant="label" color="text.content">
              Uploaded
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={12} md={4}>
          <Box textAlign="right" mb={2}>
            <Typography variant="label" color="text.content">
              Action
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container px={5} pb={5}>
        <Grid item sm={12} md={4} xl={4}>
          <Box display="flex" alignItems="flex-start">
            <PdfFile fill={PRIMARY_COLOR} />
            <Box ml={3}>
              <Typography variant="subtitle2">Velen-RTW-proof.pdf</Typography>
              <Typography variant="caption" color="text.content">
                12.4 Mb
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item sm={12} md={4} xl={4}>
          <Typography variant="subtitle2">
            {moment().format('DD/MM/YYYY HH:mm')}
          </Typography>
        </Grid>

        <Grid item textAlign="right" sm={12} md={4} xl={4}>
          <Button variant="outlined" color="success" sx={{ mr: 4 }}>
            Approve
          </Button>
          <Button variant="outlined" color="error" sx={{ mr: 4 }}>
            Reject
          </Button>
          <Button variant="outlined" color="primary">
            View file
          </Button>
        </Grid>
      </Grid>

      <Menu anchorEl={anchorElMenu} open={isMenuOpen} onClose={handleClose}>
        <MenuItem
          sx={{ color: 'text.content' }}
          onClick={() => {
            setIsOpen(true);
            handleClose();
          }}
        >
          <Box display="flex" alignItems="center" color="primary">
            <Typography variant="optionText">View image</Typography>
            <Box display="flex" alignItems="center" ml={2}>
              <Eye fill={CONTENT_COLOR} />
            </Box>
          </Box>
        </MenuItem>

        <MenuItem
          sx={{ color: 'text.error' }}
          onClick={() => {
            handleClose();
          }}
        >
          <Box display="flex" alignItems="center" color="primary">
            <Typography variant="optionText">Delete image</Typography>
            <Box display="flex" alignItems="center" ml={2}>
              <Trash />
            </Box>
          </Box>
        </MenuItem>
      </Menu>

      <ImageMatchDialog
        description={
          <Typography
            variant="subtitle2"
            color={CONTENT_COLOR}
            textAlign="center"
          >
            Well done, our systems show that the two images are an&nbsp;
            <Typography component="span" color={SUCCESS_COLOR}>
              95%
            </Typography>
            &nbsp;match. Remember to upload their interview image to complete
            the image matching process of RTW.
          </Typography>
        }
        title={
          <Typography variant="h4" color={SUCCESS_COLOR}>
            Successful image match
          </Typography>
        }
        isOpen={isSuccessImageMatchDialogOpen}
        handleClose={() => setIsSuccessImageMatchDialogOpen(false)}
      />

      <ImageMatchDialog
        description={
          <Typography
            variant="subtitle2"
            color={CONTENT_COLOR}
            textAlign="center"
          >
            On this occasion the system is showing a lower match than you feel
            there may be. We&apos;ve matched this image at&nbsp;
            <Typography component="span" color={ERROR_COLOR}>
              10%
            </Typography>
          </Typography>
        }
        title={
          <Typography variant="h4" color={ERROR_COLOR}>
            Unsuccessful image match
          </Typography>
        }
        isOpen={isUnsuccessImageMatchDialogOpen}
        handleClose={() => setIsUnsuccessImageMatchDialogOpen(false)}
      />

      {isOpen && (
        <Lightbox
          mainSrc={interviewImagesData[photoIndex].url}
          nextSrc={
            interviewImagesData[(photoIndex + 1) % interviewImagesData.length]
              .url
          }
          prevSrc={
            interviewImagesData[
              (photoIndex + interviewImagesData.length - 1) %
                interviewImagesData.length
            ].url
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + interviewImagesData.length - 1) %
                interviewImagesData.length,
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % interviewImagesData.length)
          }
        />
      )}
    </Box>
  );
};

export default RightToWorkProofs;
