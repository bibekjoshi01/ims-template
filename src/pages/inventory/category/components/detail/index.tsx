// PACKAGE IMPORTS
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// PROJECT IMPORTS
import AppDialog from '@/components/app-dialog';

// LOCAL IMPORTS
import { useRetrieveCategoryQuery } from '../../redux/category.api';
import { productCategoryState } from '../../redux/category.selector';
import { clearViewId } from '../../redux/category.slice';
import DetailView from './DetailView';

const CategoryDetailsModal = () => {
  const dispatch = useDispatch();
  const { viewId } = useSelector(productCategoryState);

  // Only fetch when we have a valid ID of category
  const { data: categoryData, isLoading } = useRetrieveCategoryQuery(viewId, { skip: !viewId });

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
          <DetailView categoryData={categoryData} onClose={handleClose} />
        )
      }
    />
  );
};

export default CategoryDetailsModal;
