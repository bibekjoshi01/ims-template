import { Typography } from '@mui/material';

function Unauthorized() {
  return (
    <>
      <Typography variant="h4" component="h4">
        Access Denied
      </Typography>

      <Typography variant="body1" component="h2" color="error" textAlign="center">
        You do not have permission to access this module.
      </Typography>
    </>
  );
}

export default Unauthorized;
