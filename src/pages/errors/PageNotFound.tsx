// pages/errors/404Page.jsx
import PageImage from '@/components/@extended/PageImage';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PageNotFoundImage from '../../assets/images/error/404ErrorPage.svg';

const PageNotFound = () => (
  <div style={{ textAlign: 'center' }}>
    <PageImage src={PageNotFoundImage} alt="404 page not found image" />
    <h1>404 - Page Not Found</h1>
    <p>The page you&apos;re looking for was moved, removed, renamed, or might never exist!</p>
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button variant="contained" color="primary" component={Link} to="/">
        Back Home
      </Button>
    </Box>
  </div>
);

export default PageNotFound;
