import { Button, Grid } from '@mui/material';

// UI Components
import FormSection from '@/components/app-form/FormSection';
import MainCard from '@/components/cards/MainCard';

import useUpdateCategory from '../../hooks/useUpdateCategory';
import { ICategoryDetails } from '../../redux/types';
import { TCategoryUpdateFormDataType } from './config';

export interface ICategoryUpdateFormProps {
  categoryData?: ICategoryDetails;
  onClose?: () => void;
}

export default function CategoryUpdateForm({ categoryData, onClose }: ICategoryUpdateFormProps) {
  const { control, errors, categoryUpdateFields, handleSubmit } = useUpdateCategory({ categoryData, onClose });

  return (
    <form onSubmit={handleSubmit()}>
      <Grid container spacing={3} sx={{ pt: 1 }}>
        <Grid item xs={12}>
          <MainCard divider title={'Update Category'}>
            <FormSection<TCategoryUpdateFormDataType> fields={categoryUpdateFields} control={control} errors={errors} />
          </MainCard>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Update
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
