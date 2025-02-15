import { Box, Button, Grid, Typography } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import MainCard from '@/components/MainCard';

/**
 * Renders a card with connected social network information.
 */
export default function SocailNetwork() {
  const socialAccounts = [
    {
      name: 'Twitter',
      icon: <Twitter sx={{ color: '#1DA1F2' }} />,
      url: '',
      username: '',
      color: 'error' as 'error'
    },
    {
      name: 'Facebook',
      icon: <Facebook sx={{ color: '#1877F2' }} />,
      url: '',
      username: 'Anshan Handgun',
      color: 'primary' as 'primary'
    },
    {
      name: 'LinkedIn',
      icon: <LinkedIn sx={{ color: '#0077B5' }} />,
      url: '',
      username: '',
      color: 'error' as 'error'
    }
  ];

  return (
    <MainCard divider title="Social Network">
      <Box>
        <Grid container spacing={2}>
          {socialAccounts.map((account) => (
            <Grid item xs={12} key={account.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {account.icon}
                <Link to={account.url || '#'} style={{ textDecoration: 'none' }}>
                  {account.name}
                </Link>
              </Box>
              {account.username ? (
                <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 500 }}>
                  {account.username}
                </Typography>
              ) : (
                <Button variant="text" color={account.color} size="small">
                  Connect
                </Button>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </MainCard>
  );
}
