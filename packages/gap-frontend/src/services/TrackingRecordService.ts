import { AxiosResponse } from 'axios';
import BaseService from './BaseService';
import { AdvertReactionRequest } from '../types/Requests';
import { TokenResponse } from '../types/Responses';
import { END_POINT } from '../constants/request';

const registerAdvertReaction = (
  data: AdvertReactionRequest,
): Promise<AxiosResponse<TokenResponse>> => {
  return BaseService.post(
    `${END_POINT.TRACKING_RECORDS.ADVERT_REACTION}`,
    data,
  );
};

export default {
  registerAdvertReaction,
};
