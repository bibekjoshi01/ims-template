import { SxProps, Theme } from '@mui/material/styles';

/**
 * Returns table styles based on the MUI theme.
 */
export const TableStyles: SxProps<Theme> = {
  // Sorting icon visibility
  '& .MuiDataGrid-sortIcon': {
    opacity: '1 !important'
  },

  // Column header styles
  '& .MuiDataGrid-columnHeaders': (theme) => ({
    '--unstable_DataGrid-headWeight': 900,
    borderBottom: '1.5px solid' + theme.palette.divider,
    borderTop: '1.5px solid' + theme.palette.divider,
    '--DataGrid-containerBackground': theme.palette.mode == 'light' ? theme.palette.primary.lighter : theme.palette.primary.darker
  }),

  '& .MuiDataGrid-columnHeader': {
    paddingInline: '10px',
    '& .MuiDataGrid-menuIcon': {
      marginLeft: 'auto',
      justifyContent: 'flex-end'
    },
    '& .MuiDataGrid-columnSeparator': {
      color: (theme) => (theme.palette.mode == 'dark' ? theme.palette.secondary.lighter : 'auto')
    }
  },

  // Row styles
  '& .MuiDataGrid-row': (theme) => ({
    fontSize: theme.typography.h6.fontSize,
    '--DataGrid-rowBorderColor': theme.palette.divider,

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
  borderColor: (theme) => theme.palette.divider,
  backgroundColor: (theme) => theme.palette.background.paper,
  height: '100%'
};
