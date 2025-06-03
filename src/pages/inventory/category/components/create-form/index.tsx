import { Button, Grid } from '@mui/material';
import MainCard from '@/components/cards/MainCard';
import { CategoryCreateFormDataType } from './config';
import FormSection from '@/components/app-form/FormSection';
import useCreateCategory from '../../hooks/useCreateCategory';

export interface CategoryCreateFormProps {
  onClose?: () => void;
}

export default function CategoryCreateForm({ onClose }: CategoryCreateFormProps) {
  const { control, errors, categoryInfoFields, handleSubmit } = useCreateCategory({ onClose });

  return (
    <form onSubmit={handleSubmit()} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard divider title="Create new category">
            <FormSection<CategoryCreateFormDataType> fields={categoryInfoFields} control={control} errors={errors} />
          </MainCard>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={Object.keys(errors).length > 0}>
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
