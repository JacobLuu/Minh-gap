import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { Container, StyledBreadcrumbs, Text } from './styles';
import { CONTENT_COLOR, WHITE_COLOR } from '../../themes/Colors';

type IBreadcrumbsHeaderItem = {
  label: string;
  path?: string;
};

type BreadcrumbsHeaderProp = {
  items: Array<IBreadcrumbsHeaderItem>;
};

const BreadcrumbsHeader = (props: BreadcrumbsHeaderProp) => {
  return (
    <Container>
      <div
        style={{
          background: WHITE_COLOR,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          marginRight: '12px',
          border: `1px solid ${CONTENT_COLOR}`,
        }}
      />
      <StyledBreadcrumbs
        separator={
          <NavigateNextIcon htmlColor={CONTENT_COLOR} sx={{ width: 20 }} />
        }
        aria-label="breadcrumb"
      >
        {props.items?.map((item) => {
          if (!item.label) {
            return;
          }
          if (item.path) {
            return (
              <Link key={item.label} to={item.path}>
                <Text>{item.label}</Text>
              </Link>
            );
          }
          return <Text key={item.label}>{item.label}</Text>;
        })}
      </StyledBreadcrumbs>
    </Container>
  );
};

export default memo(BreadcrumbsHeader);
