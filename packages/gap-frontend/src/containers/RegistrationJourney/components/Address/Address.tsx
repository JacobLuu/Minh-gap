import axios, { AxiosResponse } from 'axios';
import Dropzone from 'gap-common/src/components/Dropzone';
import InputField from 'gap-common/src/components/InputField';
import { CONTENT_COLOR } from 'gap-common/src/themes/Colors';
import debounce from 'lodash.debounce';
import React, { memo, useEffect, useState } from 'react';
import { ErrorCode, FileRejection } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import type { MessageParams } from 'yup/lib/types';

import checkedIcon from '../../../../assets/images/icon_checked.svg';
import uncheckedIcon from '../../../../assets/images/icon_unchecked.svg';
import { DEFAULT_INPUT_FIELD_MAX_CHARACTERS } from '../../../../constants/common';
import {
  CANDIDATE_JOB_PROGRESS_STATUS,
  CANDIDATE_JOB_PROGRESS_TYPE,
  FILE_TYPE,
} from '../../../../constants/enums';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import AddressesService from '../../../../services/AddressesService';
import FilesService from '../../../../services/FilesService';
import MeService from '../../../../services/MeService';
import ProgressesService from '../../../../services/ProgressesService';
import { useBreakPoints } from '../../../../utils/customHooks';
import { setErrorMessages, setSuccessMessages } from '../../../Global/reducer';
import { getAddressRequest, selectAddressSlice } from '../../reducers/address';
import {
  appendLoqateAddress,
  resetLoqateAddresses,
  searchAddressesFail,
  selectLoqateAddresses,
} from '../../reducers/loqateAddresses';
import {
  getAddressRequest as getMeAddressRequest,
  selectMeAddressSlice,
} from '../../reducers/meAddress';
import { getMeFilesRequest, selectMeFilesSlice } from '../../reducers/meFiles';
import { getProgressesRequest } from '../../reducers/progresses';

import type { FilesResponse } from '../../../../types/Responses';

import type { GAPFile } from '../../../../types/models';
import type { JobOption } from '../../RegistrationJourney';

type FormFile = GAPFile & { name: string; isDeleted?: boolean };

type OptionType = {
  value: string;
  label: string;
};

const LOQATE_ADDRESS_SEPARATOR = new RegExp(/<SEPARATOR>.*/);

function isFormFile(file: Blob | FormFile): file is FormFile {
  return (file as FormFile).id !== undefined;
}

export interface AddressForm {
  postcode: string;
  city: string;
  county: string;
  houseNumber: string;
  files: (File | FormFile)[];
}

const DEFAULT_FORM_VALUES: AddressForm = {
  postcode: '',
  city: '',
  county: '',
  houseNumber: '',
  files: [],
};

interface AddressProps {
  selectedJob: JobOption;
}

const Address = (props: AddressProps) => {
  const { selectedJob } = props;
  const { t } = useTranslation();
  const { isScreenSm } = useBreakPoints();
  const { addresses: loqateAddresses } = useAppSelector(selectLoqateAddresses);
  const [searchAddress, setSearchAddress] = useState('');
  const loqateAddressOptions: OptionType[] = loqateAddresses.map(
    (loqateAddress) => {
      return {
        label: loqateAddress.text,
        value: loqateAddress.key,
      };
    },
  );

  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const [shouldInputManually, setShouldInputManually] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { address: meAddress } = useAppSelector(selectMeAddressSlice);
  const { address } = useAppSelector(selectAddressSlice);
  const { files } = useAppSelector(selectMeFilesSlice);

  const addressFile: FilesResponse = files[FILE_TYPE.TYPE_ADDRESS_PROOF];

  const toggleInputManually = () =>
    setShouldInputManually((prevState) => !prevState);

  const handleOnSelectLoqateAddress = (loqateAddress: OptionType) => {
    if (loqateAddress)
      dispatch(
        getAddressRequest({
          key: loqateAddress.value.replace(LOQATE_ADDRESS_SEPARATOR, ''),
        }),
      );
  };

  const showMaxCharactersMessage = (
    params: {
      max: number;
    } & MessageParams,
  ) =>
    t('validation:common.max_characters', {
      max: params.max,
    });

  const schema = Yup.object().shape({
    city: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    county: Yup.string().max(
      DEFAULT_INPUT_FIELD_MAX_CHARACTERS,
      showMaxCharactersMessage,
    ),
    postcode: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    houseNumber: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    files: Yup.array().test({
      name: 'files',
      message: t('validation:common.required'),
      test: (value: (File | FormFile)[]) => {
        const files = value.filter((file: File | FormFile) => {
          if (isFormFile(file) && file.isDeleted) return false;
          return true;
        });

        return files.length > 0;
      },
    }),
  });

  const form = useForm<AddressForm>({
    mode: 'onChange',
    defaultValues: DEFAULT_FORM_VALUES,
    criteriaMode: 'all',
    resolver: yupResolver(schema),
  });

  const handleOnDropRejected = (fileRejections: FileRejection[]) => {
    for (let i = 0; i < fileRejections.length; i += 1) {
      for (let j = 0; j < fileRejections[i].errors.length; j += 1) {
        const error = fileRejections[i].errors[j];
        if (error.code === ErrorCode.FileTooLarge) {
          dispatch(
            setErrorMessages([t<string>('validation:common.file.max_size')]),
          );
        }
      }
    }
  };

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

  const updateMeAddress = (data: AddressForm) => {
    return MeService.updateAddress({
      town_city: data.city,
      county: data.county,
      postcode: data.postcode,
      house_name_number_and_street_name: data.houseNumber,
    });
  };

  const updateProgressStatus = (status: CANDIDATE_JOB_PROGRESS_STATUS) =>
    ProgressesService.updateProgress(
      CANDIDATE_JOB_PROGRESS_TYPE.ADDRESS_DETAILS,
      {
        progress: status,
      },
      selectedJob.id,
    );

  const handleOnSubmitFulfilled = () => {
    dispatch(
      getMeFilesRequest({
        fileType: FILE_TYPE.TYPE_ADDRESS_PROOF,
        jobId: selectedJob.id,
      }),
    );
    dispatch(getMeAddressRequest());
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

  const handleUploadFiles = (data: AddressForm) => {
    if (data.files.length > 0 && !isFormFile(data.files[0])) {
      return Promise.all(
        data.files.map((file) => {
          if (!isFormFile(file)) {
            const formData = new FormData();
            formData.set('file', file);
            return MeService.uploadFile(
              FILE_TYPE.TYPE_ADDRESS_PROOF,
              formData,
              selectedJob.id,
            );
          }
          return null;
        }),
      );
    }
    return Promise.resolve(null);
  };

  const handleDeleteFiles = (data: AddressForm) => {
    const deletedFiles: (File | FormFile)[] = data.files.filter(
      (file: File | FormFile) => {
        if (isFormFile(file) && file.isDeleted) return true;
        return false;
      },
    );

    if (deletedFiles.length > 0) {
      return Promise.all(
        deletedFiles.map((file: FormFile) =>
          FilesService.deleteFile(file.id, selectedJob.id),
        ),
      );
    }

    return Promise.resolve(null);
  };

  const submitForm = (data: AddressForm) => {
    setOnSubmitLoading(true);

    handleDeleteFiles(data)
      .then(() => handleUploadFiles(data))
      .then(() => updateMeAddress(data))
      .then(() => updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.COMPLETED))
      .then(handleOnSubmitFulfilled)
      .catch((error: unknown) => {
        dispatch(setErrorMessages([error]));
      })
      .finally(() => {
        setOnSubmitLoading(false);
      });
  };

  const handleSaveProgress = () => {
    setOnSubmitLoading(true);
    const data = form.getValues();

    handleDeleteFiles(data)
      .then(() => handleUploadFiles(data))
      .then(() => updateMeAddress(data))
      .then(() =>
        updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.IN_PROGRESS),
      )
      .then(handleOnSubmitFulfilled)
      .catch((error: unknown) => {
        dispatch(setErrorMessages([error]));
      })
      .finally(() => {
        setOnSubmitLoading(false);
      });
  };

  const getLoqateAddresses = (key: string) => {
    AddressesService.searchAddresses(key)
      .then((response) => {
        const { addresses: loqateAddresses } = response.data;
        for (let i = 0; i < loqateAddresses.length; i += 1) {
          if (loqateAddresses[i].key.includes('Container')) {
            const loqateAddressKeyPrefix = `${searchAddress}<SEPARATOR>`;
            const loqateAddressKey = loqateAddresses[i].key.replace(
              LOQATE_ADDRESS_SEPARATOR,
              '',
            );
            getLoqateAddresses(loqateAddressKeyPrefix + loqateAddressKey);
          } else {
            dispatch(appendLoqateAddress(loqateAddresses[i]));
          }
        }
      })
      .catch((error: unknown) => {
        dispatch(
          searchAddressesFail(
            axios.isAxiosError(error)
              ? error.response
              : ({ data: error } as AxiosResponse<any>),
          ),
        );
        setErrorMessages([error]);
      });
  };

  const debouncedGetLoqateAddresses = React.useCallback(
    debounce(getLoqateAddresses, 1000),
    [],
  );

  const handleInputChange = (value: string) => {
    setSearchAddress(value);

    if (value.length === 0) {
      dispatch(resetLoqateAddresses());
    } else {
      debouncedGetLoqateAddresses(value);
    }
  };

  useEffect(() => {
    dispatch(getMeAddressRequest());
    dispatch(
      getMeFilesRequest({
        fileType: FILE_TYPE.TYPE_ADDRESS_PROOF,
        jobId: selectedJob.id,
      }),
    );
  }, []);

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      city: address.town_city,
      county: address.county,
      houseNumber: address.house_name_number_and_street_name,
      postcode: address.postcode,
    });
  }, [address]);

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      postcode: meAddress?.postcode || DEFAULT_FORM_VALUES.postcode,
      city: meAddress?.town_city || DEFAULT_FORM_VALUES.city,
      county: meAddress?.county || DEFAULT_FORM_VALUES.county,
      houseNumber:
        meAddress?.house_name_number_and_street_name ||
        DEFAULT_FORM_VALUES.houseNumber,
    });
  }, [meAddress]);

  useEffect(() => {
    if (addressFile?.files.length > 0) {
      form.reset({
        ...form.getValues(),
        files: addressFile.files.map((file) => {
          return { ...file, name: file.original_file_name };
        }),
      });
    }
  }, [addressFile]);

  return (
    <>
      <form noValidate onSubmit={form.handleSubmit(submitForm)}>
        <Box mb={2}>
          <Typography variant="subtitle1">
            {t<string>('registrationJourney:address_details.header.title')}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          mb={10}
        >
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid container spacing={{ xs: 2 }}>
              <Grid item xs={12} md={12}>
                <Autocomplete
                  freeSolo
                  inputValue={searchAddress}
                  onInputChange={(_event, value) => {
                    handleInputChange(value);
                  }}
                  onChange={(_event, value: OptionType) =>
                    handleOnSelectLoqateAddress(value)
                  }
                  options={loqateAddressOptions}
                  getOptionLabel={(option) => {
                    if (typeof option !== 'string') return option.label;
                    return '';
                  }}
                  renderInput={(params: any) => {
                    const label = t<string>(
                      'registrationJourney:address_details.header.subtitle',
                    );
                    return (
                      <>
                        {label && (
                          <Box pb={2}>
                            <Typography color="text.content" variant="caption">
                              {label}
                            </Typography>
                          </Box>
                        )}
                        <TextField
                          {...params}
                          placeholder={t<string>(
                            'registrationJourney:address_details.header.subtitle_placeholder',
                          )}
                          required
                        />
                      </>
                    );
                  }}
                  disabled={shouldInputManually}
                />
              </Grid>

              <Grid item xs={12} md={8} mb={2} color={CONTENT_COLOR}>
                <Stack direction="row" alignItems="center">
                  <Checkbox
                    id="checkbox_toggle_manual_input"
                    checkedIcon={
                      <Avatar
                        src={checkedIcon}
                        variant="rounded"
                        sx={{ width: 20, height: 20 }}
                      />
                    }
                    icon={
                      <Avatar
                        src={uncheckedIcon}
                        variant="rounded"
                        sx={{ width: 20, height: 20 }}
                      />
                    }
                    onChange={toggleInputManually}
                  />
                  <Typography variant="body2">
                    {t<string>(
                      'registrationJourney:address_details.body.enable_manual_input',
                    )}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={12} mb={6}>
                <InputField
                  name="houseNumber"
                  label={t<string>(
                    'registrationJourney:address_details.body.house_number',
                  )}
                  placeholder={t<string>(
                    'registrationJourney:address_details.body.house_number_placeholder',
                  )}
                  form={form}
                  required
                  disabled={!shouldInputManually}
                />
              </Grid>

              <Grid item xs={12} md={6} mb={6}>
                <InputField
                  required
                  name="city"
                  label={t<string>(
                    'registrationJourney:address_details.body.town_city',
                  )}
                  placeholder={t<string>(
                    'registrationJourney:address_details.body.town_city_placeholder',
                  )}
                  form={form}
                  disabled={!shouldInputManually}
                />
              </Grid>

              <Grid item xs={12} md={6} mb={6}>
                <InputField
                  name="county"
                  label={t<string>(
                    'registrationJourney:address_details.body.county',
                  )}
                  placeholder={t<string>(
                    'registrationJourney:address_details.body.county_placeholder',
                  )}
                  form={form}
                  disabled={!shouldInputManually}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <InputField
                  required
                  name="postcode"
                  label={t<string>(
                    'registrationJourney:address_details.body.postcode',
                  )}
                  placeholder={t<string>(
                    'registrationJourney:address_details.body.postcode_placeholder',
                  )}
                  form={form}
                  disabled={!shouldInputManually}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={12} md={12} mb={10}>
              <Typography variant="subtitle1" mb={1}>
                {t<string>(
                  'registrationJourney:address_details.file_header.title',
                )}
              </Typography>
              <Typography
                variant="subtitle2"
                color={CONTENT_COLOR}
                fontWeight={400}
              >
                {t<string>(
                  'registrationJourney:address_details.file_header.subtitle',
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} mb={4}>
              <Dropzone
                form={form}
                name="files"
                maxSize={10}
                maxFiles={5}
                fileFormats={['pdf']}
                handleDeleteFile={handleDeleteFormFile}
                handleOnDropRejected={handleOnDropRejected}
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
        >
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={12} md={6} />
            <Grid item xs={12} md={6} alignItems="flex-end">
              <Box
                mt={6}
                display="flex"
                justifyContent={isScreenSm ? 'flex-end' : 'space-between'}
                width="100%"
              >
                <Box
                  mr={isScreenSm ? 3 : 0}
                  width={isScreenSm ? 'auto' : '45%'}
                >
                  <Button
                    onClick={handleSaveProgress}
                    variant="outlined"
                    disabled={onSubmitLoading}
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
                    disabled={onSubmitLoading}
                    style={{
                      width: isScreenSm ? 'auto' : '100%',
                    }}
                  >
                    {t<string>('registrationJourney:common.submit')}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default memo(Address);
