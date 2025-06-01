import { ChangeEvent } from 'react';

// MUI IMPORTS
import { Theme } from '@mui/material/styles';
import { GridColDef } from '@mui/x-data-grid';

// PROJECT IMPORTS
import CustomInput from '@/components/app-form/CustomInput';

// TYPES
import { ColumnConfig } from '../types';
import useFocus from '@/hooks/useFocus';

export const createNumberColumn = <T extends object>(config: ColumnConfig<T>, theme: Theme, baseCol: GridColDef<T>): GridColDef<T> => {
  return {
    ...baseCol,
    headerAlign: 'center',
    align: config.align ?? 'right',
    renderEditCell: (params) => {
      // Use React hooks to manage the input ref and focus
      const NumberCellEdit = () => {
        const inputRef = useFocus(params);

        return (
          <CustomInput
            type="number"
            name={String(config.field)}
            value={params.value}
            tabIndex={params.tabIndex}
            inputRef={inputRef}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: e.target.value
              })
            }
            inputStyle={{
              height: '2.4rem',
              '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
                backgroundColor: theme.palette.background.paper,
                justifyContent: 'flex-end'
              },
              '& input': {
                textAlign: 'right',
                paddingRight: '14px'
              },
              '& input[type=number]': {
                MozAppearance: 'textfield',
                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0
                }
              }
            }}
          />
        );
      };

      return <NumberCellEdit />;
    }
  };
};
