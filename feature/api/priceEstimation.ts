import { DUMMY_CATEGORIES, DUMMY_COLORS, DUMMY_SIZES } from '../../utils/constant';
import { formatQueryStr } from '../../utils/format';
import {
  IBrand,
  IBrandsResponse,
  ICategory,
  IColor,
  IEstimationPriceQuery,
  IEstimationPriceResponse,
  ISize
} from '../model/priceEstimation';
import { api, routes } from './config';

export const getEstimateAPI = async (
  params: IEstimationPriceQuery,
  token: string
): Promise<IEstimationPriceResponse> => {
  const queryStr = formatQueryStr<IEstimationPriceQuery>(params);
  const res = await api.get<IEstimationPriceResponse>(routes.priceEstimation.estimate + queryStr, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

export const getBrandsAPI = async (token: string): Promise<IBrand[]> => {
  const res = await api.get<IBrandsResponse>(routes.priceEstimation.brands, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data.brands;
};

export const getCategoryAPI = async (token: string): Promise<ICategory[]> => {
  return await new Promise((res, rej) => {
    res(DUMMY_CATEGORIES);
  });
};

export const getSizeAPI = async (token: string): Promise<ISize[]> => {
  return await new Promise((res, rej) => {
    res(DUMMY_SIZES);
  });
};

export const getColorAPI = async (token: string): Promise<IColor[]> => {
  return await new Promise((res, rej) => {
    res(DUMMY_COLORS);
  });
};
