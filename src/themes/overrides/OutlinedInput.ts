// material-ui
import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - OUTLINED INPUT ||============================== //

export default function OutlinedInput(theme: Theme) {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '10px'
        },
        notchedOutline: {
          borderColor: theme.palette.mode == 'dark' ? theme.palette.grey[700] : theme.palette.grey[100]
        },
        root: {
          '& .MuiOutlinedInput-input': {
            color: 'currentColor !important'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light
          },
          '&.Mui-focused': {
            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
            '& .MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${theme.palette.primary.light}`
            }
          },
          '&.Mui-error': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.error.light
            },
            '&.Mui-focused': {
              boxShadow: `0 0 0 2px ${alpha(theme.palette.error.main, 0.2)}`,
              '& .MuiOutlinedInput-notchedOutline': {
                border: `1px solid ${theme.palette.error.light}`
              }
            }
          },
          '&.MuiInputBase-multiline': {
            padding: '10px'
          }
        },
        inputSizeSmall: {
          padding: '7.5px 8px 7.5px 12px',
          color: 'currentColor'
        },
        inputMultiline: {
          padding: '0'
        }
      }
    }
  };
}
