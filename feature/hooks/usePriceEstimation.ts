import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { formatQueryStr } from '../../utils/format';
import { routes } from '../api/config';
import { getBrandsAPI, getCategoryAPI, getColorAPI, getEstimateAPI, getSizeAPI } from '../api/priceEstimation';
import {
  IBrand,
  ICategory,
  IColor,
  IEstimationPriceQuery,
  IEstimationPriceResponse,
  ISize
} from '../model/priceEstimation';
import { useFlagStore } from '../store/useFlag';
import {
  initialEstimateResponseStore,
  useEstimateResponseStore,
  useFilterOptionsStore
} from '../store/usePriceEstimation';

export const useFetchEstimateHook = (params: IEstimationPriceQuery) => {
  const { setEstimationPrice, setProducts } = useEstimateResponseStore();
  const { setIsError, token, setIsTokenExpired, setIsOpenAuthDialog } = useFlagStore();
  const queryStr = formatQueryStr<IEstimationPriceQuery>(params);

  return useQuery<IEstimationPriceResponse, AxiosError>(
    [routes.priceEstimation.estimate + queryStr],
    () => getEstimateAPI(params, token),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess: (data: IEstimationPriceResponse) => {
        setEstimationPrice(data);
        setProducts();
      },
      onError: (err: AxiosError) => {
        if (err.response?.status === 401) {
          setIsTokenExpired(true);
          setIsOpenAuthDialog(true);
        }

        setEstimationPrice({
          ...initialEstimateResponseStore.estimationPrice
        });
        setProducts();
        setIsError(true);
      }
    }
  );
};

export const useFetchBrandsHook = () => {
  const { setBrands } = useFilterOptionsStore();
  const { token } = useFlagStore();

  return useQuery<Array<IBrand>, AxiosError>([routes.priceEstimation.brands], () => getBrandsAPI(token), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (data: IBrand[]) => {
      setBrands(data);
    }
  });
};

export const useFetchCategoriesHook = () => {
  const { setCategories } = useFilterOptionsStore();
  const { token } = useFlagStore();

  return useQuery<Array<ICategory>, AxiosError>([routes.priceEstimation.categories], () => getCategoryAPI(token), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (data: ICategory[]) => {
      setCategories(data);
    }
  });
};

export const useFetchSizesHook = () => {
  const { setSizes } = useFilterOptionsStore();
  const { token } = useFlagStore();

  return useQuery<Array<ISize>, AxiosError>([routes.priceEstimation.sizes], () => getSizeAPI(token), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (data: ISize[]) => {
      setSizes(data);
    }
  });
};

export const useFetchColorsHook = () => {
  const { setColors } = useFilterOptionsStore();
  const { token } = useFlagStore();

  return useQuery<Array<IColor>, AxiosError>([routes.priceEstimation.colors], () => getColorAPI(token), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (data: IColor[]) => {
      setColors(data);
    }
  });
};
