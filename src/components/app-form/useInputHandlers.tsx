import { useRef, useImperativeHandle, useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type UseInputHandlersProps = {
  ref: React.ForwardedRef<any>;
  externalRef?: React.Ref<any>;
  name: string;
  value: unknown;
  onChange: (e: any) => void;
  multipleChips?: boolean;
  showPassword?: Record<string, boolean>;
  handleToggleVisibility?: (field: any) => void;
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

  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [fileModalUrl, setFileModalUrl] = useState<string | null>(null);
  const [isCurrentFilePdf, setIsCurrentFilePdf] = useState(false); // New state for PDF check

  const handleOpenFileModal = (url: string, isPdf: boolean) => {
    setFileModalUrl(url);
    setIsCurrentFilePdf(isPdf);
    setIsFileModalOpen(true);
  };

  const handleCloseFileModal = () => {
    setIsFileModalOpen(false);
  };

  // Cleanup for Blob URLs when component unmounts or value changes
  useEffect(() => {
    return () => {
      if (fileModalUrl && value instanceof File) {
        URL.revokeObjectURL(fileModalUrl);
      }
    };
  }, [fileModalUrl, value]); // Re-run effect if fileModalUrl or value changes

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      onChange({ target: { name, value: file, files: event.target.files } });
    }
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     onChange({ target: { name, value: file, files: event.target.files } });
  //   }
  // };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // It's good practice to revoke the old URL if you're replacing a file
      if (fileModalUrl) {
        URL.revokeObjectURL(fileModalUrl);
      }
      onChange({ target: { name, value: file, files: event.target.files } });

      // Update modal state immediately for newly selected files
      const url = URL.createObjectURL(file);
      const isPdfFile = file.type === 'application/pdf';
      setFileModalUrl(url);
      setIsCurrentFilePdf(isPdfFile);
      // }
    } else {
      // If file is cleared, clear modal state as well
      if (fileModalUrl) {
        URL.revokeObjectURL(fileModalUrl);
      }
      setFileModalUrl(null);
      setIsCurrentFilePdf(false);
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
    isFileModalOpen,
    fileModalUrl,
    isCurrentFilePdf,
    handleOpenFileModal,
    handleCloseFileModal,
    handleFileChange,
    renderPasswordVisibility,
    handleSelectChange
  };
}
