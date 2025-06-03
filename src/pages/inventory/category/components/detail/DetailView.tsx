// MUI Imports
import { Close } from '@mui/icons-material';
import { Avatar, Box, CircularProgress, IconButton, Paper, Typography } from '@mui/material';

// PROJECT IMPORTS
import DefaultImage from '@/assets/images/users/avatar-1.png';
import MainCard from '@/components/cards/MainCard';
import DynamicInfoSection from '@/components/detail-section';
import { DynamicInfoSectionProps } from '@/components/detail-section/types';
import { ICategoryDetails } from '../../redux/types';
import { viewCategoryConfig } from './config';

interface IDetailViewProps {
  categoryData: ICategoryDetails | undefined;
  onClose: () => void;
}

const DetailView: React.FC<IDetailViewProps> = ({ categoryData, onClose }) => {
  if (!categoryData) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" mb={3}>
          Category Details Not Found
        </Typography>
        <CircularProgress />
      </Paper>
    );
  }

  const DynamicInfoSectionProps: DynamicInfoSectionProps = {
    ...viewCategoryConfig,
    data: categoryData
  };

  return (
    <MainCard sx={{ p: 0, overflow: 'hidden', position: 'relative' }}>
      {/* Close Button */}
      <IconButton onClick={onClose} aria-label="close" size="small" sx={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }}>
        <Close />
      </IconButton>

      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          flexDirection: { xxs: 'column', xs: 'row' },
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Avatar src={categoryData?.icon ?? DefaultImage} alt={categoryData?.name} sx={{ width: 72, height: 72, mr: 3 }}>
          {categoryData?.name?.charAt(0) || categoryData?.code?.charAt(0) || 'C'}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h4">{categoryData?.name || 'Unknown Category'}</Typography>
        </Box>
      </Box>

      {/* Info Content */}
      <Box sx={{ px: { xxs: 0, xs: 2 }, py: 1 }}>
        <DynamicInfoSection {...DynamicInfoSectionProps} />
      </Box>
    </MainCard>
  );
};

export default DetailView;
