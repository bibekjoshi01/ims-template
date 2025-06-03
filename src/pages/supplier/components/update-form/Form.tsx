import { Button, Grid } from '@mui/material';

// PROJECT IMPORTS
import FormSection from '@/components/app-form/FormSection';
import MainCard from '@/components/cards/MainCard';

// LOCAL IMPORTS
import useUpdateSupplier from '../../hooks/useUpdateSupplier';
import { ISupplierDetails } from '../../redux/types';
import { TSupplierUpdateFormDataType } from './config';

export interface ISupplierUpdateFormProps {
  supplierData?: ISupplierDetails;
  onClose?: () => void;
}

export default function SupplierUpdateForm({ supplierData, onClose }: ISupplierUpdateFormProps) {
  const { control, errors, supplierUpdateFields, handleSubmit } = useUpdateSupplier({ supplierData, onClose });

  return (
    <form onSubmit={handleSubmit()}>
      <Grid container spacing={3} sx={{ pt: 1 }}>
        <Grid item xs={12}>
          <MainCard divider title={'Update Supplier'}>
            <FormSection<TSupplierUpdateFormDataType> fields={supplierUpdateFields} control={control} errors={errors} />
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
