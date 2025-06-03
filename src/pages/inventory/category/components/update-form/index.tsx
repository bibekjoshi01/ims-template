import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// Components
import CategoryUpdateForm from './Form';
import AppDialog from '@/components/app-dialog';
import { clearViewId, setEdit } from '../../redux/category.slice';
import { productCategoryState } from '../../redux/category.selector';
import { useRetrieveCategoryQuery } from '../../redux/category.api';

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
