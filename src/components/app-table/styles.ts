import { SxProps, Theme } from '@mui/material/styles';

/**
 * Returns table styles based on the MUI theme.
 */
export const TableStyles: SxProps<Theme> = {
  backgroundColor: '#fff',

  // Sorting icon visibility
  '& .MuiDataGrid-sortIcon': {
    opacity: '1 !important'
  },

  // Column header styles
  '& .MuiDataGrid-columnHeaders': (theme) => ({
    '--unstable_DataGrid-headWeight': 900,
    color: theme.palette.grey[800],
    borderBottom: '2px solid var(--divider, #f0f0f0)',
    borderTop: '2px solid var(--divider, #f0f0f0)',
    '--DataGrid-containerBackground': theme.palette.grey[50]
  }),

  '& .MuiDataGrid-columnHeader': {
    paddingInline: '10px',
    '& .MuiDataGrid-menuIcon': {
      marginLeft: 'auto',
      justifyContent: 'flex-end'
    }
  },

  // Row styles
  '& .MuiDataGrid-row': (theme) => ({
    fontSize: theme.typography.h6.fontSize,
    '--DataGrid-rowBorderColor': theme.palette.grey[100],

    // Cell styles
    '& .MuiDataGrid-cell': {
      paddingInline: '10px',
      '&:focus-within': {
        outline: 'none'
      },
      '&.MuiDataGrid-cell--editing': {
        overflow: 'visible',
        paddingInline: '10px',
        '&:focus-within': {
          outline: 'none'
        }
      }
    },

    '&.MuiDataGrid-row--editing': {
      boxShadow: 'none'
    }
  })
};

/**
 * Box styles for table container
 */
export const BoxStyles: SxProps<Theme> = {
  overflowX: 'auto',
  border: '1px solid',
  borderRadius: 2,
  // FIXME - Handle theme issue
  //@ts-ignore
  borderColor: (theme) => theme.palette.grey.A800,
  backgroundColor: '#fff',
  height: '100%'
};
