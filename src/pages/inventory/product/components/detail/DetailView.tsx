// MUI Imports
import { Close } from '@mui/icons-material';
import { Avatar, Box, CircularProgress, IconButton, Paper, Typography } from '@mui/material';

// PROJECT IMPORTS
import DefaultImage from '@/assets/images/users/avatar-1.png';
import MainCard from '@/components/cards/MainCard';
import DynamicInfoSection from '@/components/detail-section';
import { DynamicInfoSectionProps } from '@/components/detail-section/types';
import { IProductDetails } from '../../redux/types';
import { viewProductConfig } from './config';

interface IDetailViewProps {
  productData: IProductDetails | undefined;
  onClose: () => void;
}

const DetailView: React.FC<IDetailViewProps> = ({ productData, onClose }) => {
  if (!productData) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" mb={3}>
          Product Details Not Found
        </Typography>
        <CircularProgress />
      </Paper>
    );
  }

  const DynamicInfoSectionProps: DynamicInfoSectionProps = {
    ...viewProductConfig,
    data: productData
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
        <Avatar src={productData?.image ?? DefaultImage} alt={productData?.name} sx={{ width: 72, height: 72, mr: 3 }}>
          {productData?.name?.charAt(0) || 'P'}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h4">{productData?.name || 'Unknown Product'}</Typography>
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
