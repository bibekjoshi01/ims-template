import MainCard from '@/components/cards/MainCard';
import { Facebook, LinkedIn, Twitter } from '@mui/icons-material';
import { Box, Button, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

/**
 * Renders a card with connected social network information.
 */
export default function SocailNetwork() {
  const theme = useTheme();

  const socialAccounts = [
    {
      name: 'Twitter',
      icon: <Twitter sx={{ color: '#1DA1F2' }} />,
      url: '',
      username: '',
      color: 'error' as const
    },
    {
      name: 'Facebook',
      icon: <Facebook sx={{ color: '#1877F2' }} />,
      url: '',
      username: 'Anshan Handgun',
      color: 'primary' as const
    },
    {
      name: 'LinkedIn',
      icon: <LinkedIn sx={{ color: '#0077B5' }} />,
      url: '',
      username: '',
      color: 'error' as const
    }
  ];

  return (
    <MainCard divider title="Social Network">
      <Box>
        <Grid container spacing={2}>
          {socialAccounts.map((account) => (
            <Grid key={account.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} size={{ xs: 12 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {account.icon}
                <Link to={account.url || '#'} style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>
                  {account.name}
                </Link>
              </Box>
              {account.username ? (
                <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
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
