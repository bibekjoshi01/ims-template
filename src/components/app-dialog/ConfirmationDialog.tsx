import { CheckCircleOutline, DeleteOutline, InfoOutlined, WarningAmber } from '@mui/icons-material';
import { Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import React from 'react';

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  message: React.ReactNode;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  variant?: 'error' | 'warning' | 'info' | 'success';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title,
  message,
  confirmButtonText = 'Delete',
  cancelButtonText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  variant = 'error'
}) => {
  // Get variant configuration
  const getVariantConfig = () => {
    switch (variant) {
      case 'error':
        return {
          icon: <DeleteOutline sx={{ fontSize: 32 }} />
        };
      case 'warning':
        return {
          icon: <WarningAmber sx={{ fontSize: 32 }} />
        };
      case 'success':
        return {
          icon: <CheckCircleOutline sx={{ fontSize: 32 }} />
        };
      case 'info':
      default:
        return {
          icon: <InfoOutlined sx={{ fontSize: 32 }} />
        };
    }
  };

  const config = getVariantConfig();

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3
        }
      }}
    >
      <DialogContent sx={{ textAlign: 'center', p: 2 }}>
        {/* Icon Avatar */}
        <Avatar
          sx={{
            width: 80,
            height: 80,
            backgroundColor: `${variant}.lighter`,
            color: `${variant}.400`,
            margin: '0 auto',
            mb: 3
          }}
        >
          {config.icon}
        </Avatar>

        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            mb: 2
          }}
        >
          {title}
        </Typography>

        {/* Message */}
        {message}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1.5 }}>
        <Button
          onClick={onCancel}
          disabled={loading}
          variant="outlined"
          sx={{
            flex: 1,
            py: 1,
            borderColor: 'grey.300',
            color: 'text.secondary',
            '&:hover': {
              borderColor: 'divider',
              backgroundColor: 'action.hover',
              color: 'text.secondary'
            }
          }}
        >
          {cancelButtonText}
        </Button>

        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          color={variant}
          sx={{
            flex: 1,
            py: 1,
            fontWeight: 500,
            color: `common.white`
          }}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : undefined}
        >
          {loading ? 'Processing...' : confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
