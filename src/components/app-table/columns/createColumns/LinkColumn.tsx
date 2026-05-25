// MUI IMPORTS
import { GridColDef, GridRowModesModel } from '@mui/x-data-grid';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { Box, Link, Tooltip } from '@mui/material';

// PROJECT IMPORTS
import CustomInput from '@/components/app-form/CustomInput';
import useFocus from '@/hooks/useFocus';
import { ColumnConfig } from '../types';

export const createLinkColumn = <T extends object>(
  config: ColumnConfig<T>,
  baseCol: GridColDef<T>,
  rowModesModel?: GridRowModesModel
): GridColDef<T> => {
  // Check if any row has mode value set
  const hasMode = Object.values(rowModesModel || {}).some((mode) => mode.mode);

  return {
    ...baseCol,
    // Change column maxWidth if any row has mode value set
    maxWidth: hasMode ? 140 : baseCol.maxWidth,
    minWidth: 80,
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

    renderEditCell: (params) => {
      const LinkCellEdit = () => {
        const inputRef = useFocus(params);
        return (
          <Box
            sx={{
              width: '100%',
              minWidth: 140,
              pr: 1
            }}
          >
            <CustomInput
              type="text"
              name={String(config.field)}
              inputRef={inputRef}
              value={params.value || ''}
              sx={{ width: '100%' }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                params.api.setEditCellValue({
                  id: params.id,
                  field: params.field,
                  value: e.target.value
                })
              }
            />
          </Box>
        );
      };

      return <LinkCellEdit />;
    }
  };
};
