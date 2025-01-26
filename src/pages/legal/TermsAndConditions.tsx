import { Box, Container, Paper, Typography } from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Terms and Conditions
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to our Terms and Conditions page. Please read these terms carefully before using our services.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing or using our services, you agree to be bound by these Terms and Conditions. If you do not agree, you may not use
            our services.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Use of Services
          </Typography>
          <Typography variant="body1" paragraph>
            You agree to use our services only for lawful purposes and in accordance with these terms. You must not engage in any activity
            that could harm the service or its users.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            We are not liable for any damages resulting from your use of our services. All services are provided "as is" without warranty of
            any kind.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Changes to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to update or modify these terms at any time. Changes will be effective upon posting on this page.
          </Typography>
          <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
            Last updated: January 24, 2025
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsAndConditions;
