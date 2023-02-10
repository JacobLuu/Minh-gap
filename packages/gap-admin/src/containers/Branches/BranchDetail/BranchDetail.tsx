import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Typography } from '@mui/material';
import { ReactComponent as IconTrash } from 'gap-common/src/assets/images/icon_trash.svg';
import type { OptionsType } from 'gap-common/src/components/AutocompleteField';
import ControlAutocompleteField from 'gap-common/src/components/AutocompleteField';
import Dialog from 'gap-common/src/components/Dialog';
import InputField from 'gap-common/src/components/InputField';
import { BRANCH_TYPE } from 'gap-common/src/constants/enums';
import capitalize from 'lodash/capitalize';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import CLIENT_PATH from '../../../constants/clientPath';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { ERROR_COLOR } from '../../../themes/Colors';
import ContentLayout from '../../ContentLayout';
import { Wrapper } from '../styles';
import { getBranchesRequest, selectBranchesSlice } from '../reducer';
import {
  createBranchRequest,
  deleteBranchRequest,
  getBranchRequest,
  selectBranchSlice,
  updateBranchRequest,
} from './reducer';

export interface BranchForm {
  branchName: string;
  type: BRANCH_TYPE;
  branchId: string;
  parentBranch: string;
  parentBranchId: string;
  legalEntity: string;
  companyReg: string;
  email: string;
  contactNumber: number;
  address: string;
  manager: string;
  director: string;
  client: string;
  phoneNumberCountryCode: string;
}
const BranchDetail = () => {
  const { id }: { id: string } = useParams();
  const [branchId, setBranchId] = useState(id);
  const { branchesData } = useAppSelector(selectBranchesSlice);
  const branchList = branchesData?.branches?.map(
    (branches: { name: any }) => branches?.name,
  );
  const externalIdList = branchesData?.branches?.map(
    (branch: any) => branch?.external_id,
  );
  const dispatch = useAppDispatch();

  const { branchData, isUpdateDataStatus, isDeleteBranchStatus } =
    useAppSelector(selectBranchSlice);

  const breadCrumbs = [
    { path: CLIENT_PATH.BRANCHES, label: 'Branch Management' },
    {
      path: `${CLIENT_PATH.BRANCHES}/${id}`,
      label:
        `${CLIENT_PATH.BRANCHES}/${id}` !== CLIENT_PATH.BRANCHES_NEW
          ? branchData?.name
          : 'Add New Branch',
    },
  ];
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const contactNumber =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = Yup.object().shape({
    branchName: Yup.string().required(),
    type: Yup.string().required(),
    branchId: Yup.string().required(),
    parentBranch: Yup.string(),
    parentBranchId: Yup.string(),
    legalEntity: Yup.string().required(),
    companyReg: Yup.string().required(),
    email: Yup.string().email().required(),
    contactNumber: Yup.string().matches(
      contactNumber,
      'Contact number is not valid',
    ),
    address: Yup.string().required(),
    manager: Yup.string().notRequired(),
    director: Yup.string().notRequired(),
    client: Yup.string().notRequired(),
  });
  const parseNumber = branchData.external_id * 1;
  const isBranchIdInvalid = branchData?.id === parseNumber;

  const form = useForm<BranchForm>({
    mode: 'onChange',
    defaultValues: {
      branchName: branchData?.name,
      type: BRANCH_TYPE.BRANCH,
      branchId: branchData?.id,
      parentBranch: branchData?.parent_branch,
      parentBranchId: branchData?.external_id,
      legalEntity: branchData?.legal_entity,
      companyReg: branchData?.company_registration_number,
      email: branchData?.email,
      contactNumber: branchData?.phone_number,
      address: '',
      manager: branchData?.manager_name,
      director: branchData?.director_name,
      client: branchData?.client_name,
    },
    criteriaMode: 'all',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    form.reset({
      branchName: branchData?.name,
      type: branchData?.type,
      branchId: branchData?.id,
      parentBranch: branchData?.parent_branch?.external_id || '',
      parentBranchId: branchData?.external_id,
      legalEntity: branchData?.legal_entity,
      companyReg: branchData?.company_registration_number,
      email: branchData?.email,
      contactNumber: branchData?.phone_number,
      address: branchData?.name,
      manager: branchData?.manager_name || '',
      director: branchData?.director_name || '',
      client: branchData?.client_name || '',
    });
  }, [branchData]);

  useEffect(() => {
    if (!Number(id))
      form.reset({
        branchName: '',
        type: BRANCH_TYPE.BRANCH,
        branchId: '',
        parentBranch: '',
        parentBranchId: '',
        legalEntity: '',
        companyReg: '',
        email: '',
        contactNumber: null,
        address: '',
        manager: '',
        director: '',
        client: '',
      });
  }, [id]);

  const selectedBranchType = form.watch('type');
  const selectedBranch = form.watch('branchName');

  const branchTypes = [
    BRANCH_TYPE.BRANCH,
    BRANCH_TYPE.ON_SITE,
    BRANCH_TYPE.SUB_SITE,
  ];

  const typeOptions: OptionsType[] = branchTypes.map((branchType) => {
    return {
      label: capitalize(branchType),
      value: branchType,
    };
  });
  const branchOptions: OptionsType[] = branchList?.map((branch: string) => {
    return {
      label: capitalize(branch),
      value: branch,
    };
  });

  const submitForm = (data: BranchForm) => {
    if (Number(id))
      dispatch(
        updateBranchRequest({
          id: data.branchId,
          name: data.branchName,
          type: data.type,
          external_id: data.parentBranchId,
          legal_entity: data.legalEntity,
          company_registration_number: data.companyReg,
          email: data.email,
          address: data.address,
          phone_number: data.contactNumber,
          manager_name: data.manager,
          director_name: data.director,
          client_name: data.client,
          parent_branch: data.parentBranch,
        }),
      );
    else {
      dispatch(
        createBranchRequest({
          branch_id: data.branchId,
          name: data.branchName,
          type: data.type,
          parent_branch_id: data.parentBranchId,
          legal_entity: data.legalEntity,
          company_registration_number: data.companyReg,
          email: data.email,
          address: data.address,
          phone_number: data.contactNumber,
          manager_name: data.manager,
          director_name: data.director,
          client_name: data.client,
          parent_branch: data.parentBranch,
          external_id: data.parentBranchId,
          phone_number_country_code: data.phoneNumberCountryCode || 44,
        }),
      );
    }
    setBranchId(data.branchId);
  };

  const handleRemoveBranch = () => {
    dispatch(
      deleteBranchRequest({
        id: branchData?.id,
      }),
    );
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (Number(id)) dispatch(getBranchRequest({ id }));
  }, [id]);

  const history = useHistory();
  useEffect(() => {
    if (isUpdateDataStatus) {
      history.push(`${CLIENT_PATH.BRANCHES}/${branchId}`);
    }
  }, [isUpdateDataStatus]);

  useEffect(() => {
    if (isDeleteBranchStatus) {
      history.push(`${CLIENT_PATH.BRANCHES}`);
    }
  }, [isDeleteBranchStatus]);

  useEffect(() => {
    dispatch(
      getBranchesRequest({
        limit: 10000,
        direction: 'desc',
      }),
    );
  }, []);

  return (
    <ContentLayout
      headerTitle="Branch Management"
      breadCrumbs={breadCrumbs}
      scrollToTop
      flexDirection="row"
    >
      <Wrapper>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <Grid container columns={{ xs: 4, md: 12 }} spacing={4} mt="20px">
            <Grid item xs={12} md={4} mb={6}>
              <InputField
                label="Branch name"
                form={form}
                $hasAdornment
                name="branchName"
                required
              />
            </Grid>
            <Grid item xs={12} md={4} mb={6}>
              <Controller
                name="type"
                control={form.control}
                render={({ field }) => {
                  const error = !isBranchIdInvalid;
                  return (
                    <ControlAutocompleteField
                      fullWidth
                      label="Type"
                      required
                      options={typeOptions}
                      value={typeOptions.find(
                        (typeOption) => typeOption.value === selectedBranchType,
                      )}
                      onSelect={(branchType: OptionsType) => {
                        field.onChange(branchType.value);
                      }}
                      error={error}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={4} mb={6}>
              <Controller
                name="branchId"
                control={form.control}
                render={({ field }) => {
                  const error = externalIdList?.includes(field.value);
                  return (
                    <Box>
                      <InputField
                        label="Branch ID"
                        name="branchId"
                        form={form}
                        $hasAdornment
                        disabled={Number(branchId) === branchData?.id}
                        required
                        errors={error}
                      />
                      {error && (
                        <Typography variant="caption" color="text.error">
                          Branch ID can not be duplicated
                        </Typography>
                      )}
                    </Box>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid container columns={{ xs: 4, md: 12 }} spacing={4}>
            <Grid item xs={12} md={6} mb={6}>
              <Controller
                name="parentBranch"
                control={form.control}
                render={({ field }) => {
                  return (
                    <ControlAutocompleteField
                      fullWidth
                      label="Parent branch"
                      required
                      options={branchOptions}
                      value={branchOptions?.find(
                        (branchOptionType) =>
                          branchOptionType.value === selectedBranch,
                      )}
                      onSelect={(branchType: OptionsType) => {
                        field.onChange(branchType.value);
                      }}
                      disabled={selectedBranchType !== BRANCH_TYPE.SUB_SITE}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} mb={6}>
              <InputField
                form={form}
                label="Parent branch ID"
                $hasAdornment
                name="parentBranchId"
                required
                disabled
              />
            </Grid>
          </Grid>
          <Grid container columns={{ xs: 4, md: 12 }} spacing={4}>
            <Grid item xs={12} md={6} mb={6}>
              <InputField
                form={form}
                label="Legal entity"
                $hasAdornment
                name="legalEntity"
                required
              />
            </Grid>
            <Grid item xs={12} md={6} mb={6}>
              <InputField
                form={form}
                label="Company Reg"
                $hasAdornment
                name="companyReg"
                required
              />
            </Grid>
          </Grid>
          <Grid container columns={{ xs: 4, md: 12 }} spacing={4}>
            <Grid item xs={12} md={6} mb={6}>
              <InputField
                form={form}
                label="Email"
                $hasAdornment
                name="email"
                required
              />
            </Grid>
            <Grid item xs={12} md={6} mb={6}>
              <InputField
                form={form}
                label="Contact number"
                $hasAdornment
                name="contactNumber"
                required
              />
            </Grid>
          </Grid>
          <Grid container columns={{ xs: 4, md: 12 }} spacing={4}>
            <Grid item xs={12}>
              <InputField
                label="Address"
                form={form}
                $hasAdornment
                name="address"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <InputField
                label="Manager"
                form={form}
                $hasAdornment
                name="manager"
              />
            </Grid>

            <Grid item xs={12}>
              <InputField
                label="Director"
                form={form}
                $hasAdornment
                name="director"
              />
            </Grid>

            <Grid item xs={12}>
              <InputField
                label="Client"
                form={form}
                $hasAdornment
                name="client"
                disabled={selectedBranchType !== BRANCH_TYPE.ON_SITE}
              />
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="end" mt={12} mb={14}>
            <Button
              variant="outlined"
              style={{ marginRight: '10px' }}
              onClick={() => setIsDialogOpen(true)}
            >
              <Typography variant="body2" color={ERROR_COLOR} mr={1}>
                Delete this branch
              </Typography>
              <IconTrash fill={ERROR_COLOR} width="14px" />
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
          <Dialog
            title="Delete branch?"
            description="Are you sure you want to delete this branch? This branch information will be permanently deleted."
            isOpenDialog={isDialogOpen}
            isContentAlignCenter
            maxWidth="475px"
          >
            <Box display="flex" justifyContent="center">
              <Button
                onClick={handleCancel}
                variant="outlined"
                style={{ marginRight: '10px' }}
                autoFocus
              >
                Cancel
              </Button>
              <Button
                onClick={handleRemoveBranch}
                variant="contained"
                autoFocus
              >
                Yes
              </Button>
            </Box>
          </Dialog>
        </form>
      </Wrapper>
    </ContentLayout>
  );
};

export default BranchDetail;
