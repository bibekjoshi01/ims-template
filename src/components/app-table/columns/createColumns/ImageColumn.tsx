import { ChangeEvent, useEffect, useRef, useState } from 'react';

// MUI IMPORTS
import { Theme } from '@mui/material/styles';
import { GridColDef, GridRowModesModel } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

// PROJECT IMPORTS
import CustomInput from '@/components/app-form/CustomInput';
import DefaultImage from '@/assets/images/users/avatar-1.png';
import useFocus from '@/hooks/useFocus';

export const createImageColumn = <T extends object>(theme: Theme, baseCol: GridColDef<T>): GridColDef<T> => {
  return {
    ...baseCol,
    filterable: false,
    sortable: false,
    minWidth: 70,
    flex: 0,
    renderCell: (params) => {
      const value = params.value;
      let imageUrl = value instanceof File || value instanceof Blob ? URL.createObjectURL(value) : value;
      return (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            aspectRatio: '1/1',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <img
            src={imageUrl || DefaultImage}
            alt="Preview"
            style={{
              width: 40,
              height: 40,
              objectFit: 'cover',
              borderRadius: theme.shape.borderRadius
            }}
          />
        </Box>
      );
    },

    renderEditCell: (params) => {
      const ImageCellEdit = () => {
        const inputRef = useFocus(params);
        const oldUrlRef = useRef<string | null>(null);
        const [imagePreview, setImagePreview] = useState<string>(() => {
          const val = params.value;
          if (val instanceof File || val instanceof Blob) {
            const url = URL.createObjectURL(val);
            oldUrlRef.current = url;
            return url;
          }
          return typeof val === 'string' ? val : DefaultImage;
        });

        useEffect(() => {
          return () => {
            if (oldUrlRef.current) {
              URL.revokeObjectURL(oldUrlRef.current);
            }
          };
        }, []);

        const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            if (oldUrlRef.current) {
              URL.revokeObjectURL(oldUrlRef.current);
            }
            const imageUrl = URL.createObjectURL(file);
            oldUrlRef.current = imageUrl;

            setImagePreview(imageUrl);

            params.api.setEditCellValue({
              id: params.id,
              value: file,
              field: params.field
            });
          }
        };

        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              width: '100%',
              pr: 2
            }}
          >
            <CustomInput type="file" accept="image/*" style={{ display: 'none' }} ref={inputRef} onChange={handleImageChange} />
            <IconButton onClick={() => inputRef.current?.click()} color="primary" sx={{ p: 0 }}>
              <PhotoCameraIcon />
            </IconButton>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: 40,
                height: 40,
                objectFit: 'cover',
                borderRadius: theme.shape.borderRadius
              }}
            />
          </Box>
        );
      };

      return <ImageCellEdit />;
    }
  };
};
