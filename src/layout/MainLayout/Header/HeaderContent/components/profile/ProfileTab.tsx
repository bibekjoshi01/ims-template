import Cookies from 'js-cookie';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// icons
import EditOutlined from '@ant-design/icons/EditOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';

// project imports
import { useAppDispatch } from '@/libs/hooks';
import { useLogoutMutation } from '@/pages/authentication/redux/auth.api';
import { logoutSuccess } from '@/pages/authentication/redux/auth.slice';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export default function ProfileTab() {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (index: number, routePath: string) => {
    setSelectedIndex(index);
    navigate(routePath);
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
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={() => handleClick(0, '/account/profile')}>
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={() => handleClick(1, '/account/change-password')}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Change Password" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={() => handleLogOut()}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
}
