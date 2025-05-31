import { Typography } from '@mui/material';
import { FieldErrors } from 'react-hook-form';

interface MatchIndicatorProps {
  errors: FieldErrors;
  confirmPassword: string;
  newPasswordValue: string;
}

const MatchIndicator = ({ errors, confirmPassword, newPasswordValue }: MatchIndicatorProps) => {
  return confirmPassword.length > 0 ? (
    confirmPassword === newPasswordValue ? (
      <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
        Passwords Match
      </Typography>
    ) : (
      !errors.confirmPassword && (
        // either show schema error or custom error (only one at a time)
        <Typography variant="subtitle2" sx={{ color: 'error.main' }}>
          Passwords do not match
        </Typography>
      )
    )
  ) : null;
};

export default MatchIndicator;
