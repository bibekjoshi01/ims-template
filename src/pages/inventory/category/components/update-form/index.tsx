// PACKAGE IMPORTS
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// PROJECT IMPORTS
import AppDialog from '@/components/app-dialog';

// LOCAL IMPORTS
import { useRetrieveCategoryQuery } from '../../redux/category.api';
import { productCategoryState } from '../../redux/category.selector';
import { clearViewId, setEdit } from '../../redux/category.slice';
import CategoryUpdateForm from './Form';

const CategoryEditModal = () => {
  const dispatch = useDispatch();
  const { edit, currentId } = useSelector(productCategoryState);

  // Only fetch when we have a valid ID and are in edit mode
  const { data: categoryData, isLoading } = useRetrieveCategoryQuery(currentId, { skip: !currentId || !edit });

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
          <CategoryUpdateForm categoryData={categoryData} onClose={handleClose} />
        )
      }
    />
  );
};

export default CategoryEditModal;
