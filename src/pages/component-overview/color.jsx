import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from '@/components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';

function ColorBox({ bgcolor, title, data, dark, main, color }) {
  return (
    <Card sx={{ '&.MuiPaper-root': { borderRadius: '0px' } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 2.5,
          bgcolor,
          color: color || (dark ? 'secondary.700' : '#ffffff'),
          border: main ? '1px dashed' : '1px solid transparent'
        }}
      >
        {title && (
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item>
              {data && (
                <Stack spacing={0.75} alignItems="center">
                  <Typography variant="subtitle2">{data.label}</Typography>
                  <Typography variant="subtitle1">{data.color}</Typography>
                </Stack>
              )}
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" color="inherit">
                {title}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Card>
  );
}

// ===============================|| COMPONENT - COLOR ||=============================== //

export default function ComponentColor() {
  return (
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <MainCard title="Primary Color" divider={true}>
            <Stack>
              <ColorBox bgcolor="primary.lighter" data={{ label: 'Blue-1' }} title="primary.lighter" dark />
              <ColorBox bgcolor="primary.100" data={{ label: 'Blue-2' }} title="primary[100]" dark />
              <ColorBox bgcolor="primary.200" data={{ label: 'Blue-3' }} title="primary[200]" dark />
              <ColorBox bgcolor="primary.light" data={{ label: 'Blue-4' }} title="primary.light" dark />
              <ColorBox bgcolor="primary.400" data={{ label: 'Blue-5' }} title="primary[400]" dark />
              <ColorBox bgcolor="primary.main" data={{ label: 'Blue-6' }} title="primary.main" main />
              <ColorBox bgcolor="primary.dark" data={{ label: 'Blue-7' }} title="primary.dark" />
              <ColorBox bgcolor="primary.700" data={{ label: 'Blue-8' }} title="primary[700]" />
              <ColorBox bgcolor="primary.darker" data={{ label: 'Blue-9' }} title="primary.darker" />
              <ColorBox bgcolor="primary.900" data={{ label: 'Blue-10' }} title="primary.900" />
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MainCard title="Secondary Color" divider={true}>
            <Stack>
              <ColorBox bgcolor="secondary.lighter" data={{ label: 'Grey-1' }} title="secondary.lighter" dark />
              <ColorBox bgcolor="secondary.100" data={{ label: 'Grey-2' }} title="secondary[100]" dark />
              <ColorBox bgcolor="secondary.200" data={{ label: 'Grey-3' }} title="secondary[200]" dark />
              <ColorBox bgcolor="secondary.light" data={{ label: 'Grey-4' }} title="secondary.light" dark />
              <ColorBox bgcolor="secondary.400" data={{ label: 'Grey-5' }} title="secondary[400]" dark />
              <ColorBox bgcolor="secondary.main" data={{ label: 'Grey-6' }} title="secondary.main" main />
              <ColorBox bgcolor="secondary.dark" data={{ label: 'Grey-8' }} title="secondary.dark" />
              <ColorBox bgcolor="secondary.700" data={{ label: 'Grey-7' }} title="secondary.700" />
              <ColorBox bgcolor="secondary.darker" data={{ label: 'Grey-10' }} title="secondary.darker" />
              <ColorBox bgcolor="secondary.900" data={{ label: 'Grey-9' }} title="secondary[900]" />
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MainCard title="Other Color" divider={true}>
            <Stack>
              <ColorBox bgcolor="text.primary" color="secondary.paper" data={{ label: 'Primary text' }} title="text.primary" />
              <ColorBox bgcolor="text.secondary" color="secondary.paper" data={{ label: 'Secondary text' }} title="text.secondary" />
              <ColorBox bgcolor="secondary.divider" color="text.primary" data={{ label: 'Divider' }} title="secondary.divider" />
              <ColorBox bgcolor="secondary.paper" color="text.primary" data={{ label: 'Paper' }} title="secondary.paper" />
              <ColorBox bgcolor="secondary.default" color="text.primary" data={{ label: 'Default' }} title="secondary.default" />
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MainCard title="Success Color" divider={true}>
            <Stack>
              <ColorBox bgcolor="success.lighter" data={{ label: 'Green-1' }} title="success.lighter" dark />
              <ColorBox bgcolor="success.light" data={{ label: 'Green-4' }} title="success.light" dark />
              <ColorBox bgcolor="success.main" data={{ label: 'Green-6' }} title="success.main" main />
              <ColorBox bgcolor="success.dark" data={{ label: 'Green-8' }} title="success.dark" />
              <ColorBox bgcolor="success.darker" data={{ label: 'Green-10' }} title="success.darker" />
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MainCard title="Error Color" divider={true}>
            <Stack>
              <ColorBox bgcolor="error.lighter" data={{ label: 'Red-1' }} title="error.lighter" dark />
              <ColorBox bgcolor="error.light" data={{ label: 'Red-4' }} title="error.light" dark />
              <ColorBox bgcolor="error.main" data={{ label: 'Red-6' }} title="error.main" main />
              <ColorBox bgcolor="error.dark" data={{ label: 'Red-8' }} title="error.dark" />
              <ColorBox bgcolor="error.darker" data={{ label: 'Red-10' }} title="error.darker" />
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MainCard title="Warning Color" divider={true}>
            <Stack>
              <ColorBox bgcolor="warning.lighter" data={{ label: 'Gold-1' }} title="warning.lighter" dark />
              <ColorBox bgcolor="warning.light" data={{ label: 'Gold-4' }} title="warning.light" dark />
              <ColorBox bgcolor="warning.main" data={{ label: 'Gold-6' }} title="warning.main" main />
              <ColorBox bgcolor="warning.dark" data={{ label: 'Gold-8' }} title="warning.dark" />
              <ColorBox bgcolor="warning.darker" data={{ label: 'Gold-10' }} title="warning.darker" />
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </ComponentSkeleton>
  );
}

ColorBox.propTypes = {
  bgcolor: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object,
  dark: PropTypes.bool,
  main: PropTypes.bool
};
