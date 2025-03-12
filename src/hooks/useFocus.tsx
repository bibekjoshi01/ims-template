import { useEffect, useRef } from 'react';

// MUI IMPORTS
import { GridRenderEditCellParams } from '@mui/x-data-grid';

const useFocus = (params: GridRenderEditCellParams) => {
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  // Focus the input when hasFocus is true
  useEffect(() => {
    if (params.hasFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [params.hasFocus]);

  return inputRef;
};

export default useFocus;
