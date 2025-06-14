// MUI imports
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  IconButton,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// React imports
import dayjs from 'dayjs';
import React, { forwardRef } from 'react';

// Project imports
import { CustomInputProps, SelectOption } from './types';
import { ErrorForInput, LabelForInput } from './Helpers';
import { useInputHandlers } from './useInputHandlers';

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
    // Destructure container-specific props (like sx, style, className)
    // The rest are intended for the actual input component.
    const { sx, style, inputStyle, className, ...inputProps } = rest;
    const errorId = error ? `${name}-error-text` : undefined;
    const theme = useTheme();

    const {
      setRef,
      internalRef,
      valueSelected,
      imagePreview,
      handleImageChange,
      handleRemoveImage,
      renderPasswordVisibility,
      handleSelectChange
    } = useInputHandlers({
      ref,
      externalRef,
      name,
      value,
      onChange,
      multipleChips,
      showPassword,
      handleToggleVisibility
    });

    switch (type) {
      case 'select':
        return (
          <Box sx={sx} style={style} className={className}>
            <LabelForInput label={label} name={name} required={required} />
            <Select
              variant="outlined"
              name={name}
              value={value ?? ''}
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
                                fontSize: (theme) => theme.typography.body2.fontSize,
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
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        sx={option?.sx}
                        onClick={(e) => {
                          if (!multipleChips && value === option.value) {
                            // to support deselect on re-click
                            e.stopPropagation();
                            onChange({ target: { name, value: '' } });
                          }
                        }}
                      >
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

      case 'radio':
        return (
          <Box sx={sx} style={style} className={className}>
            <LabelForInput label={label} name={name} required={required} />
            <RadioGroup
              name={name}
              value={value}
              onChange={(e) => {
                const rawValue = e.target.value;
                if (rawValue === 'true') return onChange(true);
                if (rawValue === 'false') return onChange(false);
                return onChange(rawValue);
              }}
              ref={setRef}
              aria-describedby={errorId}
              sx={{ ...inputStyle }}
            >
              {options?.map((option: SelectOption) => (
                <FormControlLabel key={option.value} value={option.value} control={<Radio {...inputProps} />} label={option.label} />
              ))}
            </RadioGroup>
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
                          size="small"
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
                          size="small"
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
                    {imageSize >= 80 && (
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Upload photo
                      </Typography>
                    )}
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
              {...renderPasswordVisibility(name)}
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

      case 'number':
        return (
          <Box sx={sx} style={style} className={className}>
            <LabelForInput label={label} name={name} required={required} />
            <OutlinedInput
              {...(fullwidth ? { fullWidth: true } : {})}
              type="number"
              name={name}
              onChange={(event) => onChange(+event.target.value)}
              value={value}
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
