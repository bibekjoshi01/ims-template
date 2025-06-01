import PageImage from '@/components/@extended/PageImage';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import SeverIssueImage from '../../assets/images/error/500ErrorPage.svg';

const ErrorFallback = () => (
  <Box sx={{ textAlign: 'center', padding: '2rem' }}>
    <PageImage src={SeverIssueImage} alt="Server error fallback image" />
    <Typography variant="body1">We encountered an unexpected error. Please try again later.</Typography>
    <Typography variant="body2">If the problem persists, please contact support.</Typography>
    <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
      <Button variant="contained" color="primary" component={Link} to="/">
        Back Home
      </Button>
    </Box>
  </Box>
);

export default ErrorFallback;
