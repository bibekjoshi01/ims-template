import dayjs from 'dayjs';

// MUI IMPORTS
import { GridColDef } from '@mui/x-data-grid';

// PROJECT IMPORTS
import { ColumnConfig } from '../types';
import CustomInput from '@/components/CustomInput';
import { useEffect, useRef } from 'react';

// Define the createDateColumn function
export const createDateColumn = <T extends object>(config: ColumnConfig<T>, baseCol: GridColDef<T>): GridColDef<T> => ({
  ...baseCol,
  // Use valueGetter to convert and format the value before rendering
  valueGetter: (value) => {
    return dayjs(value).format('YYYY-MM-DD');
  },
  renderEditCell: (params) => {
    const DateCellEdit = () => {
      const inputRef = useRef<any>(null);

      // Focus the input when hasFocus is true
      useEffect(() => {
        if (params.hasFocus && inputRef.current) {
          inputRef.current.focus();
        }
      }, [params.hasFocus]);
      return (
        <CustomInput
          type="date"
          name={String(config.field)}
          value={dayjs(params.value).format('YYYY-MM-DD')}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: dayjs(e.target.value).format('YYYY-MM-DD')
            })
          }
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center'
          }}
          inputRef={inputRef}
        />
      );
    };

    return <DateCellEdit />;
  }
});
