// material-ui
import { alpha, Theme } from '@mui/material/styles';

// ==============================|| DEFAULT THEME - CUSTOM SHADOWS ||============================== //

interface CustomShadows {
  button: string;
  text: string;
  z1: string;
  primary: string;
  secondary: string;
  error: string;
  warning: string;
  info: string;
  success: string;
  primaryButton: string;
  secondaryButton: string;
  errorButton: string;
  warningButton: string;
  infoButton: string;
  successButton: string;
}

export default function CustomShadows(theme: Theme): CustomShadows {
  return {
    button: `0 2px #0000000b`,
    text: `0 -1px 0 rgb(0 0 0 / 12%)`,
    z1: `0px 2px 8px ${alpha(theme.palette.grey[900], 0.15)}`,
    primary: `0px 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
    secondary: `0px 2px 8px ${alpha(theme.palette.secondary.main, 0.2)}`,
    error: `0px 2px 8px ${alpha(theme.palette.error.main, 0.2)}`,
    warning: `0px 2px 8px ${alpha(theme.palette.warning.main, 0.2)}`,
    info: `0px 2px 8px ${alpha(theme.palette.info.main, 0.2)}`,
    success: `0px 2px 8px ${alpha(theme.palette.success.main, 0.2)}`,
    primaryButton: `0px 8px 16px ${alpha(theme.palette.primary.main, 0.24)}`,
    secondaryButton: `0px 8px 16px ${alpha(theme.palette.secondary.main, 0.24)}`,
    errorButton: `0px 8px 16px ${alpha(theme.palette.error.main, 0.24)}`,
    warningButton: `0px 8px 16px ${alpha(theme.palette.warning.main, 0.24)}`,
    infoButton: `0px 8px 16px ${alpha(theme.palette.info.main, 0.24)}`,
    successButton: `0px 8px 16px ${alpha(theme.palette.success.main, 0.24)}`
  };
}
