import { Grid } from '@mui/material';
import { FormSectionProps } from './types';
import CustomInput from '@/components/app-form/CustomInput';
import { Controller, Path, ArrayPath } from 'react-hook-form';
import DynamicFieldArraySection from './DynamicFieldArraySection';

export default function FormSection<T extends Record<string, any>>({
  fields,
  control,
  errors,
  formValues,
  children,
  childrenForInput,
  showPassword,
  handleToggleVisibility,
  defaultValue,
  sx
}: FormSectionProps<T>) {
  const visibleFields = fields.filter((field) => {
    return formValues ? (typeof field.showIf === 'function' ? field.showIf(formValues) : true) : true;
  });

  return (
    <>
      {children}
      <Grid container spacing={2}>
        {visibleFields.map((field) => {
          const arrayFieldName = field.name as ArrayPath<T>;
          const pathFieldName = field.name as Path<T>;
          return (
            <Grid item xxs={field.xxs || 12} xs={field.xs || 12} sm={field.sm || 12} key={field.name as string} sx={{ mb: 1 }}>
              {field.type === 'array' ? (
                <DynamicFieldArraySection
                  name={arrayFieldName}
                  label={field.label}
                  required={field.required}
                  control={control}
                  errors={errors}
                  formValues={formValues}
                  itemFields={Array.isArray(field.itemFields) ? field.itemFields : []}
                  onDelete={field?.onDelete}
                />
              ) : (
                <Controller
                  name={pathFieldName}
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
                      inputStyle={field?.inputStyle}
                      disabled={field?.disabled}
                    >
                      {/* Render the specific component for specific field */}
                      {(childrenForInput && childrenForInput[field.name]) || null}
                    </CustomInput>
                  )}
                />
              )}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
