import { SxProps, Theme } from '@mui/material/styles';

/**
 * Returns table styles based on the MUI theme.
 */
export const TableStyles: SxProps<Theme> = {
  // Sorting icon visibility
  '& .MuiDataGrid-sortIcon': {
    opacity: '1 !important',
    visibility: 'visible'
  },

  border: 'none',

  // scrollbar styles
  '& .MuiDataGrid-scrollbar--horizontal::-webkit-scrollbar': {
    scrollbarWidth: 'thin',
    height: '6px'
  },
  '& .MuiDataGrid-scrollbar--horizontal::-webkit-scrollbar-track': {
    background: '#eee'
  },
  '& .MuiDataGrid-scrollbar--horizontal::-webkit-scrollbar-thumb': {
    backgroundColor: '#ccc'
  },
  '& .MuiDataGrid-scrollbar--horizontal::-webkit-scrollbar-thumb:hover': {
    background: '#aaa'
  },

  // Column header styles
  '& .MuiDataGrid-columnHeaders': (theme) => ({
    '--unstable_DataGrid-headWeight': 900,
    '--unstable_DataGrid-radius': 0,
    borderBottom: '1.5px solid ',
    borderTop: '1.5px solid',
    borderBottomColor: theme.palette.divider,
    borderTopColor: theme.palette.divider,
    // @ts-ignore
    '--DataGrid-containerBackground': theme.palette.default
  }),

  '& .MuiDataGrid-columnHeader': (theme) => ({
    paddingInline: '10px',
    '& .MuiDataGrid-menuIcon': {
      marginLeft: 'auto',
      justifyContent: 'flex-end'
    },
    '& .MuiDataGrid-columnSeparator': {
      color: theme.palette.divider
    },
    '& .MuiDataGrid-checkboxInput': {
      scale: 1.2
    }
  }),

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

    '& .MuiDataGrid-cellEmpty': {
      paddingInline: '0px',
      mr: 0
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
  borderRadius: 1,
  borderColor: (theme) => theme.palette.divider,
  backgroundColor: (theme) => theme.palette.background.paper,
  height: '100%'
};
