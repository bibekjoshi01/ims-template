import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

// MUI IMPORTS
import { GridColDef } from '@mui/x-data-grid';

// PROJECT IMPORTS
import { ColumnConfig } from '../types';
import CustomInput from '@/components/app-form/CustomInput';
import useFocus from '@/hooks/useFocus';

dayjs.extend(LocalizedFormat);

export const createDateColumn = <T extends object>(config: ColumnConfig<T>, baseCol: GridColDef<T>): GridColDef<T> => ({
  ...baseCol,
  type: 'date',

  valueGetter: (value) => {
    // convert from raw value (number/string) → Date
    const raw = value;
    if (!raw) return null;

    const parsed =
      typeof raw === 'number'
        ? dayjs().year(raw).startOf('year') // interpret number as year
        : dayjs(raw); // parse ISO date string

    return parsed.isValid() ? parsed.toDate() : null;
  },
  valueFormatter: (value) => {
    if (!value) return '';

    const rawDate = dayjs(value);
    return rawDate.isValid() ? rawDate.format('ll') : '';
  },

  renderEditCell: (params) => {
    const DateCellEdit = () => {
      const inputRef = useFocus(params);
      const parsed = dayjs(params.value);

      return (
        <CustomInput
          type="date"
          name={String(config.field)}
          value={parsed.isValid() ? parsed.format('YYYY-MM-DD') : ''}
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
