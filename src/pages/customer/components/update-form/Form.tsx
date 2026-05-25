import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';

// UI Components
import MainCard from '@/components/cards/MainCard';
import FormSection from '@/components/app-form/FormSection';

// PROJECT IMPORTS
import useUpdateCustomer from '../../hooks/useUpdateCustomer';
import { TCustomerUpdateFormDataType } from './config';
import { ICustomerDetails } from '../../redux/types';

export interface ICustomerUpdateFormProps {
  customerData?: ICustomerDetails;
  onClose?: () => void;
}

export default function CustomerUpdateForm({ customerData, onClose }: ICustomerUpdateFormProps) {
  const { control, errors, watch, formFields, handleSubmit } = useUpdateCustomer({ customerData, onClose });

  const formValues = watch();

  return (
    <form onSubmit={handleSubmit()} noValidate>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <MainCard divider title="Update Customer">
            <FormSection<TCustomerUpdateFormDataType> fields={formFields} control={control} errors={errors} formValues={formValues} />
          </MainCard>
        </Grid>

        <Grid sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, flexWrap: 'wrap' }} size={{ xs: 12 }}>
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={Object.keys(errors).length > 0}>
            Update
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
