import { ReactComponent as IconEye } from 'gap-common/src/assets/images/icon_eye.svg';
import { ReactComponent as IconPicture } from 'gap-common/src/assets/images/icon_picture.svg';
import { ReactComponent as IconTrash } from 'gap-common/src/assets/images/icon_trash.svg';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { BYTES_TO_MB_RATIO } from '../../constants/file';
import { setErrorMessages } from '../../containers/Global/reducer';
import { useAppDispatch } from '../../redux/hooks';
import { PRIMARY_COLOR, WHITE_COLOR } from '../../themes/Colors';
import { EllipsisText } from './styles';

import type { GAPFile } from '../../types/models';

function isGAPFile(file: File | GAPFile): file is GAPFile {
  return (file as GAPFile).id !== undefined;
}

interface PhotoRowProps {
  file: File | GAPFile;
  handleDeletePhoto: () => void;
}

export const PhotoRow = (props: PhotoRowProps) => {
  const { file, handleDeletePhoto } = props;
  const { t } = useTranslation();

  const handleViewFile = () => {
    if (isGAPFile(file)) {
      const pdfWindow = window.open();
      pdfWindow.location.href = file.url;
    }
  };

  const handleClickDelete = () => {
    handleDeletePhoto();
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      my={2}
    >
      <Box display="flex" width="50%" alignItems="center">
        <Box height={44} width={44}>
          <IconPicture height={44} width={44} fill={PRIMARY_COLOR} />
        </Box>
        <EllipsisText ml={2}>
          {isGAPFile(file) && file.original_file_name}
          {!isGAPFile(file) && file.name}
        </EllipsisText>
      </Box>

      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        width="50%"
      >
        {isGAPFile(file) && (
          <Box ml={3}>
            <Button
              variant="outlined"
              onClick={handleViewFile}
              endIcon={<IconEye fill={PRIMARY_COLOR} />}
            >
              {t<string>('registrationJourney:common.view_file')}
            </Button>
          </Box>
        )}
        <Box ml={3}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClickDelete}
            endIcon={<IconTrash />}
          >
            {t<string>('registrationJourney:common.delete_file')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

interface PhotoTakerProps {
  form: UseFormReturn<any, any>;
  name: string;
  maxSize: number;
  handleDeletePhoto?: () => void;
}

const PhotoTaker = (props: PhotoTakerProps) => {
  const { form, name, handleDeletePhoto, maxSize } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <>
      <Box
        border={`1px dashed ${PRIMARY_COLOR}`}
        borderRadius={4}
        px={4}
        py={4}
        sx={{
          background: `linear-gradient(154.29deg, ${WHITE_COLOR} 11.99%, rgba(168, 91, 194, 0.2) 107.48%);`,
        }}
        width="100%"
      >
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box mb={2}>
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCameraIcon />}
            >
              {t<string>('photo.take')}
              <input
                hidden
                accept="image/*"
                type="file"
                capture="environment"
                {...form.register(name)}
                onChange={(event) => {
                  const files = Array.from(event.target.files);
                  for (let i = 0; i < files.length; i += 1) {
                    if (files[i].size > maxSize * BYTES_TO_MB_RATIO) {
                      dispatch(
                        setErrorMessages([
                          t<string>('validation:common.file.max_size'),
                        ]),
                      );
                      return;
                    }
                  }
                  form.setValue(name, files);
                }}
              />
            </Button>
          </Box>

          <Box>
            <Typography variant="caption">
              {t<string>('photo.max_size')} {maxSize} MB
            </Typography>
          </Box>
        </Box>
      </Box>

      <Typography color="text.error" fontWeight={400} fontSize={13} mt={3}>
        {form.getFieldState(name).error?.message}
      </Typography>

      <Box mt={5}>
        {form.watch(name)?.map((photo: File & { id?: number }) => {
          return (
            <PhotoRow
              key={photo?.id || photo.name}
              file={photo}
              handleDeletePhoto={handleDeletePhoto}
            />
          );
        })}
      </Box>
    </>
  );
};

PhotoTaker.defaultProps = {
  handleDeletePhoto: () => {},
};

export default PhotoTaker;
