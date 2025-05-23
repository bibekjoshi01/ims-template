// MUI Imports
import { CancelOutlined, CheckCircleOutline } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Typography } from '@mui/material';

// React Imports
import { ReactNode } from 'react';

// Props
interface InfoCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  verified?: boolean;
  chipColor?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

// InfoCard Component:
// This component displays an information card with an icon, title, value, and optional verified status.
const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value, verified, chipColor }) => (
  <Card variant="outlined" sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', mb: 1, flexWrap: 'wrap' }}>
        <Box sx={{ color: 'primary.main', mr: 1 }}>{icon}</Box>
        <Typography variant="subtitle1" color="text.secondary">
          {title}
        </Typography>
        {verified !== undefined && (
          <Chip
            size="small"
            variant="outlined"
            label={verified ? 'Verified' : 'Unverified'}
            color={verified ? 'success' : 'default'}
            icon={verified ? <CheckCircleOutline fontSize="small" /> : <CancelOutlined fontSize="small" />}
            sx={{
              ml: { xxs: 1, xs: 'auto' },
              mr: 1,
              fontWeight: 500,
              borderRadius: 1
            }}
          />
        )}
      </Box>
      {chipColor ? (
        <Chip label={value} color={chipColor} sx={{ mt: 1 }} />
      ) : (
        <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
          {value || 'N/A'}
        </Typography>
      )}
    </CardContent>
  </Card>
);

export default InfoCard;
