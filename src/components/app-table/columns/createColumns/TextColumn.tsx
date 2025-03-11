import { ChangeEvent, useEffect, useRef } from 'react';

// MUI IMPORTS
import { Theme } from '@mui/material/styles';
import { GridColDef } from '@mui/x-data-grid';

// PROJECT IMPORTS
import CustomInput from '@/components/CustomInput';

// TYPES
import { ColumnConfig } from '../types';

export const createTextColumn = <T extends object>(config: ColumnConfig<T>, theme: Theme, baseCol: GridColDef<T>): GridColDef<T> => {
  return {
    ...baseCol,
    renderEditCell: (params) => {
      // Use React hooks to manage the input ref and focus
      const TextCellEdit = () => {
        const inputRef = useRef<HTMLInputElement>(null);

        // Focus the input when hasFocus is true
        useEffect(() => {
          if (params.hasFocus && inputRef.current) {
            inputRef.current.focus();
          }
        }, [params.hasFocus]);

        return (
          <CustomInput
            type="text"
            name={String(config.field)}
            value={params.value}
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
              marginRight: '20px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
                backgroundColor: theme.palette.background.paper
              }
            }}
          />
        );
      };

      return <TextCellEdit />;
    }
  };
};
