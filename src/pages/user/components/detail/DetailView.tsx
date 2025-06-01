// React Imports
import dayjs from 'dayjs';

// MUI Core Imports
import { Avatar, Box, Chip, CircularProgress, Grid, IconButton, Paper, Typography } from '@mui/material';

// MUI Icons
import { CalendarToday, CancelOutlined, CheckCircleOutline, Close, EmailOutlined, PersonOutline, PhoneOutlined } from '@mui/icons-material';

// Project Components & Types
import InfoCard from '@/components/cards/Infocard';
import MainCard from '@/components/cards/MainCard';
import { UserDetails as DetailViewType } from '../../redux/types';

// Component Props
interface DetailViewProps {
  userData: DetailViewType | undefined;
  onClose: () => void;
}

// Component
const DetailView: React.FC<DetailViewProps> = ({ userData, onClose }) => {
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
          p: 2,
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          flexDirection: { xxs: 'column', xs: 'row' },
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Avatar src={userData.photo} alt={`${userData.firstName || ''} ${userData.lastName || ''}`} sx={{ width: 72, height: 72, mr: 3 }}>
          {userData.firstName?.charAt(0) || userData.username?.charAt(0) || 'U'}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
      <Box sx={{ px: { xxs: 0, xs: 2 }, py: 1 }}>
        <Grid container spacing={3}>
          {/* Left Column - Basic Info */}
          <Grid item xxs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
              Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xxs={12} sm={6} md={3}>
                <InfoCard icon={<PersonOutline />} title="Username" value={userData.username || ''} />
              </Grid>
              <Grid item xxs={12} sm={6} md={3}>
                <InfoCard icon={<EmailOutlined />} title="Email" value={userData.email || ''} verified={userData.isEmailVerified} />
              </Grid>
              <Grid item xxs={12} sm={6} md={3}>
                <InfoCard icon={<PhoneOutlined />} title="Phone No" value={userData.phoneNo || ''} verified={userData.isPhoneVerified} />
              </Grid>
              <Grid item xxs={12} sm={6} md={3}>
                <InfoCard icon={<CalendarToday />} title="Last Login" value={formatDate(userData.lastLogin)} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default DetailView;
