import { ChangeEvent, useEffect, useRef } from 'react';

// MUI IMPORTS
import { Theme } from '@mui/material/styles';
import { GridColDef } from '@mui/x-data-grid';

// PROJECT IMPORTS
import CustomInput from '@/components/CustomInput';

// TYPES
import { ColumnConfig } from '../types';

export const createNumberColumn = <T extends object>(config: ColumnConfig<T>, theme: Theme, baseCol: GridColDef<T>): GridColDef<T> => {
  return {
    ...baseCol,
    headerAlign: 'right',
    align: 'right',
    renderEditCell: (params) => {
      // Use React hooks to manage the input ref and focus
      const NumberCellEdit = () => {
        const inputRef = useRef<HTMLInputElement>(null);

        // Focus the input when hasFocus is true
        useEffect(() => {
          if (params.hasFocus && inputRef.current) {
            inputRef.current.focus();
          }
        }, [params.hasFocus]);

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
