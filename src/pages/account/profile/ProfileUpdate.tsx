import { Button, Grid } from '@mui/material';
import { useWatch } from 'react-hook-form';

// project imports
import FormSection from '@/components/app-form/FormSection';
import MainCard from '@/components/cards/MainCard';

import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { personalInfoFields, UpdateProfileFormDataType } from './profile.config';
import ProfileUploader from './profileUploader';

type ProfileUpdateProps = { onCancel: () => void };

export default function ProfileUpdate({ onCancel }: ProfileUpdateProps) {
  const { handleSubmit, onSubmit, control, errors, loadingUpdateProfile, setValue } = useUpdateProfile();

  const photo = useWatch({ control, name: 'photo' });
  const fileImage = photo ?? null;

  const handleImageChange = (newImage: File | string) => {
    setValue('photo', newImage);
  };

  const onFormSubmit = (values: UpdateProfileFormDataType) => {
    onSubmit(values, onCancel);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={12} md={6}>
          <MainCard divider title="Update Profile Information">
            <FormSection<UpdateProfileFormDataType> fields={personalInfoFields} control={control} errors={errors}>
              <ProfileUploader image={fileImage} defaultHovered={true} setImage={handleImageChange} />
            </FormSection>
            <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={() => onCancel?.()} variant="outlined" color="error">
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={loadingUpdateProfile}>
                {loadingUpdateProfile ? 'Updating...' : 'Save'}
              </Button>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </form>
  );
}
