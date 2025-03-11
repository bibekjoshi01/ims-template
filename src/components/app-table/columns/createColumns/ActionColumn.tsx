// MUI IMPORTS
import { Theme } from '@mui/material/styles';
import { CircularProgress, Tooltip } from '@mui/material';
import { BorderColorOutlined, CloseOutlined, DeleteOutlined, FileCopy, SendOutlined } from '@mui/icons-material';
import { GridActionsColDef, GridActionsCellItem, GridRowId, GridRowModesModel, GridColDef } from '@mui/x-data-grid';

// TYPES
import { ColumnConfig, ColumnHandlers } from '../types';

export const createActionsColumn = <T extends object>(
  config: ColumnConfig<T>,
  theme: Theme,
  baseCol: GridColDef<T>,
  handlers?: ColumnHandlers,
  rowModesModel?: GridRowModesModel,
  savingRows?: Record<GridRowId, boolean>
): GridActionsColDef<T> => {
  return {
    ...baseCol,
    type: config.type as 'actions',
    sortable: false,
    filterable: false,
    editable: false,
    getActions: (params): JSX.Element[] => {
      const mode = rowModesModel?.[params.id]?.mode;
      const isSaving = savingRows?.[params.id] ?? false;

      if (mode) {
        return [
          <GridActionsCellItem
            key="cancel"
            component="button"
            sx={{
              // @ts-ignore
              ':hover': { backgroundColor: theme.palette.error.lighter }
            }}
            icon={
              <Tooltip key="cancel-tooltip" title="Cancel">
                <span>
                  <CloseOutlined color="error" />
                </span>
              </Tooltip>
            }
            label="Cancel"
            tabIndex={0}
            disabled={isSaving}
            onKeyDown={(e) => {
              if (e.key === 'Tab' && !e.shiftKey) {
                e.preventDefault();
                const saveButton = e.currentTarget.nextElementSibling;
                if (saveButton instanceof HTMLElement) {
                  saveButton.focus();
                }
              } else if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                handlers?.cancel?.(params.id);
              }
            }}
            onClick={() => handlers?.cancel?.(params.id)}
          />,
          <GridActionsCellItem
            key="save"
            component="button"
            sx={{
              // @ts-ignore - Handle Theme
              ':hover': { backgroundColor: theme.palette.success.lighter }
            }}
            icon={
              <Tooltip key="save-tooltip" title={isSaving ? 'Saving...' : 'Save'} arrow>
                <span>
                  {isSaving ? (
                    <CircularProgress color="success" sx={{ height: '20px' }} size={20} aria-busy={true} aria-describedby="Saving..." />
                  ) : (
                    <SendOutlined color="success" sx={{ height: '20px' }} />
                  )}
                </span>
              </Tooltip>
            }
            label="Save"
            tabIndex={0}
            disabled={isSaving}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isSaving) {
                e.preventDefault();
                e.stopPropagation();
                handlers?.save?.(params.id);
              }
            }}
            onClick={() => !isSaving && handlers?.save?.(params.id)}
          />
        ];
      }

      return [
        <GridActionsCellItem
          component="button"
          sx={{
            // @ts-ignore - Handle Theme
            ':hover': { backgroundColor: theme.palette.primary.lighter }
          }}
          icon={
            <Tooltip key="edit-tooltip" title="Edit">
              <span>
                <BorderColorOutlined color="primary" sx={{ height: '20px' }} />
              </span>
            </Tooltip>
          }
          label="Edit"
          onClick={() => handlers?.edit?.(params.id)}
        />,
        <GridActionsCellItem
          key="delete"
          showInMenu
          sx={{
            // @ts-ignore - Handle Theme
            ':hover': { backgroundColor: theme.palette.error.lighter }
          }}
          icon={<DeleteOutlined color="error" sx={{ height: '20px' }} />}
          label="Delete"
          onClick={() => handlers?.delete?.(params.id)}
        />,

        <GridActionsCellItem
          key="copy"
          showInMenu
          sx={{
            // @ts-ignore - Handle Theme
            ':hover': { backgroundColor: theme.palette.success.lighter }
          }}
          icon={<FileCopy color="success" sx={{ height: '20px' }} />}
          label="Copy"
          onClick={() => handlers?.copy?.(params.id)}
        />
      ];
    }
  };
};
