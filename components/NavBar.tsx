import { AppBar, Container, Toolbar } from '@mui/material';
import { styled, Theme, useTheme } from '@mui/material/styles';
import { useOffSetTop } from '../feature/hooks/useOffsetTop';
import { cssStyles } from '../theme/cssStyles';
import { HEADER } from '../utils/config';

interface IToolbarStyle {
  theme: Theme;
}

const ToolbarStyle = styled(Toolbar)(({ theme }: IToolbarStyle) => ({
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  })
}));

const ToolbarShadowStyle = styled('div')(({ theme }: any) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8
}));

interface INavbar {
  children: React.ReactNode;
}

export const NavBar = ({ children }: INavbar) => {
  const isOffset = useOffSetTop(HEADER.main_desktop_height);
  const theme = useTheme();

  return (
    <>
      <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
        <ToolbarStyle
          disableGutters
          sx={{
            ...(isOffset && {
              ...cssStyles(theme).bgBlur()
            })
          }}
        >
          <Container sx={{ mt: 2 }}>{children}</Container>
        </ToolbarStyle>

        {isOffset && <ToolbarShadowStyle />}
      </AppBar>
    </>
  );
};
