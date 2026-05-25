import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

// project import
import config from '@/config';
import Logo from './LogoMain';

import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';

// ==============================|| MAIN LOGO ||============================== //

interface LogoSectionProps {
  sx?: SxProps<Theme>;
  to?: string;
  open?: boolean;
}

const LogoSection = ({ sx, to, open = true }: LogoSectionProps) => {
  return (
    <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center'
        }}
      >
        <Logo open={open} />
        {open && (
          <Chip
            label={import.meta.env.VITE_APP_VERSION}
            variant="outlined"
            size="small"
            color="secondary"
            sx={{ mt: 0.5, ml: 1, fontSize: '0.725rem', height: 20, '& .MuiChip-label': { px: 0.5 } }}
          />
        )}
      </Stack>
    </ButtonBase>
  );
};

export default LogoSection;
