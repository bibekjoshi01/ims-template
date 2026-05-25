// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from '@/components/cards/MainCard';
import AnalyticEcommerce from '@/components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from './MonthlyBarChart';
import UniqueVisitorCard from './UniqueVisitorCard';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault(): JSX.Element {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ p: { xxs: 1, xs: 0 } }}>
      {/* row 1 */}
      <Grid sx={{ mb: -2.25 }} size={{ xxs: 12 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
      <Grid size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
      </Grid>
      <Grid size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
      </Grid>
      <Grid sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} size={{ md: 8 }} />
      {/* row 2 */}
      <Grid size={{ xxs: 12, md: 7, lg: 8 }}>
        <UniqueVisitorCard />
      </Grid>
      <Grid size={{ xxs: 12, md: 5, lg: 4 }}>
        <Grid
          container
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Grid>
            <Typography variant="h5">Income Overview</Typography>
          </Grid>
          <Grid />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary'
                }}
              >
                This Week Statistics
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>
    </Grid>
  );
}
