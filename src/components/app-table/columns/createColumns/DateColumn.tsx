import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

// MUI IMPORTS
import { GridColDef } from '@mui/x-data-grid';

// PROJECT IMPORTS
import { ColumnConfig } from '../types';
import CustomInput from '@/components/app-form/CustomInput';
import useFocus from '@/hooks/useFocus';

// Define the createDateColumn function
export const createDateColumn = <T extends object>(config: ColumnConfig<T>, baseCol: GridColDef<T>): GridColDef<T> => ({
  ...baseCol,
  // Use valueGetter to convert and format the value before rendering
  valueGetter: (value) => {
    dayjs.extend(LocalizedFormat);
    return dayjs(value).format('ll');
  },
  renderEditCell: (params) => {
    const DateCellEdit = () => {
      const inputRef = useFocus(params);
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
