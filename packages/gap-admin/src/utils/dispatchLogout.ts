import CLIENT_PATH from '../constants/clientPath';
import { STATUS_CODE } from '../constants/common';
import API_HOST from '../constants/apiHosts';
import history from './history';
import toast from '../components/Toast';
import { END_POINT } from '../request/constants';

export const dispatchLogout = async ({ accessToken }) => {
  const response = await fetch(`${API_HOST.USER_URL}${END_POINT.AUTH.LOGOUT}`, {
    method: 'post',
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
    }),
  });

  if (response.status === STATUS_CODE.SUCCESS) {
    response.json().then((res) => {
      toast.success(res.detail);
    });
  } else if (response.status === STATUS_CODE.UNAUTHORIZED) {
    response.json().then((res) => {
      toast.error(res.detail);
    });
    history.replace(CLIENT_PATH.LOGIN);
  } else {
    response.json().then((res) => {
      toast.error(res.detail);
    });
  }
};
