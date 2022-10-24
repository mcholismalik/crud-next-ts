import { Box } from '@mui/system';
import Link from 'next/link';
import { APP } from '../utils/config';

interface Logo {
  width?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
}

export const Logo = ({ width }: Logo) => (
  <Link href="/search">
    <Box
      component="img"
      sx={{
        height: '100%',
        width: {
          xs: 130,
          sm: 150,
          lg: 150,
          md: 150,
          ...width
        }
      }}
      src={'/' + APP.logo}
    />
  </Link>
);
