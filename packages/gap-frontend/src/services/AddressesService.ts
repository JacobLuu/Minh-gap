import { AxiosResponse } from 'axios';

import API_HOST from '../constants/apiHosts';
import { END_POINT } from '../constants/request';
import BaseService from './BaseService';

import type {
  AddressResponse,
  LoqateAddressesResponse,
} from '../types/Responses';

const searchAddresses = (
  filter: string,
): Promise<AxiosResponse<LoqateAddressesResponse>> => {
  return BaseService.get(
    `${API_HOST.BASE_URL.replace('/candidate', '')}${
      END_POINT.ADDRESSES.SEARCH
    }`,
    {
      params: {
        filter,
      },
    },
  );
};

const getAddress = (key: string): Promise<AxiosResponse<AddressResponse>> => {
  return BaseService.get(
    `${API_HOST.BASE_URL.replace('/candidate', '')}${
      END_POINT.ADDRESSES.GENERAL
    }/${key}`,
  );
};

export default {
  searchAddresses,
  getAddress,
};
