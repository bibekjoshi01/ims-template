import { Box, Container, Paper, Typography } from '@mui/material';

const PrivacyPolicies = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to our Privacy Policy page. Your privacy is critically important to us.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We collect various types of information, including personal information, when you use our services. This may include your name,
            email address, and usage data.
          </Typography>
          <Typography variant="h6" gutterBottom>
            How We Use Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use the information we collect to provide, improve, and personalize our services. Your information is never sold to third
            parties.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement appropriate technical and organizational measures to ensure the security of your data.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Changes to This Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update our privacy policy from time to time. Changes will be posted on this page with an updated revision date.
          </Typography>
          <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
            Last updated: January 24, 2025
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicies;
