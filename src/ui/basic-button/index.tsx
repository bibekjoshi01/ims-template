import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import React from 'react';

interface AppButtonProps {
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'primary' | 'inherit' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isIconButton?: boolean;
  children: React.ReactNode;
  loading?: boolean; // Custom prop for showing a loader
  shape?: 'rounded' | 'circle'; // Custom shape for icon buttons
}

const AppButton: React.FC<AppButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  startIcon,
  endIcon,
  onClick,
  className,
  isIconButton = false,
  children,
  loading = false,
  shape = 'rounded'
}) => {
  if (isIconButton) {
    return (
      <IconButton
        color={color}
        onClick={onClick}
        disabled={disabled || loading}
        className={className}
        sx={{
          borderRadius: shape === 'circle' ? '50%' : '8px',
          width: size === 'small' ? 32 : size === 'large' ? 48 : 40,
          height: size === 'small' ? 32 : size === 'large' ? 48 : 40
        }}
      >
        {loading ? <CircularProgress size={20} /> : children}
      </IconButton>
    );
  }

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      startIcon={!loading ? startIcon : <CircularProgress size={20} />}
      endIcon={endIcon}
      onClick={onClick}
      className={className}
    >
      {!loading ? children : 'Loading...'}
    </Button>
  );
};

export default AppButton;
