// PACKAGE IMPORTS
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// PROJECT IMPORTS
import AppDialog from '@/components/app-dialog';

// LOCAL IMPORTS
import { useRetrieveCustomerQuery } from '../../redux/customer.api';
import { customerState } from '../../redux/customer.selector';
import { clearViewId, setEdit } from '../../redux/customer.slice';
import CustomerUpdateForm from './Form';

const CustomerEditModal = () => {
  const dispatch = useDispatch();
  const { edit, currentId } = useSelector(customerState);

  // Only fetch when we have a valid ID and are in edit mode
  const { data: customerData, isLoading } = useRetrieveCustomerQuery(currentId, { skip: !currentId || !edit });

  // If the either of value is not set, we don't need to show the modal
  if (!currentId || !edit) {
    return null;
  }

  const handleClose = () => {
    dispatch(setEdit(false));
    dispatch(clearViewId());
  };

  return (
    <AppDialog
      open={edit}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      content={
        isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <CircularProgress />
          </div>
        ) : (
          <CustomerUpdateForm customerData={customerData} onClose={handleClose} />
        )
      }
    />
  );
};

export default CustomerEditModal;
