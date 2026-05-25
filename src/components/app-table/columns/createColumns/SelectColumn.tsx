import { ChangeEvent } from 'react';

// MUI IMPORTS
import { Theme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { GridColDef, GridSingleSelectColDef } from '@mui/x-data-grid';

// PROJECT IMPORTS
import CustomInput from '@/components/app-form/CustomInput';
import { ColumnConfig } from '../types';
import useFocus from '@/hooks/useFocus';

export const createSelectColumn = <T extends object>(config: ColumnConfig<T>, theme: Theme, baseCol: GridColDef<T>): GridColDef<T> => {
  // Create a properly typed select column definition

  const selectColumn: GridSingleSelectColDef<T> = {
    ...baseCol,
    type: 'singleSelect',
    valueOptions: config.valueOptions,
    renderCell: (params) => {
      const value = config.valueOptions?.find((option) => option.value === params.value)?.label || params.value;
      const label = config.valueOptions?.find((option) => option.value === params.value)?.label || ('' as string);
      const colors = config.colorMap?.[label.toUpperCase()] || {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[50],
        color: theme.palette.text.primary
      };

      return (
        <Typography
          component="span"
          sx={{
            backgroundColor: colors.backgroundColor,
            color: colors.color,
            fontSize: theme.typography.body2.fontSize,
            padding: '4px 10px',
            fontWeight: 500,
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          {value}
        </Typography>
      );
    },
    renderEditCell: (params) => {
      // Use React hooks to manage the select ref and focus
      const SelectCellEdit = () => {
        const selectRef = useFocus(params);
        const options =
          config.valueOptions?.map((option) => ({
            label: option.label,
            value: option.value,
            sx: {
              padding: '4px 10px',
              fontWeight: 500,
              display: 'flex',
              justifyContent: 'center',
              '& .MuiBox-root': {
                backgroundColor: config.colorMap?.[option.label]?.backgroundColor,
                color: config.colorMap?.[option.label]?.color,
                padding: '4px 10px',
                '&:hover': {
                  backgroundColor: config.colorMap?.[option.label]?.backgroundColor,
                  opacity: 0.8
                }
              }
            }
          })) || [];

        return (
          <CustomInput
            type="select"
            name={String(config.field)}
            value={params.value}
            tabIndex={params.tabIndex}
            inputRef={selectRef}
            options={options}
            inputStyle={{
              height: '2.4rem'
            }}
            sx={{ width: '100%' }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: e.target.value
              });
              config.handleChange?.(params.id, e.target.value as T[keyof T]);
            }}
          />
        );
      };

      return <SelectCellEdit />;
    }
  };

  return selectColumn as GridColDef<T>;
};
