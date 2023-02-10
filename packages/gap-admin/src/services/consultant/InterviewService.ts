import { AxiosResponse } from 'axios';
import ConsultantBaseService from './ConsultantBaseService';
import { Request } from '../../types/Requests';
import { Response } from '../../types/Responses';

const getInterviews = (data: Request): Promise<AxiosResponse<Response>> => {
  return ConsultantBaseService.get(`${process.env.REACT_APP_API}`, data);
};

const getInterviewDetail = (
  data: Request,
): Promise<AxiosResponse<Response>> => {
  return ConsultantBaseService.get(
    `${process.env.REACT_APP_API}/${data?.id}`,
    data,
  );
};

export default {
  getInterviews,
  getInterviewDetail,
};
