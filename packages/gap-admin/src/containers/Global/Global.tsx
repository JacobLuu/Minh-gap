import React, { useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Toast from '../../components/Toast';
import { selectGlobalStore } from './reducer';
import { Wrapper } from './styles';

function Global() {
  const { errorMessages, successMessages } = useSelector(selectGlobalStore);
  useEffect(() => {
    errorMessages.map((error) => Toast.error(error));
  }, [errorMessages]);

  useEffect(() => {
    successMessages.map((error) => Toast.success(error));
  }, [successMessages]);

  return (
    <>
      <Wrapper />
      <ToastContainer limit={1} autoClose={1000} pauseOnFocusLoss={false} />
    </>
  );
}

export default memo(Global);
