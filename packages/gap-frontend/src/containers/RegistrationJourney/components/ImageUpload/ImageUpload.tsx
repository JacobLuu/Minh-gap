import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CONTENT_COLOR } from 'gap-common/src/themes/Colors';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const ImageUpload = () => {
  const { t } = useTranslation();

  return (
    <Box py={3}>
      <Box
        mb={8}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle1">
            {t<string>(
              'registrationJourney:personal_details.image_upload.title',
            )}
          </Typography>
          <Typography
            variant="subtitle2"
            color={CONTENT_COLOR}
            fontWeight={400}
          >
            {t<string>(
              'registrationJourney:personal_details.image_upload.subtitle',
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(ImageUpload);
