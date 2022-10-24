import KeyIcon from '@mui/icons-material/Key';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  TextField
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useFlagStore } from '../../feature/store/useFlag';

export interface IProduct {
  source: string;
  label: string;
  price: string;
  sourceURL: string;
  imageURL: string;
}

interface IAuth {
  token: string;
}

export const AuthDialog = () => {
  const { token, setToken, isTokenExpired, isOpenAuthDialog, setIsOpenAuthDialog } = useFlagStore();
  const { register, handleSubmit } = useForm<IAuth>();

  const handleClickOpen = () => setIsOpenAuthDialog(true);
  const handleClose = () => setIsOpenAuthDialog(false);
  const onSubmit = (data: IAuth, e: any) => {
    setToken(data.token);
    setIsOpenAuthDialog(false);
  };

  return (
    <>
      <Fab
        onClick={handleClickOpen}
        sx={{
          position: 'fixed',
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2)
        }}
        size="small"
        color="primary"
      >
        <KeyIcon />
      </Fab>

      <Dialog open={isOpenAuthDialog} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Auth gcloud</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }} id="alert-dialog-slide-description">
              {token === '' && 'Please fill gcloud token'}
              {isTokenExpired && 'Your token has expired'}
            </DialogContentText>
            <TextField
              autoFocus
              label="Token"
              fullWidth
              variant="outlined"
              size="small"
              {...register('token')}
              defaultValue={token}
            />
          </DialogContent>
          <DialogActions>
            <Button size="small" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" size="small" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
