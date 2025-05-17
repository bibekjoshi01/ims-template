import { strengthColor, strengthIndicator } from '@/utils/functions/password-strength';
import { Box, Typography } from '@mui/material';

const PasswordStrengthCapsules = ({ password }: { password: string }) => {
  const passStrength = password.length > 0 ? strengthIndicator(password) : 0;
  const passStrengthData = strengthColor(passStrength);

  return (
    <Box mt={1}>
      <Box display="flex" gap={1} mb={1}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 20,
              height: 6,
              borderRadius: '4px',
              backgroundColor: i < passStrength ? passStrengthData.color : 'grey.300'
            }}
          />
        ))}
      </Box>
      <Typography variant="subtitle2" sx={{ color: passStrengthData.color }}>
        {passStrengthData.label} Password
      </Typography>
    </Box>
  );
};

export default PasswordStrengthCapsules;
