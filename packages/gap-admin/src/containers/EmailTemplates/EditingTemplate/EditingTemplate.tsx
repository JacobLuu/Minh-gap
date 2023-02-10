import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Dialog from 'gap-common/src/components/Dialog';
import InputField from 'gap-common/src/components/InputField';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import TextareaAutoSize from '../../../components/TextareaAutoSize';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import ContentLayout from '../../ContentLayout';
import CLIENT_PATH from '../../../constants/clientPath';
import {
  emailTemplateRequest,
  selectEmailTemplateSlice,
  updateEmailTemplateRequest,
} from './reducer';
import { WHITE_COLOR, PRIMARY_COLOR } from '../../../themes/Colors';
import { Wrapper } from '../styles';

export interface EditingTemplateForm {
  id: number;
  templateName: string;
  templateContent: string;
}

const EditingTemplate = () => {
  const { emailTemplate } = useAppSelector(selectEmailTemplateSlice);
  const breadCrumbs = [
    { path: CLIENT_PATH.EMAIL_TEMPLATES, label: 'Email Template' },
    {
      path: CLIENT_PATH.EMAIL_TEMPLATES,
      label: emailTemplate?.name,
    },
  ];
  const { id }: { id: string } = useParams();
  const dispatch = useAppDispatch();

  const form = useForm<EditingTemplateForm>({
    mode: 'onChange',
    defaultValues: {
      id: emailTemplate?.id,
      templateName: emailTemplate?.name,
      templateContent: emailTemplate?.content,
    },
  });

  useEffect(() => {
    form.reset({
      id: emailTemplate?.id,
      templateName: emailTemplate?.name,
      templateContent: emailTemplate?.content,
    });
  }, [emailTemplate]);

  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const submitForm = (data: EditingTemplateForm) => {
    dispatch(
      updateEmailTemplateRequest({
        id: id,
        name: data.templateName,
        content: data.templateContent,
      }),
    );
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = (data: EditingTemplateForm) => {
    dispatch(
      updateEmailTemplateRequest({
        id: id,
        name: data.templateName,
        content: data.templateContent,
      }),
    );
    setIsDialogOpen(false);
  };

  useEffect(() => {
    dispatch(emailTemplateRequest({ id }));
  }, [id]);

  return (
    <form noValidate onSubmit={form.handleSubmit(submitForm)}>
      <ContentLayout
        headerTitle="Email Template"
        breadCrumbs={breadCrumbs}
        scrollToTop
        flexDirection="row"
        action={
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variant="outlined"
              style={{ background: WHITE_COLOR, marginRight: '10px' }}
              onClick={() => setIsDialogOpen(true)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outlined"
              style={{
                color: WHITE_COLOR,
                background: PRIMARY_COLOR,
                borderRadius: '8px',
              }}
            >
              Save changes
            </Button>
          </Box>
        }
      >
        <Wrapper>
          <Typography mt={5} mb={3} variant="subtitle2">
            Template name <span style={{ color: 'red' }}>*</span>
          </Typography>
          <InputField form={form} $hasAdornment name="templateName" disabled />

          <TextareaAutoSize
            style={{
              width: '100%',
              marginTop: '12px',
            }}
            defaultValue={emailTemplate?.content || ''}
            form={form}
            name="templateContent"
            multiline
            minRows={15}
          />

          <Dialog
            title="Unsaved changes"
            description="You unsaved changes. Do you want to save now ?"
            isOpenDialog={isDialogOpen}
            isContentAlignCenter
            maxWidth="330px"
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
              <Button onClick={handleSubmit} variant="contained" autoFocus>
                Yes
              </Button>
            </Box>
          </Dialog>
        </Wrapper>
      </ContentLayout>
    </form>
  );
};

export default EditingTemplate;
