import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

// project imports
import FormSection from '@/components/FormSection';
import MainCard from '@/components/MainCard';
import ProfileUploader from './profileUploader';

import { useGetProfileQuery } from '../redux/account.api';
import { UserProfile } from '../redux/types';
import { personalInfoFields, UserProfileFormDataType, userProfileSchema } from './profile.config';

type SelectOption = {
  label: string;
  value: string | number;
  groupName?: string;
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  return dayjs(dateStr).format('MMM D, YYYY h:mm A');
};

export default function ProfileTab() {
  /* ----------------- Setup React Hook Form ----------------- */
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<UserProfileFormDataType>({
    resolver: zodResolver(userProfileSchema)
  });

  const { data: profileData, isSuccess } = useGetProfileQuery();

  useEffect(() => {
    if (isSuccess && profileData) {
      const formKeys: (keyof UserProfile)[] = [
        'firstName',
        'lastName',
        'photo',
        'phoneNo',
        'email',
        'username',
        'isEmailVerified',
        'isPhoneVerified',
        'lastLogin',
        'dateJoined',
        'roles'
      ];

      const filteredProfileData = Object.fromEntries(
        formKeys.map((key) => {
          if (key === 'lastLogin' || key === 'dateJoined') {
            return [key, formatDate(profileData[key])];
          }
          return [key, profileData[key] ?? ''];
        })
      );

      const formattedRoles: SelectOption[] = profileData?.roles.map((role: string) => ({
        label: role,
        value: role
      }));

      reset({
        ...filteredProfileData,
        roles: formattedRoles
      } as Partial<UserProfileFormDataType>);
    }
  }, [isSuccess, profileData, reset]);

  const handleUpdateProfile = () => {
    console.log('All validated data:');
  };

  const photo = useWatch({ control, name: 'photo' });
  const handleImageChange = (newImage: File | string) => {
    setValue('photo', newImage);
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateProfile)}>
      <Grid container spacing={3} sx={{ my: 1 }}>
        {/* ------------- Left Column: Personal Info + ProfileUploader ------------ */}
        <Grid item xs={12} md={6}>
          <MainCard divider title="Personal Information">
            <FormSection<UserProfileFormDataType> fields={personalInfoFields} control={control} errors={errors}>
              <ProfileUploader image={photo} setImage={handleImageChange} />
            </FormSection>
          </MainCard>
        </Grid>

        {/* --------------- Right Column: Social Network + Contact Info -------------- */}
        {/* <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
            <SocailNetwork />
            <MainCard divider title="Contact Information">
              <FormSection<UserProfileFormDataType> fields={contactInfoFields} control={control} errors={errors} />
            </MainCard>
          </Box>
        </Grid> */}

        <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start', mt: 2 }}>
          <Button variant="contained" type="submit">
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
