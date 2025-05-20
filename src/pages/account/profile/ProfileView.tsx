import { Avatar, Button, CircularProgress, Grid, Typography } from '@mui/material';

// project imports
import MainCard from '@/components/MainCard';
import { useGetProfile } from '../hooks/useGetProfile';

export default function ProfileView({ setEdit }: { setEdit: () => void }) {
  const { profileData: profile, isLoading } = useGetProfile();

  if (isLoading) return <CircularProgress />;

  return (
    <Grid container spacing={2} sx={{ my: 1 }}>
      <Grid item xs={12} md={6}>
        <MainCard divider title="Personal Information">
          <Grid item xs={12} sm={4}>
            <Avatar src={typeof profile?.photo === 'string' ? profile.photo : undefined} alt="Profile" sx={{ width: 120, height: 120 }} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6">{`${profile?.firstName} ${profile?.lastName}`}</Typography>
            <Typography variant="body1">{profile?.email}</Typography>
            <Typography variant="body1">{profile?.phoneNo}</Typography>

            <Button onClick={() => setEdit()} variant="outlined" sx={{ mt: 2 }}>
              Edit Profile
            </Button>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}
