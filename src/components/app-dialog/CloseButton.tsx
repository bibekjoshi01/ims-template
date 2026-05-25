import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const CloseButton = ({ onClose }: { onClose: () => void }) => {
  return (
    <IconButton
      color="error"
      onClick={onClose}
      aria-label="close"
      size="medium"
      sx={{ position: 'absolute', top: 5, right: 5, zIndex: 1, color: 'red' }}
    >
      <Close />
    </IconButton>
  );
};

export default CloseButton;
