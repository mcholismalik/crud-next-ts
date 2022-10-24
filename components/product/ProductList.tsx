import { Stack } from '@mui/material';
import { useEstimateResponseStore } from '../../feature/store/usePriceEstimation';
import { PaginationBar } from '../PaginationBar';
import { IProduct, Product } from './Product';

export const ProductList = () => {
  const { paginateProducts, totalPage, limit, setPage } = useEstimateResponseStore();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => setPage(value);

  return (
    <Stack spacing={2} sx={{ mb: 4 }}>
      {paginateProducts.map((v: IProduct, i: number) => (
        <Product key={i} {...v}></Product>
      ))}
      <PaginationBar count={totalPage} limit={limit} handleChange={handleChange} />
    </Stack>
  );
};
