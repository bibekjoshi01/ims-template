import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import UnderConstructionImage from '../../assets/images/error/constructionPage.svg';

const UnderConstructionPage = () => (
  <div style={{ textAlign: 'center' }}>
    <img src={UnderConstructionImage} alt="Under Construction" style={{ maxWidth: '100%', height: '60vh', marginBottom: '20px' }} />
    <h1>Under Construction</h1>
    <p>Hey! Please check out this site page latewr. We are doing some maintenace on it right now</p>
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button variant="contained" color="primary" component={Link} to="/">
        Back Home
      </Button>
    </Box>
  </div>
);

export default UnderConstructionPage;
