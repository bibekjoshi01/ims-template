import { GridRowId, GridRowModes, GridRowModesModel } from '@mui/x-data-grid';
import { useCallback, useEffect, useMemo, useState } from 'react';

// ========================= Types & Interfaces =========================
interface TableDataBase {
  id?: GridRowId;
}

// ========================= Custom Hook: useTableHandlers =========================
/**
 * A custom hook for managing row data and editing state in a data grid.
 *
 * @template T - The type of the row data.
 * @param {T[]} initialData - The initial row data.
 * @param {(updatedRow: T) => void} onSave - Function to be called when a row is saved.
 * @param {(id: GridRowId) => void} onDelete - Function to be called when a row is deleted.
 * @returns {{
 *   rows: T[],
 *   setRows: React.Dispatch<React.SetStateAction<T[]>>,
 *   rowModesModel: GridRowModesModel,
 *   setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>,
 *   savingRows: Record<GridRowId, boolean>,
 *   handlers: {
 *     delete: (id: GridRowId) => Promise<void>,
 *     copy: (id: GridRowId) => void,
 *     editInline: (id: GridRowId) => void,
 *     editForm: (id: GridRowId) => void,
 *     save: (id: GridRowId) => void,
 *     cancel: (id: GridRowId) => void,
 *     processRowUpdate: (updatedRow: T) => Promise<T>,
 *   }
 * }} An object containing the row data, state setters, and handler functions.
 */

export const useTableHandlers = <T extends TableDataBase>(
  initialData: T[],
  onSave?: (updatedRow: T) => Promise<void> | undefined,
  onDelete?: (id: GridRowId) => Promise<void> | undefined,
  handleEditClick?: (id: number | GridRowId | string) => void | undefined
) => {
  // ========================= State =========================
  const [rows, setRows] = useState<T[]>(initialData);
  // state to track row modes
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  // state to track saving status of row
  const [savingRows, setSavingRows] = useState<Record<GridRowId, boolean>>({});

  // Listen for changes in initialData
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setRows(initialData);
    }
  }, [initialData]);

  // ========================= Handlers =========================
  const handleEditInline = useCallback((id: GridRowId) => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.Edit }
    }));
  }, []);

  const handleEditForm = useCallback(
    (id: GridRowId) => {
      handleEditClick?.(id);
    },
    [handleEditClick]
  );

  const handleSave = useCallback(async (id: GridRowId) => {
    setSavingRows((prev) => ({ ...prev, [id]: true }));
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View }
    }));
  }, []);

  const handleCancel = useCallback((id: GridRowId) => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: {
        mode: GridRowModes.View,
        ignoreModifications: true
      }
    }));
  }, []);

  const handleDelete = useCallback(
    async (id: GridRowId) => {
      // Capture current state before any modifications
      let previousRows: T[] = [];

      // Optimistic update while capturing previous state
      setRows((prev) => {
        previousRows = [...prev];
        return prev.filter((row) => row.id !== id);
      });

      try {
        await onDelete?.(id);
      } catch (error) {
        console.error(`Delete failed for rowId(${id}):`, error);
        // Revert using captured previous state
        setRows(previousRows);
      }
    },
    [onDelete]
  );

  const processRowUpdate = useCallback(
    async (updatedRow: T) => {
      // Capture original row from current state
      let originalRow: T | undefined;
      setRows((prev) => {
        // Capture original row from current state
        originalRow = prev.find((row) => row.id === updatedRow.id);

        // Optimistic update
        return prev.map((row) => (row.id === updatedRow.id ? updatedRow : row));
      });

      try {
        await onSave?.(updatedRow);
        return updatedRow;
      } catch (error) {
        console.error(`Update failed for rowId(${updatedRow.id}):`, error);
        // Revert using captured original row
        setRows((prev) => (originalRow ? prev.map((row) => (row.id === updatedRow.id ? (originalRow as T) : row)) : prev));
        return originalRow || updatedRow;
      } finally {
        // Clear saving state for the row
        setSavingRows((prev) => ({ ...prev, [updatedRow.id as number]: false }));
      }
    },
    [onSave]
  );

  const handleCopy = useCallback(
    (id: GridRowId) =>
      navigator.clipboard.writeText(
        JSON.stringify(
          rows.find((row) => row.id === id),
          null,
          2
        )
      ),
    []
  );

  // ========================= Return Values =========================
  const handlers = useMemo(
    () => ({
      delete: handleDelete,
      copy: handleCopy,
      editInline: handleEditInline,
      editForm: handleEditForm,
      save: handleSave,
      cancel: handleCancel,
      processRowUpdate
    }),
    [handleDelete, handleCopy, handleEditClick, handleSave, handleCancel, processRowUpdate]
  );

  return {
    rows,
    setRows,
    rowModesModel,
    setRowModesModel,
    savingRows,
    handlers
  };
};
