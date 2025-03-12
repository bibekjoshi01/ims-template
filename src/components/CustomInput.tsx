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
import { useTheme } from '@mui/system';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

/* ------------------------------------------------------------------
   Types
------------------------------------------------------------------ */
type InputType = 'text' | 'select' | 'switch' | 'file' | 'password' | 'date' | string;

export interface SelectOption {
  label: string;
  value: any;
  src?: string;
  sx?: any;
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
  /** Change fullwidth */
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
  /** Reference to the input element */
  inputRef?: React.Ref<any>;
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
const CustomInput = forwardRef<any, CustomInputProps>(
  (
    {
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
      inputRef: externalRef,
      ...rest
    },
    ref
  ) => {
    // Internal ref for the input element
    const internalRef = useRef<any>(null);

    // Expose the internal ref to both the external ref and the forwardRef
    useImperativeHandle(ref, () => internalRef.current);

    // Merge refs to handle both forwardRef and inputRef prop
    const setRef = (element: any) => {
      internalRef.current = element;

      // Handle the inputRef prop if provided
      if (typeof externalRef === 'function') {
        externalRef(element);
      } else if (externalRef) {
        (externalRef as React.MutableRefObject<any>).current = element;
      }
    };

    // Destructure container-specific props (like sx, style, className)
    // The rest are intended for the actual input component.
    const { sx, style, inputStyle, className, ...inputProps } = rest;
    const errorId = error ? `${name}-error-text` : undefined;
    const theme = useTheme();

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
              inputRef={setRef}
              renderValue={(selected) => {
                const selectedOption = options?.find((opt: SelectOption) => opt.value === selected);
                return (
                  <Box
                    sx={{
                      display: 'inline-flex',
                      ...(selectedOption?.sx
                        ? {
                            backgroundColor: selectedOption.sx['& .MuiBox-root']?.backgroundColor,
                            color: selectedOption.sx['& .MuiBox-root']?.color,
                            // FIXME - Handle Theme properly
                            //@ts-ignore
                            fontSize: theme.typography.body2.fontSize,
                            borderRadius: '4px',
                            padding: '2px 10px',
                            maxWidth: 'fit-content'
                          }
                        : {})
                    }}
                  >
                    {selectedOption?.src && (
                      <img
                        loading="lazy"
                        src={selectedOption.src}
                        srcSet={`${selectedOption.src} 2x`}
                        alt="flag"
                        style={{ height: '14px', aspectRatio: 1, objectFit: 'fill', marginRight: '4px' }}
                      />
                    )}
                    {selectedOption?.label}
                  </Box>
                );
              }}
              sx={{
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center'
                },
                ...inputStyle
              }}
              {...inputProps}
            >
              {options?.map((option: SelectOption) => (
                <MenuItem key={option.value} value={option.value} sx={option?.sx}>
                  <Box
                    sx={{
                      width: '100%',
                      ...(option?.sx
                        ? {
                            backgroundColor: option.sx['& .MuiBox-root']?.backgroundColor,
                            color: option.sx['& .MuiBox-root']?.color
                          }
                        : {}),
                      // @ts-ignore
                      fontSize: theme.typography.body2.fontSize,
                      maxWidth: 'fit-content',
                      padding: '1px 10px',
                      borderRadius: '4px'
                    }}
                  >
                    {option.src && (
                      <img
                        loading="lazy"
                        src={option.src}
                        srcSet={`${option.src} 2x`}
                        alt="flag"
                        style={{ height: '14px', aspectRatio: 1, objectFit: 'fill', marginRight: '4px' }}
                      />
                    )}
                    {option.label}
                  </Box>
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
            <Switch
              name={name}
              checked={Boolean(value)}
              onChange={onChange}
              aria-describedby={errorId}
              sx={{ ...inputStyle }}
              inputRef={setRef}
              {...inputProps}
            />
            <ErrorForInput error={error} helperText={helperText} />
            {children}
          </Box>
        );

      case 'file':
        return (
          <Box sx={sx} style={style} className={className}>
            <LabelForInput label={label} name={name} />
            <input
              type="file"
              name={name}
              onChange={onChange}
              style={{ ...inputStyle }}
              ref={setRef}
              {...inputProps}
              aria-describedby={errorId}
            />
            <ErrorForInput error={error} helperText={helperText} />
            {children}
          </Box>
        );

      case 'checkbox':
        return (
          <Box sx={sx} style={style} className={className}>
            <LabelForInput label={label} name={name} />
            <Checkbox
              name={name}
              checked={Boolean(value)}
              onChange={onChange}
              aria-describedby={errorId}
              sx={{ ...inputStyle }}
              inputRef={setRef}
              {...inputProps}
            />
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
              inputRef={setRef}
              sx={{ ...inputStyle }}
              {...inputProps}
            />
            <ErrorForInput error={error} helperText={helperText} />
            {children}
          </Box>
        );

      case 'date':
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={sx} style={style} className={className}>
              <LabelForInput label={label} name={name} />
              <DatePicker
                value={value ? dayjs(value) : null} // Convert the value to a dayjs object or null
                onChange={(newValue: dayjs.Dayjs | null) => {
                  if (onChange) {
                    const event = {
                      target: {
                        name: name,
                        value: newValue ? newValue.toISOString() : ''
                      }
                    } as React.ChangeEvent<HTMLInputElement>;
                    onChange(event); // Pass the event-like object to parent
                  }
                }}
                aria-describedby={errorId}
                inputRef={setRef}
                {...(fullwidth ? { fullWidth: true, error } : {})}
              />
              <ErrorForInput error={error} helperText={helperText} />
              {children}
            </Box>
          </LocalizationProvider>
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
              inputRef={setRef}
              sx={{ ...inputStyle }}
              {...inputProps}
            />
            <ErrorForInput error={error} helperText={helperText} />
            {children}
          </Box>
        );
    }
  }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
