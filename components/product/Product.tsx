import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';

export interface IProduct {
  source: string;
  label: string;
  price: string;
  sourceURL: string;
  imageURL: string;
}

export const Product = (product: IProduct) => {
  return (
    <Grid container>
      <Grid item xs={8} sx={{ textAlign: 'left' }}>
        <Typography sx={{ color: 'text.secondary', mb: 1 }}>{product.source}</Typography>
        <Link href={product.sourceURL} color="inherit">
          <Typography sx={{ textDecoration: 'underline', mb: 1 }}>{product.label}</Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Category: Man / Shirt / Long Shirt
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Brand: アーガイルアンドビュート - ARGYLL AND BUTE
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Size: XL, Color: White
        </Typography>
        <Typography color="error" sx={{ mt: 1, mb: 1, fontWeight: 'bold' }}>
          {product.price}
        </Typography>
      </Grid>
      <Grid item xs={4} sx={{ textAlign: 'right' }}>
        <Box
          component="img"
          sx={{
            height: 100,
            width: 100
          }}
          alt={product.label}
          src={product.imageURL}
        />
      </Grid>
    </Grid>
  );
};
