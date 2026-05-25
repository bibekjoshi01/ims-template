import { Box } from '@mui/material';
import CloseButton from '@/components/app-dialog/CloseButton';
import AppDialog from '@/components/app-dialog';

interface FilePreviewDialogProps {
  open: boolean;
  onClose: () => void;
  fileUrl: string | null;
  isPdf: boolean;
}

const FilePreviewDialog: React.FC<FilePreviewDialogProps> = ({ open, onClose, fileUrl, isPdf }) => {
  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title={isPdf ? 'Document Preview' : 'Image Preview'}
      fullWidth
      content={
        <Box sx={{ p: 0, height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CloseButton onClose={onClose} />
          {fileUrl &&
            (isPdf ? (
              <iframe src={fileUrl} style={{ width: '100%', height: '100%', border: 'none' }} title="PDF Preview" />
            ) : (
              <img src={fileUrl} alt="File Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            ))}
        </Box>
      }
    />
  );
};

export default FilePreviewDialog;
