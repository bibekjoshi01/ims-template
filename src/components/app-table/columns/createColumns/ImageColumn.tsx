import { ChangeEvent, useEffect, useRef, useState } from 'react';

// MUI IMPORTS
import { Theme } from '@mui/material/styles';
import { GridColDef } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

// PROJECT IMPORTS
import CustomInput from '@/components/CustomInput';
import DefaultImage from '@/assets/images/website.png';
import useFocus from '@/hooks/useFocus';

export const createImageColumn = <T extends object>(theme: Theme, baseCol: GridColDef<T>): GridColDef<T> => {
  return {
    ...baseCol,
    renderCell: (params) => {
      const value = params.value as string;
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
            src={value || DefaultImage}
            alt="Product"
            style={{
              maxWidth: '100%',
              maxHeight: 40,
              objectFit: 'contain',
              borderRadius: theme.shape.borderRadius
            }}
          />
        </Box>
      );
    },
    renderEditCell: (params) => {
      const ImageCellEdit = () => {
        const inputRef = useFocus(params);
        const [imagePreview, setImagePreview] = useState<string>(params.value || DefaultImage);

        // Handle the image change
        const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: imageUrl // Store file URL temporarily
            });
          }
        };

        // NOTE - I think For security reasons, you cant programmatically open file picker on enter key pressed
        // FIXME - try it yourself and see if it works
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
