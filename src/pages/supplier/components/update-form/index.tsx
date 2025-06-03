// PACKAGE IMPORTS
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// PROJECT IMPORTS
import AppDialog from '@/components/app-dialog';

// LOCAL IMPORTS
import { useRetrieveSupplierQuery } from '../../redux/supplier.api';
import { supplierState } from '../../redux/supplier.selector';
import { clearViewId, setEdit } from '../../redux/supplier.slice';
import SupplierUpdateForm from './Form';

const SupplierEditModal = () => {
  const dispatch = useDispatch();
  const { edit, currentId } = useSelector(supplierState);

  // Only fetch when we have a valid ID and are in edit mode
  const { data: supplierData, isLoading } = useRetrieveSupplierQuery(currentId, { skip: !currentId || !edit });

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
          <SupplierUpdateForm supplierData={supplierData} onClose={handleClose} />
        )
      }
    />
  );
};

export default SupplierEditModal;
