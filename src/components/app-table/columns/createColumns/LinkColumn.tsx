import { GridColDef, GridRowModesModel, GridRowId } from '@mui/x-data-grid';
import { Box, Link, Tooltip } from '@mui/material';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import CustomInput from '@/components/CustomInput';

export const createLinkColumn = <T extends object>(baseCol: GridColDef<T>, rowModesModel?: GridRowModesModel): GridColDef<T> => {
  // Check if any row has mode value set
  const hasMode = Object.values(rowModesModel || {}).some((mode) => mode.mode);

  return {
    ...baseCol,
    // Change column width if any row has mode value set
    width: hasMode ? 140 : baseCol.width,

    renderCell: (params) => (
      <Box
        sx={{
          mt: '5px',
          width: '100%'
        }}
      >
        <Link href={params.value} target="_blank" rel="noopener noreferrer">
          <Tooltip title={params.value} arrow>
            <OpenInNewOutlinedIcon fontSize="small" />
          </Tooltip>
        </Link>
      </Box>
    ),

    renderEditCell: (params) => (
      <Box
        sx={{
          width: '100%',
          minWidth: 140,
          pr: 1
        }}
      >
        <CustomInput
          type="text"
          fullWidth
          value={params.value || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: e.target.value
            })
          }
        />
      </Box>
    )
  };
};
