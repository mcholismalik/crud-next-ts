import { Icon } from '@iconify/react';
import { Box } from '@mui/material';

interface IIconify {
  icon: string;
  sx?: any;
  width?: number;
  height?: number;
}

export const Iconify = ({ icon, sx, ...other }: IIconify) => {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
};
