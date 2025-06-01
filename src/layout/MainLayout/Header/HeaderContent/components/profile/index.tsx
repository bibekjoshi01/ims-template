import { useRef, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// third party
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

// project import
import Avatar from '@/components/@extended/Avatar';
import Transitions from '@/components/@extended/Transitions';
import MainCard from '@/components/cards/MainCard';
import { useAppDispatch, useAppSelector } from '@/libs/hooks';
import { useLogoutMutation } from '@/pages/authentication/redux/auth.api';
import { logoutSuccess } from '@/pages/authentication/redux/auth.slice';
import { authState } from '@/pages/authentication/redux/selector';

// assets
import avatar1 from '@/assets/images/users/avatar-1.png';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import { PersonOutline, SettingsOutlined } from '@mui/icons-material';

// tabs
import TABS from '@/components/CustomTab';
import { TabItem } from '@/menu-items/types';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';

const TabItems: TabItem[] = [
  {
    id: 'profile',
    title: 'Profile',
    icon: PersonOutline,
    tabPanel: ProfileTab
  },
  {
    id: 'setting',
    title: 'Setting',
    icon: SettingsOutlined,
    tabPanel: SettingTab
  }
];

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function Profile() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { fullName, photo, email } = useAppSelector(authState);

  const anchorRef: React.Ref<any> = useRef(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: any): void => {
    setValue(newValue);
  };

  const [logout] = useLogoutMutation();

  const handleLogOut = async () => {
    const refreshToken = Cookies.get('refresh');
    try {
      const response = await logout({ refresh: refreshToken }).unwrap();
      dispatch(logoutSuccess());
      enqueueSnackbar(response?.message, { variant: 'success' });
      navigate('/');
    } catch (error: any) {
      if (error.status === 400) {
        enqueueSnackbar(error?.data?.refresh[0] || 'Invalid request. Please try again.', { variant: 'error' });
      }
    }
  };

  return (
    <Box sx={{ flexShrink: 0 }}>
      <IconButton
        size="large"
        sx={{
          p: 0.25,
          width: '100%',
          bgcolor: open ? 'action.hover' : 'transparent',
          borderRadius: 1,
          '&:focus-visible': { outline: `2px solid ${theme.palette.secondary.dark}`, outlineOffset: 2 }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" src={photo || avatar1} size="sm" />
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
            {fullName || 'Hello !'}
          </Typography>
        </Stack>
      </IconButton>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
            <Paper sx={{ boxShadow: theme.customShadows.z1, width: 290, minWidth: 240, maxWidth: { xs: 250, md: 290 } }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack direction="row" spacing={1.25} alignItems="center">
                          <Avatar alt="profile user" src={photo || avatar1} sx={{ width: 32, height: 32 }} />
                          <Stack>
                            <Typography variant="h6">{fullName || 'Hello !'}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {email}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Logout">
                          <IconButton onClick={handleLogOut} size="large" sx={{ color: 'error.main' }}>
                            <LogoutOutlined />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <TABS variant="fullWidth" handleChange={handleChange} value={value} tabItems={TabItems} />
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}
