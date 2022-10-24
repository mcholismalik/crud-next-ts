import { Pagination, Stack, Typography } from '@mui/material';

interface IPaginagionBar {
  count: number;
  limit: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export const PaginationBar = ({ count, limit, handleChange }: IPaginagionBar) => {
  return (
    <Stack direction="row" sx={{ justifyContent: 'left', alignItems: 'center' }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Showing 1 to {limit} of {count}
      </Typography>
      <Pagination count={count} onChange={handleChange} color="secondary" />
    </Stack>
  );
};
