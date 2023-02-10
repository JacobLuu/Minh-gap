import React, { useState } from 'react';
import { Box, Button, TableCell, TableRow } from '@mui/material';
import { getJourneyType } from 'gap-common/src/utils/customHooks';
import uniq from 'lodash/uniq';
import { Link } from 'react-router-dom';
import JobTitle from '../../components/JobTitle';
import CLIENT_PATH from '../../constants/clientPath';
import { CONTENT_COLOR } from '../../themes/Colors';
import { Job } from '../../types/models';
import JobDetail from './JobDetail';
import { Text } from './styles';

interface Creator {
  id: number;
  name: string;
}
interface EscalatedIssues {
  assignee: string;
  category: string;
  content: string;
  creator: Creator;
  id: number;
  type: string;
}

interface IEscalatedIssueRow {
  data: {
    email: string;
    escalated_issues: EscalatedIssues[];
    first_name: string;
    id: number;
    journey_type: string;
    last_name: string;
    middle_name: string;
    jobs: Job[];
  };
}

const EscalatedIssueRow = ({ data }: IEscalatedIssueRow) => {
  const [isJobListOpen, setIsJobListOpen] = useState(false);
  const handleViewJobDetail = () => {
    setIsJobListOpen(!isJobListOpen);
  };
  const consultantNames = data?.escalated_issues?.map(
    (escalated_issue) => escalated_issue?.creator?.name,
  );
  const assignee = data?.escalated_issues
    ?.map((escalated_issue) => escalated_issue.assignee)
    .join(', ');
  return (
    <>
      <TableRow sx={{ height: '70px' }} key={data.id}>
        <TableCell>
          <Box display="flex" alignItems="start">
            <Text>
              {data?.first_name} {data?.middle_name} {data?.last_name}
            </Text>
          </Box>
        </TableCell>
        <TableCell>
          <JobTitle
            jobs={data?.jobs}
            isJobListOpen={isJobListOpen}
            onClick={handleViewJobDetail}
          />
        </TableCell>
        <TableCell
          style={{ fontSize: '13px', fontWeight: '400', color: CONTENT_COLOR }}
        >
          {uniq(consultantNames).join(', ')}
        </TableCell>
        <TableCell>
          <Text>
            {data?.escalated_issues.length === 1
              ? `(${data?.escalated_issues.length}) issue`
              : `(${data?.escalated_issues.length}) issues`}
          </Text>
        </TableCell>
        <TableCell>
          <Text>{getJourneyType(data?.journey_type)}</Text>
        </TableCell>
        <TableCell>
          <Text>{assignee}</Text>
        </TableCell>
        <TableCell align="right">
          <Button
            component={Link}
            to={`${CLIENT_PATH.INTERVIEW}/${data.id}?currentTab=applicant_details&from=escalated_issue`}
            variant="outlined"
          >
            View
          </Button>
        </TableCell>
      </TableRow>

      <JobDetail isJobListOpen={isJobListOpen} data={data?.jobs} />
    </>
  );
};

export default EscalatedIssueRow;
