import CloseIcon from '@mui/icons-material/Close';
import Alert, { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import { useFlagStore } from '../feature/store/useFlag';

interface IAlertBar {
  severity: AlertColor;
  children: React.ReactNode;
}

export const AlertBar = ({ severity, children }: IAlertBar) => {
  const { isError, setIsError } = useFlagStore();

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={isError}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setIsError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {children}
        </Alert>
      </Collapse>
    </Box>
  );
};
