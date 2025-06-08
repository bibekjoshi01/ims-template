// MUI IMPORTS
import { BorderColorOutlined, CloseOutlined, DeleteOutlined, SendOutlined } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';
import { CircularProgress, Tooltip } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { GridActionsCellItem, GridActionsColDef, GridColDef, GridRowId, GridRowModesModel } from '@mui/x-data-grid';

// TYPES
import { ColumnConfig, ColumnHandlers } from '../types';

export const createActionsColumn = <T extends object>(
  config: ColumnConfig<T>,
  theme: Theme,
  baseCol: GridColDef<T>,
  handlers?: ColumnHandlers<T>,
  rowModesModel?: GridRowModesModel,
  savingRows?: Record<GridRowId, boolean>,
  allowEditing: boolean = true,
  allowDeleting: boolean = true
): GridActionsColDef<T> => {
  return {
    ...baseCol,
    type: config.type as 'actions',
    sortable: false,
    filterable: false,
    editable: false,
    minWidth: 100,
    maxWidth: 100,
    getActions: (params): JSX.Element[] => {
      const mode = rowModesModel?.[params.id]?.mode;
      const isSaving = savingRows?.[params.id] ?? false;

      if (mode) {
        return [
          <GridActionsCellItem
            key="cancel"
            component="button"
            sx={{
              ':hover': { backgroundColor: theme.palette.error.lighter, color: theme.palette.error.main }
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
              ':hover': { backgroundColor: theme.palette.success.lighter, color: theme.palette.success.main }
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
        allowEditing && (
          <GridActionsCellItem
            component="button"
            sx={{
              ':hover': { backgroundColor: theme.palette.primary.lighter, color: theme.palette.primary.main }
            }}
            icon={
              <Tooltip key="edit-tooltip" title="Edit">
                <span>
                  <BorderColorOutlined color="primary" sx={{ height: '20px' }} />
                </span>
              </Tooltip>
            }
            label="Edit"
            onClick={() => handlers?.editForm?.(params.id)}
          />
        ),
        <GridActionsCellItem
          key="viewDetails"
          showInMenu
          sx={{
            ':hover': { backgroundColor: theme.palette.primary.lighter, color: theme.palette.primary.main }
          }}
          icon={<ArticleIcon color="primary" sx={{ height: '20px' }} />}
          label="View Details"
          onClick={() => handlers?.viewDetails?.(params.id)}
        />,
        allowDeleting && (
          <GridActionsCellItem
            key="delete"
            showInMenu
            sx={{
              ':hover': { backgroundColor: theme.palette.error.lighter, color: theme.palette.error.main }
            }}
            icon={<DeleteOutlined color="error" sx={{ height: '20px' }} />}
            label="Delete"
            onClick={() => handlers?.delete?.(params.id)}
          />
        )
      ].filter(Boolean) as JSX.Element[];
    }
  };
};
