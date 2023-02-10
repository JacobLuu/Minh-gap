import React, { useRef, useEffect, memo } from 'react';
import BreadcrumbsHeader from 'gap-common/src/components/BreadcrumbsHeader';
import Box from '@mui/material/Box';
import { Wrapper, HeaderTitle } from './styles';
import { scrollTop } from '../../utils/customHooks';

interface IContentLayout {
  children?: any;
  scrollToTop?: boolean;
  breadCrumbs?: Array<any>;
  headerTitle?: string;
  flexDirection?: 'row' | 'column';
  action?: any;
}

function ContentLayout({
  children,
  scrollToTop,
  breadCrumbs,
  headerTitle,
  action,
  flexDirection,
}: IContentLayout) {
  const scrollToTopRef = useRef(null);

  useEffect(() => {
    scrollTop(scrollToTopRef);
  }, [scrollToTop]);

  return (
    <Wrapper>
      <div ref={scrollToTopRef} />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="start"
        flexDirection={flexDirection}
      >
        <Box>
          <HeaderTitle>{headerTitle}</HeaderTitle>
          <BreadcrumbsHeader items={breadCrumbs} />
        </Box>
        {action}
      </Box>
      {children}
    </Wrapper>
  );
}

ContentLayout.defaultProps = {
  scrollToTop: false,
  breadCrumbs: [],
  headerTitle: '',
  flexDirection: 'row',
  children: null,
  action: null,
};

export default memo(ContentLayout);
