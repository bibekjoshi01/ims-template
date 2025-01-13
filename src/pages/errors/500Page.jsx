import PageImage from '@/components/@extended/PageImage';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import SeverIssueImage from '../../assets/images/error/500ErrorPage.svg';

const ServerErrorPage = () => (
  <div style={{ textAlign: 'center' }}>
    <PageImage src={SeverIssueImage} alt="Server error 500 page image" />
    <h1>Internal Sever Error</h1>
    <p>Server error 500. We are fixing the problem, please try again at a later stage</p>
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button variant="contained" color="primary" component={Link} to="/">
        Back Home
      </Button>
    </Box>
  </div>
);

export default ServerErrorPage;
