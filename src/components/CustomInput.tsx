import { Visibility, VisibilityOff } from '@mui/icons-material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {
  Box,
  Checkbox,
  Chip,
  FormHelperText,
  IconButton,
  InputAdornment,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

/* ------------------------------------------------------------------
   Types
------------------------------------------------------------------ */
type InputType = 'text' | 'select' | 'switch' | 'file' | 'image' | 'password' | 'date' | string;

export interface SelectOption {
  label: string;
  value: any;
  src?: string;
  sx?: any;
  groupName?: string;
}

export interface CustomInputProps {
  /** Input type: text, email, number, select, switch, file, image, password, etc. */
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
  /** Image preview size (for image type) */
  imageSize?: number;
  /** To show '*' for required fields */
  required?: boolean;
  /** Label for true value of checkbox */
  trueLabel?: string;
  /** Label for false value of checkbox */
  falseLabel?: string;
  /** Whether the input allows multiple selections (for select type with chips) */
  multipleChips?: boolean;
  /** Additional elements to render inside the input container */
  children?: React.ReactNode;
  /** Reference to the input element */
  inputRef?: React.Ref<any>;
  placeholder?: string;
  /** Additional props (will be split between container and input) */
  [key: string]: any;
}

/* ------------------------------------------------------------------
   Helper: LabelForInput
------------------------------------------------------------------ */
const LabelForInput = React.memo(({ name, label, required }: { name: string; label?: string; required?: boolean }) =>
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
      defaultImage,
      imageSize = 100,
      required = false,
      trueLabel,
      falseLabel,
      multipleChips = false,
      children,
      placeholder,
      inputRef: externalRef,
      ...rest
    },
    ref
  ) => {
    // Internal ref for the input element
    const internalRef = useRef<any>(null);
    // This is a workaround to make better ui after selecting a value for multiple chips
    const valueSelected = multipleChips ? Array.isArray(value) && value.length > 0 : value !== null && value !== undefined;

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

    // State for image preview
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Handle image change
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);

        // Create a synthetic event with file and URL for the parent component
        const synthEvent = {
          target: {
            name,
            value: file,
            files: event.target.files
          }
        };

        onChange(synthEvent);
      }
    };

    // Handle image removal
    const handleRemoveImage = () => {
      setImagePreview(null);

      // Create a synthetic event for the parent component
      const synthEvent = {
        target: {
          name,
          value: '',
          files: null
        }
      };

      onChange(synthEvent);

      // Reset the file input
      if (internalRef.current) {
        internalRef.current.value = '';
      }
    };

    const renderPasswordVisibility = (field: keyof typeof showPassword) => ({
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => handleToggleVisibility?.(field)} onMouseDown={(e) => e.preventDefault()}>
            {showPassword && showPassword[field] ? <Visibility sx={{ fontSize: 16 }} /> : <VisibilityOff sx={{ fontSize: 16 }} />}
          </IconButton>
        </InputAdornment>
      )
    });

    switch (type) {
      case 'select':
        return (
          <Box sx={sx} style={style} className={className}>
            <LabelForInput label={label} name={name} required={required} />
            <Select
              variant="outlined"
              name={name}
              value={value}
              onChange={onChange}
              error={error}
              aria-describedby={errorId}
              {...(fullwidth ? { fullWidth: true } : {})}
              inputRef={setRef}
              multiple={multipleChips}
              renderValue={(selected) => {
                const selectedOption = multipleChips
                  ? options?.filter((opt: SelectOption) => selected.includes(opt.value))
                  : options?.find((opt: SelectOption) => opt.value === selected);
                return (
                  <>
                    {multipleChips ? (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value: any) => (
                          <Chip key={value} label={options.find((opt: SelectOption) => opt.value === value)?.label} />
                        ))}
                      </Box>
                    ) : (
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
                    )}
                  </>
                );
              }}
              sx={{
                maxHeight: 300,
                overflowY: 'auto',
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  ...(multipleChips && valueSelected && { padding: '5px' })
                },
                ...inputStyle
              }}
              {...inputProps}
            >
              {(() => {
                const groupedOptions = new Map<string | undefined, SelectOption[]>();

                options?.forEach((option: SelectOption) => {
                  const group = option.groupName || '';
                  if (!groupedOptions.has(group)) {
                    groupedOptions.set(group, []);
                  }
                  groupedOptions.get(group)?.push(option);
                });

                const items: React.ReactNode[] = [];

                groupedOptions.forEach((groupItems, groupName) => {
                  if (groupName) {
                    items.push(<ListSubheader key={`subheader-${groupName}`}>{groupName}</ListSubheader>);
                  }
                  groupItems.forEach((option) => {
                    items.push(
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
                            maxWidth: 'fit-content',
                            padding: '1px 10px',
                            borderRadius: '4px'
                          }}
                        >
                          {option?.src && (
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
                    );
                  });
                });

                return items;
              })()}
            </Select>
            <ErrorForInput error={error} helperText={helperText} />
            {children}
          </Box>
        );

      case 'switch':
        return (
          <Box sx={sx} style={style} className={className}>
            <LabelForInput label={label} name={name} required={required} />
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
            <LabelForInput label={label} name={name} required={required} />
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

      case 'image':
        return (
          <Box sx={sx} style={style} className={className}>
            <LabelForInput label={label} name={name} required={required} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                width: fullwidth ? '100%' : 'auto'
              }}
            >
              {/* Image Preview Container */}
              <Box
                sx={{
                  width: imageSize,
                  height: imageSize,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1,
                  overflow: 'hidden',
                  position: 'relative',
                  borderRadius: theme.shape.borderRadius,
                  borderStyle: 'dashed',
                  borderColor: error
                    ? theme.palette.error.main
                    : theme.palette.mode === 'dark'
                      ? theme.palette.grey.dark
                      : theme.palette.grey.lighter,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
                    backgroundColor: theme.palette.grey[50]
                  }
                }}
                onClick={() => internalRef.current?.click()}
              >
                {imagePreview || value ? (
                  <>
                    {/* Image Preview */}
                    <img
                      src={imagePreview || value}
                      alt="Preview"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />

                    {/* Overlay with actions */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'rgba(0, 0, 0, 0.5)',
                        opacity: 0,
                        transition: 'opacity 0.2s ease-in-out',
                        '&:hover': {
                          opacity: 1
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <IconButton
                          size="medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            internalRef.current?.click();
                          }}
                          sx={{
                            color: 'white',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
                          }}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          size="medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage();
                          }}
                          sx={{
                            color: 'white',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </>
                ) : (
                  // Empty state - upload prompt
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 2,
                      textAlign: 'center'
                    }}
                  >
                    <AddPhotoAlternateIcon sx={{ fontSize: 28, mb: 1, color: theme.palette.text.secondary }} />
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      Click to upload photo
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Hidden File Input */}
              <input
                type="file"
                name={name}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
                ref={setRef}
                {...inputProps}
                aria-describedby={errorId}
              />
            </Box>
            <ErrorForInput error={error} helperText={helperText} />
            {children}
          </Box>
        );

      case 'checkbox':
        return (
          <Box sx={sx} style={style} className={className}>
            <LabelForInput label={label} name={name} required={required} />
            <Checkbox
              name={name}
              checked={Boolean(value)}
              onChange={onChange}
              aria-describedby={errorId}
              sx={{ ...inputStyle, scale: 0.85 }}
              inputRef={setRef}
              {...inputProps}
            />
            <Typography variant="body1" sx={{ ml: 1, display: 'inline-flex' }}>
              {value ? trueLabel : falseLabel}
            </Typography>
            <ErrorForInput error={error} helperText={helperText} />
            {children}
          </Box>
        );

      case 'password':
        return (
          <Box sx={sx} style={style} className={className}>
            <LabelForInput label={label} name={name} required={required} />
            <OutlinedInput
              {...(fullwidth ? { fullWidth: true } : {})}
              type={showPassword?.[name] ? 'text' : 'password'}
              name={name}
              value={value}
              onChange={onChange}
              autoComplete="password"
              {...renderPasswordVisibility(name as keyof typeof showPassword)}
              error={error}
              placeholder={placeholder}
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
              <LabelForInput label={label} name={name} required={required} />
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
            <LabelForInput label={label} name={name} required={required} />
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
              placeholder={placeholder}
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
