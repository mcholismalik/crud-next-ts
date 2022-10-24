import { Autocomplete, Button, InputAdornment, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  useFetchBrandsHook,
  useFetchCategoriesHook,
  useFetchColorsHook,
  useFetchSizesHook
} from '../../feature/hooks/usePriceEstimation';
import { IOptionForm } from '../../feature/model/base';
import { useFlagStore } from '../../feature/store/useFlag';
import {
  useEstimateQueryStore,
  useEstimateResponseStore,
  useFilterOptionsStore
} from '../../feature/store/usePriceEstimation';
import { DEFAULT_FILTERS } from '../../utils/constant';
import { optionOnChangeMultivalue } from '../../utils/option';
import { Iconify } from '../Iconify';

interface IProductSearch {
  children?: React.ReactNode;
}

interface IProductSearchForm {
  keyword: string;
  filters: IOptionForm[];
}

export const ProductSearch = ({ children }: IProductSearch) => {
  const { pathname, push } = useRouter();
  const { setIsError, token, isTokenExpired, setIsOpenAuthDialog } = useFlagStore();

  // filter
  useFetchBrandsHook();
  useFetchCategoriesHook();
  useFetchSizesHook();
  useFetchColorsHook();
  const {
    brands,
    categories,
    filteredCategories,
    setFilteredCategories,
    sizes,
    colors,
    filterOptions,
    setFilterOptions,
    placeholder,
    setPlaceholder
  } = useFilterOptionsStore();
  useEffect(() => {
    if (filteredCategories.length === 0) setFilteredCategories(categories);
  }, [categories]);

  const handleInputChange = (v: string) => {
    if (!DEFAULT_FILTERS.find((vOpt) => v.includes(vOpt.label))) {
      setFilterOptions(DEFAULT_FILTERS);
    } else {
      if (v.includes('brand:')) setFilterOptions(brands);
      if (v.includes('category:')) setFilterOptions(filteredCategories);
      if (v.includes('size:')) setFilterOptions(sizes);
      if (v.includes('color:')) setFilterOptions(colors);
    }
  };

  const handleOnChange = (data: IOptionForm[]) => {
    let nextPlaceholder = placeholder;

    const lastData = data.at(data.length - 1) || false;
    if (!lastData) {
      nextPlaceholder = DEFAULT_FILTERS[0].label;
    } else {
      const handleCategory = optionOnChangeMultivalue('category', categories, data, setFilteredCategories);
      if (handleCategory) {
        nextPlaceholder = 'category:';
      } else {
        setFilteredCategories(categories);
        const filterIdx = DEFAULT_FILTERS.findIndex((v) => v.label.includes(lastData.type));
        nextPlaceholder = filterIdx + 1 === DEFAULT_FILTERS.length ? '' : DEFAULT_FILTERS[filterIdx + 1].label;
      }
    }

    setPlaceholder(nextPlaceholder);
    setFilterOptions(DEFAULT_FILTERS);
  };

  // search
  const { query, setKeyword, filters, setFilters } = useEstimateQueryStore();
  const { setPage } = useEstimateResponseStore();
  const { register, control, handleSubmit } = useForm<IProductSearchForm>({ defaultValues: { filters } });
  const onSubmit = (data: IProductSearchForm, e: any) => {
    if (token == '' || isTokenExpired) {
      setIsOpenAuthDialog(true);
      return;
    }

    setPage(1);
    setIsError(false);
    setFilters(data.filters);
    setKeyword(data.keyword);

    if (pathname == '/search') {
      push('/search/result');
    }
  };
  const onError = (errors: any, e: any) => setIsError(true);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
          md: 'row'
        }}
        spacing={{
          xs: 1,
          sm: 1,
          md: 2
        }}
        sx={{ justifyContent: 'center', mb: 2 }}
      >
        {children}

        <TextField
          {...register('keyword', { value: query.keyword })}
          placeholder="Type your keyword ..."
          sx={{
            width: {
              xs: '100%',
              sm: '100%',
              md: 300
            },
            height: '100%'
          }}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={'eva:search-fill'}
                  sx={{
                    color: 'text.disabled',
                    width: 20,
                    height: 20
                  }}
                />
              </InputAdornment>
            )
          }}
        />

        <Controller
          name="filters"
          control={control}
          render={({ field }) => (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              multiple={true}
              options={filterOptions}
              defaultValue={[...filters]}
              getOptionLabel={(option) => option.label}
              getOptionDisabled={(option) => DEFAULT_FILTERS.findIndex((v) => v.label === option.label) !== -1}
              size="small"
              sx={{
                width: {
                  xs: '100%',
                  sm: '100%',
                  md: 700
                }
              }}
              renderInput={(params) => <TextField {...params} placeholder={placeholder} label="Filter" />}
              onChange={(_, data) => {
                handleOnChange(data);
                field.onChange(data);
              }}
              onInputChange={(_, v) => handleInputChange(v)}
            />
          )}
        />

        <Button type="submit" variant="contained" color="error" size="small">
          Search
        </Button>
      </Stack>
    </form>
  );
};
