// material-ui
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

export default function AuthFooter(): JSX.Element {
  return (
    <Container maxWidth="xl">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          justifyContent: { xs: 'center', sm: 'space-between' },
          textAlign: { xs: 'center', sm: 'inherit' }
        }}
      >
        <Typography variant="subtitle2" color="secondary">
          This site is protected by{' '}
          <Typography component={Link} variant="subtitle2" href="/privacy-policy" target="_blank" underline="hover">
            Privacy Policy
          </Typography>
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 3 }}
          sx={{
            textAlign: { xs: 'center', sm: 'inherit' }
          }}
        >
          <Typography variant="subtitle2" color="secondary" component={Link} href="/developer-info" target="_blank" underline="hover">
            Developer Info
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
