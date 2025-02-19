import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  FormHelperText,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  Typography
} from '@mui/material';
import React from 'react';

/* ------------------------------------------------------------------
   Types
------------------------------------------------------------------ */
type InputType = 'text' | 'select' | 'switch' | 'file' | 'password' | string;

export interface SelectOption {
  label: string;
  value: any;
  src?: string;
}

export interface CustomInputProps {
  /** Input type: text, email, number, select, switch, file, password, etc. */
  type?: InputType;
  /** Name attribute for the input element */
  name: string;
  /** Label to display above the input */
  label?: string;
  /** Controlled value of the input */
  value: any;
  /** Change handler */
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => void;
  fullwidth?: boolean;
  /** Options for select inputs */
  options?: SelectOption[];
  /** Renders a multiline input if true */
  multiline?: boolean;
  /** Number of rows to display if multiline is true */
  rows?: number;
  /** Whether the input has an error */
  error?: boolean;
  /** Helper text to display error message */
  helperText?: string;
  /** Show password visibility toggle */
  showPassword?: Record<string, boolean>;
  /** Handle password visibility toggle */
  handleToggleVisibility?: (field: keyof CustomInputProps['showPassword']) => void;
  /** Additional elements to render inside the input container */
  children?: React.ReactNode;
  /** Additional props (will be split between container and input) */
  [key: string]: any;
}

/* ------------------------------------------------------------------
   Helper: LabelForInput
------------------------------------------------------------------ */
const LabelForInput = React.memo(({ name, label }: { name: string; label?: string }) =>
  label ? (
    <Typography variant="body1" sx={{ mb: 1 }}>
      <label htmlFor={name}>{label}</label>
    </Typography>
  ) : null
);
/* ------------------------------------------------------------------
   Helper: ErrorForInput
------------------------------------------------------------------ */
const ErrorForInput = React.memo(({ error, helperText }: { error?: boolean; helperText?: string }) =>
  error && helperText ? <FormHelperText error>{helperText}</FormHelperText> : null
);

/* ------------------------------------------------------------------
   CustomInput Component
------------------------------------------------------------------ */
const CustomInput: React.FC<CustomInputProps> = ({
  type = 'text',
  name,
  label,
  value,
  onChange,
  options,
  multiline = false,
  rows = 1,
  fullwidth = true,
  error,
  helperText,
  showPassword,
  handleToggleVisibility,
  children,
  ...rest
}) => {
  // Destructure container-specific props (like sx, style, className)
  // The rest are intended for the actual input component.
  const { sx, style, className, ...inputProps } = rest;
  const errorId = error ? `${name}-error-text` : undefined;
  const renderPasswordVisibility = (field: keyof typeof showPassword) => ({
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => handleToggleVisibility?.(field)} onMouseDown={(e) => e.preventDefault()}>
          {showPassword && showPassword[field] ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    )
  });

  switch (type) {
    case 'select':
      return (
        <Box sx={sx} style={style} className={className}>
          <LabelForInput label={label} name={name} />
          <Select
            variant="outlined"
            name={name}
            value={value}
            onChange={onChange}
            error={error}
            aria-describedby={errorId}
            {...(fullwidth ? { fullWidth: true } : {})}
            {...inputProps}
            sx={{
              '.MuiSelect-select': {
                display: "flex",
                alignItems: "center",
              }
            }}
          >
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.src && (
                  <img loading="lazy" src={option.src} srcSet={`${option.src} 2x`} alt="flag" style={{ height: "14px", aspectRatio: 1, objectFit: "fill", marginRight: "4px"}} />
                )}
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <ErrorForInput error={error} helperText={helperText} />
          {children}
        </Box>
      );

    case 'switch':
      return (
        <Box sx={sx} style={style} className={className}>
          <LabelForInput label={label} name={name} />
          <Switch name={name} checked={Boolean(value)} onChange={onChange} aria-describedby={errorId} {...inputProps} />
          <ErrorForInput error={error} helperText={helperText} />
          {children}
        </Box>
      );

    case 'file':
      return (
        <Box sx={sx} style={style} className={className}>
          <LabelForInput label={label} name={name} />
          <input type="file" name={name} onChange={onChange} {...inputProps} aria-describedby={errorId} />
          <ErrorForInput error={error} helperText={helperText} />
          {children}
        </Box>
      );

    case 'checkbox':
      return (
        <Box sx={sx} style={style} className={className}>
          <LabelForInput label={label} name={name} />
          <Checkbox name={name} checked={Boolean(value)} onChange={onChange} aria-describedby={errorId} {...inputProps} />
          <ErrorForInput error={error} helperText={helperText} />
          {children}
        </Box>
      );

    case 'password':
      return (
        <Box sx={sx} style={style} className={className}>
          <LabelForInput label={label} name={name} />
          <OutlinedInput
            {...(fullwidth ? { fullWidth: true } : {})}
            type={showPassword?.[name] ? 'text' : 'password'}
            name={name}
            value={value}
            onChange={onChange}
            {...renderPasswordVisibility(name as keyof typeof showPassword)}
            error={error}
            {...inputProps}
          />
          <ErrorForInput error={error} helperText={helperText} />
          {children}
        </Box>
      );

    default:
      return (
        <Box sx={sx} style={style} className={className}>
          <LabelForInput label={label} name={name} />
          <OutlinedInput
            {...(fullwidth ? { fullWidth: true } : {})}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            multiline={multiline}
            rows={rows}
            error={error}
            aria-describedby={errorId}
            {...inputProps}
          />
          <ErrorForInput error={error} helperText={helperText} />
          {children}
        </Box>
      );
  }
};

export default CustomInput;
