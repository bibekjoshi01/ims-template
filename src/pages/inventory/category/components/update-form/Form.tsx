import { Button, Grid } from '@mui/material';

// UI Components
import MainCard from '@/components/cards/MainCard';
import FormSection from '@/components/app-form/FormSection';

import { ICategoryDetails } from '../../redux/types';
import { CategoryUpdateFormDataType } from './config';
import useUpdateCategory from '../../hooks/useUpdateCategory';

export interface CategoryUpdateFormProps {
  categoryData?: ICategoryDetails;
  onClose?: () => void;
}

export default function CategoryUpdateForm({ categoryData, onClose }: CategoryUpdateFormProps) {
  const { control, errors, categoryUpdateFields, handleSubmit } = useUpdateCategory({ categoryData, onClose });

  return (
    <form onSubmit={handleSubmit()}>
      <Grid container spacing={3} sx={{ pt: 1 }}>
        <Grid item xs={12}>
          <MainCard divider title={'Update Category'}>
            <FormSection<CategoryUpdateFormDataType> fields={categoryUpdateFields} control={control} errors={errors} />
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
