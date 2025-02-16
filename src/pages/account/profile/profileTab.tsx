import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid } from '@mui/material';
import { useForm, useWatch } from 'react-hook-form';

import FormSection from '@/components/FormSection';
import MainCard from '@/components/MainCard';
import ProfileUploader from './profileUploader';
import SocailNetwork from './socialNetwork';

import { contactInfoFields, defaultValues, personalInfoFields, UserProfileFormDataType, userProfileSchema } from './data';

export default function ProfileTab() {
  /* ----------------- Setup React Hook Form ----------------- */
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UserProfileFormDataType>({
    resolver: zodResolver(userProfileSchema),
    defaultValues
  });

  /* ----------------- Setup Submit Handler ----------------- */
  const onSubmit = (data: UserProfileFormDataType) => {
    console.log('All validated data:', data);
  };

  /* ----------------- Watch Image Field ----------------- */
  // This step is not required if we are not using profile uploader component
  const image = useWatch({ control, name: 'image' });
  const handleImageChange = (newImage: File | string) => {
    setValue('image', newImage);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ my: 1 }}>
        {/* ------------- Left Column: Personal Info + ProfileUploader ------------ */}
        <Grid item xs={12} md={6}>
          <MainCard divider title="Personal Information">
            {/* Pass the type also to the FormSection */}
            <FormSection<UserProfileFormDataType> fields={personalInfoFields} control={control} errors={errors}>
              <ProfileUploader image={image} setImage={handleImageChange} />
            </FormSection>
          </MainCard>
        </Grid>

        {/* --------------- Right Column: Social Network + Contact Info -------------- */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
            <SocailNetwork />
            <MainCard divider title="Contact Information">
              {/* Pass the type also to the FormSection */}
              <FormSection<UserProfileFormDataType> fields={contactInfoFields} control={control} errors={errors} />
            </MainCard>
          </Box>
        </Grid>

        {/* --------------------- Bottom: Submit and Cancel Button -------------------- */}
        <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
