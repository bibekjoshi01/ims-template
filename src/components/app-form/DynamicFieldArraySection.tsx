// MUI IMPORTS
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { DeleteOutlined } from '@ant-design/icons';

// REACT HOOK FORM IMPORTS
import { Controller, useFieldArray, FieldArray, ArrayPath, Path, FieldErrors, FieldError } from 'react-hook-form';

// PROJECT IMPORTS
import CustomInput from './CustomInput';
import { LabelForInput } from './Helpers';
import { DynamicFieldArraySectionProps, FormField, TField } from './types';

export default function DynamicFieldArraySection<T extends Record<string, any>>({
  name,
  label,
  required = false,
  control,
  errors,
  formValues,
  itemFields,
  onDelete
}: DynamicFieldArraySectionProps<T>) {
  const { fields, append, remove } = useFieldArray({ control, name, keyName: 'uid' });
  const currentNoOfFileds = fields.length;
  const totalOptions = itemFields.find((item) => item.type === 'select')?.options?.length || 0;

  const errorAtIndex = (index: number, fieldName: FormField<T>['name']) => {
    return (errors[name] as FieldErrors<any>[] | undefined)?.[index]?.[fieldName] as FieldError | undefined;
  };

  const currentValues = Array.isArray(formValues?.[name]) ? (formValues?.[name] as any[]) || [] : [];

  const getFilteredOptions = (item: FormField<T>, index: number) => {
    if (item.type !== 'select') return item.options;

    const selectedValues = currentValues.map((row: any, i: number) => (i !== index ? row[item.name] : null)).filter((v: any) => v !== null);

    return item.options?.filter((opt) => !selectedValues.includes(opt.value)) ?? [];
  };

  return (
    <>
      {/* Label */}
      <LabelForInput name={name} label={label} required={required} />
      {fields.length > 0 ? (
        (fields as TField<T>[]).map((field, index) => (
          <Grid container spacing={2} key={field.uid} sx={{ mb: 2 }}>
            {itemFields.map((item) => {
              const fieldName = `${name}.${index}.${String(item.name)}` as Path<T>;
              return (
                <Grid item key={fieldName} xxs={item.xxs || 11} xs={item.xs || 11} sm={item.sm || 11}>
                  <Controller
                    name={fieldName}
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        label={item.label}
                        type={item.type}
                        options={getFilteredOptions(item, index) ?? item.options}
                        error={!!errorAtIndex(index, item.name)}
                        helperText={errorAtIndex(index, item.name)?.message}
                      />
                    )}
                  />
                </Grid>
              );
            })}
            {fields.length > 1 && (
              <Grid item xxs={1} xs={1} sm={1} alignSelf="flex-end">
                <IconButton
                  color="error"
                  onClick={() => {
                    if (onDelete && field.id) onDelete(index, field);
                    remove(index);
                  }}
                >
                  <DeleteOutlined style={{ color: 'red' }} />
                </IconButton>
              </Grid>
            )}
          </Grid>
        ))
      ) : (
        <Typography sx={{ mb: 2, color: 'text.secondary' }}>No {label?.toLowerCase() ?? 'fields'} added yet. Click "Add More".</Typography>
      )}

      {/* Add More Button */}
      <Button
        variant="outlined"
        disabled={currentNoOfFileds >= totalOptions}
        onClick={() =>
          append(
            itemFields.reduce(
              (acc, field) => {
                acc[field.name as string] = field.defaultValue ?? '';
                return acc;
              },
              {} as Record<string, any>
            ) as FieldArray<T, ArrayPath<T>>
          )
        }
        sx={{ alignSelf: 'flex-end' }}
      >
        Add More
      </Button>
    </>
  );
}
