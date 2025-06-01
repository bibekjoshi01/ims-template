import React from 'react';
import Typography from '@mui/material/Typography';
import { FormHelperText } from '@mui/material';

/* ------------------------------------------------------------------
   Helper: LabelForInput
------------------------------------------------------------------ */
export const LabelForInput = React.memo(({ name, label, required }: { name: string; label?: string; required?: boolean }) =>
  label ? (
    <Typography variant="body1" sx={{ mb: 1 }}>
      <label htmlFor={name}>
        {label}
        {required && (
          <Typography variant="caption" sx={{ display: 'inline' }} color="error.main">
            *
          </Typography>
        )}
      </label>
    </Typography>
  ) : null
);

/* ------------------------------------------------------------------
   Helper: ErrorForInput
------------------------------------------------------------------ */
export const ErrorForInput = React.memo(({ error, helperText }: { error?: boolean; helperText?: string }) =>
  error && helperText ? <FormHelperText error>{helperText}</FormHelperText> : null
);
