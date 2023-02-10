import React, { useState } from 'react';
import { Box, TableCell, TableRow, Button, Avatar } from '@mui/material';
import { getShortcutName } from 'gap-common/src/utils/customHooks';
import { Link } from 'react-router-dom';
import JobTitle from '../../components/JobTitle';
import AdvertResponsesTableRowDetail from './AdvertResponsesTableRowDetail';
import AdvertResponsesDialog from './AdvertResponsesDialog';
import CLIENT_PATH from '../../constants/clientPath';
import { BACKGROUND_COLUMN_RIGHT_COLOR } from '../../themes/Colors';

import { Text } from './styles';

const AdvertResponsesTable = ({ data }) => {
  const [isJobListOpen, setisJobListOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  const handleViewJobDetail = () => {
    setisJobListOpen(!isJobListOpen);
  };

  const handleClickOnAvatar = () => {
    setIsUserInfoOpen(!isUserInfoOpen);
  };

  return (
    <>
      <TableRow sx={{ height: '70px' }} key={data?.id}>
        <TableCell>
          <Box sx={{ width: '250px' }} display="flex" alignItems="center">
            <Avatar
              sx={{ width: 40, height: 40, cursor: 'pointer' }}
              src={data?.profile_image_url}
              {...getShortcutName(data?.first_name)}
              onClick={handleClickOnAvatar}
            />
            <Text sx={{ paddingLeft: '20px' }}>
              {data?.first_name} {data?.last_name}
            </Text>
          </Box>
        </TableCell>
        <TableCell>
          <Text textTransform="capitalize" sx={{ whiteSpace: 'nowrap' }}>
            {data?.phone_number}
          </Text>
        </TableCell>
        <TableCell>
          <JobTitle
            jobs={data?.jobs}
            isJobListOpen={isJobListOpen}
            onClick={handleViewJobDetail}
          />
        </TableCell>
        <TableCell>
          <Text textTransform="capitalize" sx={{ whiteSpace: 'nowrap' }}>
            {data?.contact_dates?.join(', ')}
          </Text>
        </TableCell>
        <TableCell>
          <Text textTransform="capitalize" sx={{ whiteSpace: 'nowrap' }}>
            {data?.contact_times?.join(', ')}
          </Text>
        </TableCell>
        <TableCell
          align="right"
          style={{
            position: 'sticky',
            right: 0,
            background: BACKGROUND_COLUMN_RIGHT_COLOR,
            zIndex: 800,
          }}
        >
          <Button
            component={Link}
            to={`${CLIENT_PATH.ADVERT_RESPONSES}/${data?.id}`}
            variant="outlined"
          >
            View
          </Button>
        </TableCell>
      </TableRow>

      <AdvertResponsesTableRowDetail
        isJobListOpen={isJobListOpen}
        data={data?.jobs}
      />

      <AdvertResponsesDialog
        advertResponsesDataTableRow={data}
        isUserInfoOpen={isUserInfoOpen}
        handleClickOnAvatar={handleClickOnAvatar}
      />
    </>
  );
};

export default AdvertResponsesTable;
