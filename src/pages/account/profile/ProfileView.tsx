import { Avatar, Button, CircularProgress, Grid, Typography } from '@mui/material';

// project imports
import MainCard from '@/components/MainCard';
import { useGetProfile } from '../hooks/useGetProfile';
import DynamicInfoSection from '@/components/detail-section';
import { UserProfile } from '../redux/types';

export default function ProfileView({ setEdit }: { setEdit: () => void }) {
  const { profileData: profile, isLoading } = useGetProfile();

  if (isLoading) return <CircularProgress />;
  if (!profile) return <Typography variant="h6">Profile not found</Typography>;

  const excludeFields: (keyof UserProfile)[] = ['id', 'photo', 'firstName', 'lastName'];
  const fieldOrder: (keyof UserProfile)[] = [
    'fullName',
    'username',
    'email',
    'phoneNo',
    'lastLogin',
    'dateJoined',
    'isEmailVerified',
    'roles'
  ];
  const dateTimeFields: (keyof UserProfile)[] = ['lastLogin', 'dateJoined'];

  return (
    <Grid container spacing={2} sx={{ my: 1 }}>
      <Grid item xs={12} md={6}>
        <MainCard divider title="Personal Information">
          <Avatar
            src={typeof profile?.photo === 'string' ? profile.photo : undefined}
            alt="Profile"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <DynamicInfoSection data={profile} excludeFields={excludeFields} fieldOrder={fieldOrder} dateTimeFields={dateTimeFields} />
          <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={() => setEdit()} variant="outlined" sx={{ mt: 2 }}>
              Edit Profile
            </Button>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}
