import { Avatar, Button, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

// project imports
import MainCard from '@/components/MainCard';
import { useGetProfile } from '../hooks/useGetProfile';
import ProfileUpdate from './ProfileUpdate';

export default function ProfileTab() {
  const [edit, setEdit] = useState(false);
  const { profileData: profile, isLoading } = useGetProfile();

  if (isLoading) return <CircularProgress />;

  return (
    <React.Fragment>
      {profile && edit ? (
        <ProfileUpdate profile={profile} onCancel={() => setEdit(false)} />
      ) : (
        <Grid container spacing={2} sx={{ my: 1 }}>
          <Grid item xs={12} md={6}>
            <MainCard divider title="Personal Information">
              <Grid item xs={12} sm={4}>
                <Avatar
                  src={typeof profile?.photo === 'string' ? profile.photo : undefined}
                  alt="Profile"
                  sx={{ width: 120, height: 120 }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6">{`${profile?.firstName} ${profile?.lastName}`}</Typography>
                <Typography variant="body1">{profile?.email}</Typography>
                <Typography variant="body1">{profile?.phoneNo}</Typography>

                <Button onClick={() => setEdit(true)} variant="outlined" sx={{ mt: 2 }}>
                  Edit Profile
                </Button>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
