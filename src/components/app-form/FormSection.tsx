import CustomInput from '@/components/app-form/CustomInput';
import { Grid } from '@mui/material';
import { Controller, Path } from 'react-hook-form';
import { FormSectionProps } from './types';

export default function FormSection<T extends Record<string, any>>({
  fields,
  control,
  errors,
  children,
  childrenForInput,
  showPassword,
  handleToggleVisibility,
  defaultValue,
  sx
}: FormSectionProps<T>) {
  return (
    <>
      {children}
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xxs={field.xxs || 12} xs={field.xs || 12} sm={field.sm || 12} key={field.name as string}>
            <Controller
              name={field.name as Path<T>}
              control={control}
              rules={{
                ...(field.type === 'number' && {
                  valueAsNumber: true,
                  validate: (v: any) => (isNaN(v) ? 'Must be a number' : true)
                })
              }}
              render={({ field: controllerField }) => (
                <CustomInput
                  {...controllerField}
                  name={field.name as string}
                  type={field.type}
                  autoFocus={field?.autoFocus || false}
                  label={field.label}
                  placeholder={field?.placeholder}
                  options={field.options}
                  multiline={field.multiline}
                  rows={field.rows}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message as string}
                  showPassword={showPassword}
                  handleToggleVisibility={handleToggleVisibility}
                  defaultValue={defaultValue}
                  imageSize={field?.imageSize}
                  required={field?.required}
                  trueLabel={field?.trueLabel}
                  falseLabel={field?.falseLabel}
                  multipleChips={field?.multipleChips}
                  sx={sx}
                  disabled={field?.disabled}
                >
                  {/* Render the specific component for specific field */}
                  {(childrenForInput && childrenForInput[field.name]) || null}
                </CustomInput>
              )}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
