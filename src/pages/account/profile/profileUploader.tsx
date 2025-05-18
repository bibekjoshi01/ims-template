import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import defaultImage from '@/assets/images/users/avatar-1.png';

interface ProfileUploaderProps {
  image: File | string | null;
  setImage: (image: File) => void;
  defaultHovered?: boolean;
  sx?: object;
}

/**
 * A component for uploading and previewing a profile image.
 */
export default function ProfileUploader({ image, setImage, defaultHovered, sx }: ProfileUploaderProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const [preview, setPreview] = useState<string | null>(() => {
    if (typeof image === 'string') return image;
    if (image instanceof File) return URL.createObjectURL(image);
    return null;
  });

  useEffect(() => {
    if (defaultHovered) {
      setIsHovered(true);
    }
  }, [defaultHovered]);

  // Update preview when image prop changes
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    if (typeof image === 'string') {
      setPreview(image);
    } else if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        margin: '0 auto',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        overflow: 'hidden',
        mb: 4,
        boxShadow: 2,
        ...sx
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Profile Image */}
      <Avatar
        src={preview || defaultImage}
        alt="Profile"
        sx={{
          width: '100%',
          height: '100%',
          transition: 'opacity 0.3s ease-in-out'
        }}
      />

      {/* Hover Overlay */}
      {isHovered && (
        <label
          htmlFor="image-upload"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <input id="image-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
          <IconButton component="span" sx={{ color: '#fff' }}>
            <CameraAltOutlinedIcon />
          </IconButton>
          <Typography variant="subtitle2" sx={{ color: '#fff' }}>
            Upload
          </Typography>
        </label>
      )}
    </Box>
  );
}
