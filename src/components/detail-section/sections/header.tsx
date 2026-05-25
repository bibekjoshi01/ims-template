import { CancelOutlined, CheckCircleOutlined } from '@mui/icons-material';
import { Avatar, Box, Chip, Typography } from '@mui/material';

export const Header: React.FC<{ title: string; avatar?: string; status?: 'active' | 'inactive' }> = ({ title, avatar, status }) => (
  <Box
    sx={{
      p: 2,
      display: 'flex',
      gap: 1,
      alignItems: 'center',
      flexDirection: { xs: 'column', sm: 'row' },
      borderBottom: 1,
      borderColor: 'divider'
    }}
  >
    {avatar && (
      <Avatar src={avatar} alt={title} sx={{ width: 72, height: 72, mr: 3 }}>
        {title.charAt(0)}
      </Avatar>
    )}
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h4">{title}</Typography>
      {status && (
        <Box sx={{ mt: 1 }}>
          <Chip
            size="small"
            variant="outlined"
            color={status === 'active' ? 'success' : 'error'}
            label={status === 'active' ? 'Active' : 'Inactive'}
            icon={status === 'active' ? <CheckCircleOutlined fontSize="small" /> : <CancelOutlined fontSize="small" />}
            sx={{ mr: 1, p: 1.5, fontWeight: 500, borderRadius: 1 }}
          />
        </Box>
      )}
    </Box>
  </Box>
);
