import React from 'react';
import LoadingIndicator from 'gap-common/src/components/LoadingIndicator';
import loadable from '../../utils/loadable';

export default loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
