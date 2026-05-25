import { ChangeEvent } from 'react';

// MUI IMPORTS
import { Theme } from '@mui/material/styles';
import { GridColDef } from '@mui/x-data-grid';

// PROJECT IMPORTS
import CustomInput from '@/components/app-form/CustomInput';

// TYPES
import { ColumnConfig } from '../types';
import useFocus from '@/hooks/useFocus';

export const createTextColumn = <T extends object>(config: ColumnConfig<T>, theme: Theme, baseCol: GridColDef<T>): GridColDef<T> => {
  return {
    ...baseCol,
    renderEditCell: (params) => {
      const TextCellEdit = () => {
        const inputRef = useFocus(params);
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
            sx={{ width: '100%' }}
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
