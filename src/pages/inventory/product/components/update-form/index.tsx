// PACKAGE IMPORTS
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// PROJECT IMPORTS
import AppDialog from '@/components/app-dialog';

// LOCAL IMPORTS
import { useRetrieveProductQuery } from '../../redux/product.api';
import { productState } from '../../redux/product.selector';
import { clearViewId, setEdit } from '../../redux/product.slice';
import ProductUpdateForm from './Form';

const ProductEditModal = () => {
  const dispatch = useDispatch();
  const { edit, currentId } = useSelector(productState);

  // Only fetch when we have a valid ID and are in edit mode
  const { data: productData, isLoading } = useRetrieveProductQuery(currentId, { skip: !currentId || !edit });

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
          <ProductUpdateForm productData={productData} onClose={handleClose} />
        )
      }
    />
  );
};

export default ProductEditModal;
