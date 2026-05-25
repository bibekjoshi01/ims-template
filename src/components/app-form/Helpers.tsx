import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, FormHelperText } from '@mui/material';

/* ------------------------------------------------------------------
   Helper: LabelForInput
------------------------------------------------------------------ */
export const LabelForInput = React.memo(({ name, label, required }: { name: string; label?: string; required?: boolean }) =>
  label ? (
    <Typography
      variant="h5"
      sx={{
        fontWeight: 400,
        mb: 1
      }}
    >
      <label htmlFor={name}>
        {label}
        {required && (
          <Typography
            variant="body1"
            sx={{
              color: 'error.main',
              display: 'inline'
            }}
          >
            *
          </Typography>
        )}
      </label>
    </Typography>
  ) : null
);

export const LabelForDynamicSection = React.memo(({ name, label, required }: { name: string; label?: string; required?: boolean }) =>
  label ? (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 400,
          mt: 4
        }}
      >
        <label htmlFor={name}>
          {label}
          {required && (
            <Typography
              variant="body1"
              sx={{
                color: 'error.main',
                display: 'inline'
              }}
            >
              *
            </Typography>
          )}
        </label>
      </Typography>
      <Box sx={{ mt: 2, mb: 4, width: '100%', height: '2px', backgroundColor: (theme) => theme.palette.divider }} />
    </>
  ) : null
);

/* ------------------------------------------------------------------
   Helper: ErrorForInput
------------------------------------------------------------------ */
export const ErrorForInput = React.memo(({ error, helperText }: { error?: boolean; helperText?: string }) =>
  error && helperText ? <FormHelperText error>{helperText}</FormHelperText> : null
);
