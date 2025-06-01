import { useRef, useImperativeHandle, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type UseInputHandlersProps = {
  ref: any;
  externalRef?: any;
  name: string;
  value: any;
  onChange: (e: any) => void;
  multipleChips?: boolean;
  showPassword?: Record<string, boolean>;
  handleToggleVisibility?: (field: string) => void;
};

export function useInputHandlers({
  ref,
  externalRef,
  name,
  value,
  onChange,
  multipleChips = false,
  showPassword,
  handleToggleVisibility
}: UseInputHandlersProps) {
  const internalRef = useRef<any>(null);

  // Expose internal ref to both external and forwarded refs
  useImperativeHandle(ref, () => internalRef.current);

  const setRef = (el: any) => {
    internalRef.current = el;
    if (typeof externalRef === 'function') externalRef(el);
    else if (externalRef) (externalRef as React.MutableRefObject<any>).current = el;
  };

  const valueSelected = multipleChips ? Array.isArray(value) && value.length > 0 : value !== null && value !== undefined;

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      onChange({ target: { name, value: file, files: event.target.files } });
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    onChange({ target: { name, value: '', files: null } });
    if (internalRef.current) internalRef.current.value = '';
  };

  const renderPasswordVisibility = (field: string) => ({
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => handleToggleVisibility?.(field)} onMouseDown={(e) => e.preventDefault()}>
          {showPassword && showPassword[field] ? <Visibility sx={{ fontSize: 16 }} /> : <VisibilityOff sx={{ fontSize: 16 }} />}
        </IconButton>
      </InputAdornment>
    )
  });

  const handleSelectChange = (event: SelectChangeEvent<any>) => {
    const selectedValue = event.target.value;

    if (multipleChips) {
      const currentValues = Array.isArray(value) ? value : [];
      const isAlreadySelected = currentValues.includes(selectedValue);

      const newValues = isAlreadySelected ? currentValues.filter((v) => v !== selectedValue) : [...currentValues, selectedValue];

      onChange({ target: { name, value: newValues } });
    } else {
      onChange({ target: { name, value: selectedValue } });
    }
  };

  return {
    setRef,
    internalRef,
    valueSelected,
    imagePreview,
    handleImageChange,
    handleRemoveImage,
    renderPasswordVisibility,
    handleSelectChange
  };
}
