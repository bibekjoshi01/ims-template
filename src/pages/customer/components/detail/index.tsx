// PACKAGE IMPORTS
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// PROJECT IMPORTS
import AppDialog from '@/components/app-dialog';

// LOCAL IMPORTS
import { useRetrieveCustomerQuery } from '../../redux/customer.api';
import { customerState } from '../../redux/customer.selector';
import { clearViewId } from '../../redux/customer.slice';
import DetailView from './DetailView';

const CustomerDetailsModal = () => {
  const dispatch = useDispatch();
  const { viewId } = useSelector(customerState);

  // Only fetch when we have a valid ID of customer
  const { data: customerData, isLoading } = useRetrieveCustomerQuery(viewId, { skip: !viewId });

  if (!viewId) {
    return null;
  }

  const handleClose = () => {
    dispatch(clearViewId());
  };

  return (
    <AppDialog
      open={!!viewId}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      content={
        isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <CircularProgress />
          </div>
        ) : (
          <DetailView customerData={customerData} onClose={handleClose} />
        )
      }
    />
  );
};

export default CustomerDetailsModal;
