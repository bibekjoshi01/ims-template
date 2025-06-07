import FormSection from '@/components/app-form/FormSection';
import MainCard from '@/components/cards/MainCard';
import { Button, Grid } from '@mui/material';
import useCreateCustomer from '../../hooks/useCreateCustomer';
import { TCustomerCreateFormDataType } from './config';

export interface ICustomerCreateFormProps {
  onClose?: () => void;
}

export default function CustomerCreateForm({ onClose }: ICustomerCreateFormProps) {
  const { control, errors, watch, customerCreateFields, handleSubmit } = useCreateCustomer({ onClose });

  const formValues = watch();

  return (
    <form onSubmit={handleSubmit()} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard divider title="Create New Customer">
            <FormSection<TCustomerCreateFormDataType>
              fields={customerCreateFields}
              control={control}
              errors={errors}
              formValues={formValues}
            />
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
