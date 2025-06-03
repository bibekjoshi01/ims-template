import { Button, Grid } from '@mui/material';

// UI Components
import FormSection from '@/components/app-form/FormSection';
import MainCard from '@/components/cards/MainCard';

import useUpdateProduct from '../../hooks/useUpdateProduct';
import { IProductDetails } from '../../redux/types';
import { TProductUpdateFormDataType } from './config';

export interface IProductUpdateFormProps {
  productData?: IProductDetails;
  onClose?: () => void;
}

export default function ProductUpdateForm({ productData, onClose }: IProductUpdateFormProps) {
  const { control, errors, formFields, handleSubmit } = useUpdateProduct({ productData, onClose });

  return (
    <form onSubmit={handleSubmit()}>
      <Grid container spacing={3} sx={{ pt: 1 }}>
        <Grid item xs={12}>
          <MainCard divider title={'Update Product'}>
            <FormSection<TProductUpdateFormDataType> fields={formFields} control={control} errors={errors} />
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
