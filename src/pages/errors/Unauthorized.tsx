import unauthorizedImage from '@/assets/images/error/401.svg';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        gap: 1,
        px: { xs: 3, md: 6 },
        py: 4,
        textAlign: 'center'
      }}
    >
      {/* Top Text Section */}
      <Box>
        <Typography
          variant="h2"
          sx={{
            color: 'primary.main',
            mb: 2,
            fontWeight: 900
          }}
        >
          Access Denied!
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'normal',
            mb: 1
          }}
        >
          Sorry, you don’t have permission to view this page.
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 'normal'
          }}
        >
          You can go to{' '}
          <Box
            component="span"
            onClick={() => navigate(-1)}
            sx={{ fontWeight: 900, textDecoration: 'underline', textUnderlineOffset: '1px', color: 'primary.main', cursor: 'pointer' }}
          >
            {' '}
            previous page
          </Box>
        </Typography>
      </Box>
      {/* Bottom Image Section */}
      <Box
        component="img"
        src={unauthorizedImage}
        alt="Unauthorized Access"
        sx={{
          width: '100%',
          maxWidth: 320,
          maxHeight: 320,
          objectFit: 'contain'
        }}
      />
    </Box>
  );
}

export default Unauthorized;
