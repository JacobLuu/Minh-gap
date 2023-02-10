import { ReactComponent as IconEye } from 'gap-common/src/assets/images/icon_eye.svg';
import { ReactComponent as IconPdfFile } from 'gap-common/src/assets/images/icon_pdf_file.svg';
import { ReactComponent as IconTrash } from 'gap-common/src/assets/images/icon_trash.svg';
import { ReactComponent as IconUploadFile } from 'gap-common/src/assets/images/icon_upload_file.svg';
import { BYTES_TO_MB_RATIO } from 'gap-frontend/src/constants/file';
import React from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { Controller, UseFormReturn } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { GAPFile } from 'gap-frontend/src/types/models';

import { CONTENT_COLOR, PRIMARY_COLOR, WHITE_COLOR } from '../../themes/Colors';
import { EllipsisText } from './styles';

type FormFile = GAPFile & { name: string; isDeleted?: boolean };

function isFormFile(file: File | FormFile): file is FormFile {
  return (file as FormFile).id !== undefined;
}

interface FileRowProps {
  file: File | FormFile;
  handleDeleteFile: (file: File | FormFile) => void;
}

const FileRow = (props: FileRowProps) => {
  const { file, handleDeleteFile } = props;

  const handleViewFile = () => {
    if (isFormFile(file)) {
      const pdfWindow = window.open();
      pdfWindow.location.href = file.url;
    }
  };

  const handleClickDelete = () => {
    handleDeleteFile(file);
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
          <IconPdfFile height={44} width={44} fill={PRIMARY_COLOR} />
        </Box>
        <EllipsisText ml={2}>{file?.name}</EllipsisText>
      </Box>

      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        width="50%"
      >
        {isFormFile(file) && (
          <Box ml={3}>
            <Button
              variant="outlined"
              onClick={handleViewFile}
              endIcon={<IconEye fill={PRIMARY_COLOR} />}
            >
              View file
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
            Delete file
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

type FileFormat = 'png' | 'pdf' | 'svg';

interface DropzoneProps {
  form: UseFormReturn<any, any>;
  name: string;
  maxSize: number;
  fileFormats: FileFormat[];
  maxFiles?: number;
  agreementText?: string;
  handleDeleteFile?: (file: Blob | FormFile) => void;
  handleOnDropRejected?: (fileRejections: FileRejection[]) => void;
}

const Dropzone = (props: DropzoneProps) => {
  const {
    name,
    form,
    maxSize,
    fileFormats,
    maxFiles,
    agreementText,
    handleDeleteFile,
    handleOnDropRejected,
  } = props;

  const acceptedFormats = fileFormats
    .map((fileFormat) => {
      if (fileFormat === 'png') return { 'image/png': ['.png'] };
      if (fileFormat === 'pdf') return { 'application/pdf': ['.pdf'] };
      if (fileFormat === 'svg') return { 'image/svg+xml': ['.svg'] };
      return {};
    })
    .reduce((prevValue, currentValue) => {
      return Object.assign(prevValue, currentValue);
    });

  const onDropAccepted = (files: File[]) => {
    const formFiles: (File | FormFile)[] = form.getValues(name);
    const visibleFiles: (File | FormFile)[] = (files as (File | FormFile)[])
      .concat(formFiles)
      .filter((file) => {
        if (isFormFile(file)) return !file.isDeleted;
        return true;
      });

    if (visibleFiles.length <= maxFiles)
      form.setValue(name, (files as (File | FormFile)[]).concat(formFiles), {
        shouldValidate: true,
      });
  };

  const onDropRejected = (fileRejections: FileRejection[]) => {
    handleOnDropRejected(fileRejections);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedFormats,
    maxSize: maxSize * BYTES_TO_MB_RATIO,
    maxFiles,
    onDropAccepted,
    onDropRejected,
  });

  const files = form.watch(name).filter((file: File | FormFile) => {
    if (isFormFile(file) && file.isDeleted) return false;
    return true;
  });

  return (
    <Controller
      name="files"
      control={form.control}
      render={({ fieldState }) => {
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
            >
              <Box {...getRootProps()}>
                <input {...getInputProps()} />
                <Box display="flex" alignItems="center" flexDirection="column">
                  <Box>
                    <IconUploadFile fill={PRIMARY_COLOR} />
                  </Box>
                  <Box mb={2}>
                    <Typography variant="subtitle2" color={PRIMARY_COLOR}>
                      Drag or drop your files here
                    </Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography variant="caption">or</Typography>
                  </Box>
                  <Box mb={2}>
                    <Button variant="contained">
                      Browse files from your computer
                      <input
                        hidden
                        accept={fileFormats
                          .map((format) => `.${format}`)
                          .join(',')}
                        type="file"
                      />
                    </Button>
                  </Box>
                  <Box mb={2}>
                    <Typography variant="caption">
                      Supported files format: {fileFormats.join(', ')}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption">
                      Maximum file size: {maxSize} MB
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Typography
              color="text.error"
              fontWeight={400}
              fontSize={13}
              mt={3}
            >
              {fieldState.error?.message}
            </Typography>

            {agreementText && (
              <Box mt={5}>
                <Typography
                  variant="subtitle2"
                  color={CONTENT_COLOR}
                  fontWeight={400}
                >
                  {agreementText}
                </Typography>
              </Box>
            )}

            {files.length > 0 && (
              <Box mt={6} mb={5}>
                <Typography
                  variant="caption"
                  color={CONTENT_COLOR}
                  fontWeight={400}
                >
                  {`Uploaded files (${files.length}/${maxFiles})`}
                </Typography>
              </Box>
            )}

            {files.map((file: File & { id?: number }) => {
              return (
                <FileRow
                  file={file}
                  key={file?.id || file.name}
                  handleDeleteFile={handleDeleteFile}
                />
              );
            })}
          </>
        );
      }}
    />
  );
};

Dropzone.defaultProps = {
  maxFiles: 1,
  agreementText: '',
  handleDeleteFile: () => {},
  handleOnDropRejected: () => {},
};

export default Dropzone;
