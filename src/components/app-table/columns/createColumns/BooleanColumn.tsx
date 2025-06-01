// MUI IMPORTS
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Box, Tooltip, Typography } from '@mui/material';
import { CloseOutlined, DoneOutlined } from '@mui/icons-material';

// PROJECT IMPORTS
import CustomInput from '@/components/app-form/CustomInput';
import useFocus from '@/hooks/useFocus';
import { ColumnConfig } from '../types';

export const createBooleanColumn = <T extends object>(config: ColumnConfig<T>, baseCol: GridColDef<T>): GridColDef<T> => {
  return {
    ...baseCol,
    renderCell: (params) => (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <RenderValue params={params} trueLabel={config.trueLabel} falseLabel={config.falseLabel} />
      </Box>
    ),

    renderEditCell: (params) => {
      const BooleanCellEdit = () => {
        const inputRef = useFocus(params);
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomInput
              type="checkbox"
              name={String(config.field)}
              inputRef={inputRef}
              value={params?.value}
              sx={{ display: 'grid' }}
              onChange={() =>
                params.api.setEditCellValue({
                  id: params.id,
                  field: params.field,
                  value: !params.value
                })
              }
            />
            <Typography variant="inherit" color="text.secondary">
              {params.value ? config.trueLabel : config.falseLabel}
            </Typography>
          </Box>
        );
      };

      return <BooleanCellEdit />;
    }
  };
};

interface RenderValueProps {
  params: GridCellParams;
  trueLabel?: string;
  falseLabel?: string;
}

const RenderValue: React.FC<RenderValueProps> = ({ params, trueLabel, falseLabel }) => {
  return !!params.value ? (
    <Typography
      variant="inherit"
      color="success"
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      }}
    >
      <Tooltip title={trueLabel || 'True'}>
        <DoneOutlined color="success" />
      </Tooltip>
      {trueLabel}
    </Typography>
  ) : (
    <Typography
      variant="inherit"
      color="success"
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%'
      }}
    >
      <Tooltip title={falseLabel || 'False'}>
        <CloseOutlined color="error" />
      </Tooltip>
      {falseLabel}
    </Typography>
  );
};
