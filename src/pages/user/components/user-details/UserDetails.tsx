// React Imports
import dayjs from 'dayjs';
import { ReactNode } from 'react';

// MUI Core Imports
import { Avatar, Box, Card, CardContent, Chip, CircularProgress, Grid, IconButton, Paper, Typography } from '@mui/material';

// MUI Icons
import { CalendarToday, CancelOutlined, CheckCircleOutline, Close, EmailOutlined, PersonOutline, PhoneOutlined } from '@mui/icons-material';

// Project Components & Types
import MainCard from '@/components/MainCard';
import { UserDetails as UserDetailsType } from '../../redux/types';

// Component Props
interface UserDetailsProps {
  userData: UserDetailsType | undefined;
  onClose: () => void;
}

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  verified?: boolean;
  chipColor?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

// Component
const UserDetails: React.FC<UserDetailsProps> = ({ userData, onClose }) => {
  const formatDate = (dateString?: string): string => (dateString ? dayjs(dateString).format('MMM D, YYYY h:mm A') : 'N/A');

  if (!userData) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" mb={3}>
          User Details
        </Typography>
        <CircularProgress />
      </Paper>
    );
  }

  return (
    <MainCard sx={{ p: 0, overflow: 'hidden', position: 'relative' }}>
      {/* Close Button */}
      <IconButton onClick={onClose} aria-label="close" size="small" sx={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }}>
        <Close />
      </IconButton>

      {/* User Header */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Avatar src={userData.photo} alt={`${userData.firstName || ''} ${userData.lastName || ''}`} sx={{ width: 72, height: 72, mr: 3 }}>
          {userData.firstName?.charAt(0) || userData.username?.charAt(0) || 'U'}
        </Avatar>
        <Box>
          <Typography variant="h4">
            {userData.firstName && userData.lastName ? `${userData.firstName} ${userData.lastName}` : userData.username || 'Unknown User'}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Chip
              size="small"
              variant="outlined"
              color={userData.isActive ? 'success' : 'error'}
              label={userData.isActive ? 'Active' : 'Inactive'}
              icon={userData.isActive ? <CheckCircleOutline fontSize="small" /> : <CancelOutlined fontSize="small" />}
              sx={{
                mr: 1,
                p: 1.5,
                fontWeight: 500,
                borderRadius: 1
              }}
            />
            {userData.roles?.map((role, index) => <Chip key={index} size="small" label={role.name} sx={{ mr: 1, mt: 0.5 }} />)}
          </Box>
        </Box>
      </Box>

      {/* Info Content */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Left Column - Basic Info */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
              Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <InfoCard icon={<PersonOutline />} title="Username" value={userData.username || ''} />
              </Grid>
              <Grid item xs={3}>
                <InfoCard icon={<EmailOutlined />} title="Email" value={userData.email || ''} verified={userData.isEmailVerified} />
              </Grid>
              <Grid item xs={3}>
                <InfoCard icon={<PhoneOutlined />} title="Phone No" value={userData.phoneNo || ''} verified={userData.isPhoneVerified} />
              </Grid>
              <Grid item xs={3}>
                <InfoCard icon={<CalendarToday />} title="Last Login" value={formatDate(userData.lastLogin)} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

// InfoCard Subcomponent
const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value, verified, chipColor }) => (
  <Card variant="outlined" sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ color: 'primary.main', mr: 1 }}>{icon}</Box>
        <Typography variant="subtitle1" color="text.secondary">
          {title}
        </Typography>
        {verified !== undefined && (
          <Chip
            size="small"
            variant="outlined"
            label={verified ? 'Verified' : 'Unverified'}
            color={verified ? 'success' : 'default'}
            icon={verified ? <CheckCircleOutline fontSize="small" /> : <CancelOutlined fontSize="small" />}
            sx={{
              ml: 'auto',
              mr: 1,
              fontWeight: 500,
              borderRadius: 1
            }}
          />
        )}
      </Box>
      {chipColor ? (
        <Chip label={value} color={chipColor} sx={{ mt: 1 }} />
      ) : (
        <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
          {value || 'N/A'}
        </Typography>
      )}
    </CardContent>
  </Card>
);

export default UserDetails;
