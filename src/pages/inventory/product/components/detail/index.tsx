// PACKAGE IMPORTS
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// PROJECT IMPORTS
import AppDialog from '@/components/app-dialog';

// LOCAL IMPORTS
import { useRetrieveProductQuery } from '../../redux/product.api';
import { productState } from '../../redux/product.selector';
import { clearViewId } from '../../redux/product.slice';
import DetailView from './DetailView';

const ProductDetailsModal = () => {
  const dispatch = useDispatch();
  const { viewId } = useSelector(productState);

  // Only fetch when we have a valid ID of product
  const { data: productData, isLoading } = useRetrieveProductQuery(viewId, { skip: !viewId });

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
          <DetailView productData={productData} onClose={handleClose} />
        )
      }
    />
  );
};

export default ProductDetailsModal;
