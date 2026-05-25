import DOMPurify from 'dompurify';
import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { ColumnConfig } from '../types';

export const createRichTextColumn = <T extends object>(config: ColumnConfig<T>, baseCol: GridColDef<T>): GridColDef<T> => {
  return {
    ...baseCol,
    editable: false,
    renderCell: (params) => {
      const value = params.value ?? '';
      return (
        <Box
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            lineHeight: 1.5,
            maxHeight: '3rem',
            padding: '8px 4px'
          }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(String(value))
          }}
        />
      );
    }
  };
};
