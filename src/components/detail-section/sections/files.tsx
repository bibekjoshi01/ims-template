import { Box, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { InsertDriveFile } from '@mui/icons-material';
import MainCard from '@/components/cards/MainCard';

import PdfImage from '@/assets/images/pdf.png';
import { FileItem } from '../types';

interface FilesSectionProps {
  files: FileItem[];
  onFileClick: (url: string, isPdf?: boolean) => void;
}

export const FilesSection: React.FC<FilesSectionProps> = ({ files, onFileClick }) => {
  const theme = useTheme();
  if (!files || files.length === 0) return null;

  return (
    <Box sx={{ mt: 2, pt: 2 }}>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: theme.palette.text.secondary,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          mb: 2
        }}
      >
        Files
      </Typography>
      <Grid container spacing={2}>
        {files.map((file) => {
          if (!file.url) return null;

          const isPdf = file.isPdf || file.url.endsWith('.pdf');
          const isImage = /\.(png|jpg|jpeg|gif)$/.test(file.url.toLowerCase());

          return (
            <Grid key={file.url}>
              <MainCard
                sx={{
                  width: 160,
                  p: 1.5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: theme.palette.action.hover },
                  minWidth: 120,
                  maxWidth: 150,
                  textAlign: 'center'
                }}
                onClick={() => onFileClick(file.url, isPdf)}
              >
                {isImage ? (
                  <img src={file.url} alt={file.name || 'Attached Image'} style={{ width: 60, maxHeight: 60, objectFit: 'cover' }} />
                ) : isPdf ? (
                  <img src={PdfImage} alt="PDF Icon" style={{ width: 60, height: 60, objectFit: 'cover' }} />
                ) : (
                  <InsertDriveFile sx={{ fontSize: 48, color: theme.palette.text.secondary }} />
                )}
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.75rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%'
                  }}
                >
                  {file.name || (isPdf ? 'Document' : isImage ? 'Image' : 'File')}
                </Typography>
                <Typography variant="caption" color="primary" sx={{ textDecoration: 'underline', fontSize: '0.65rem' }}>
                  View
                </Typography>
              </MainCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
