// material-ui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface AnalyticEcommerceProps {
  color?: string;
  title: string;
  count: string | number;
  percentage?: number;
  isLoss?: boolean;
  extra?: string;
}

// project import
import MainCard from '@/components/cards/MainCard';

// assets
import FallOutlined from '@ant-design/icons/FallOutlined';
import RiseOutlined from '@ant-design/icons/RiseOutlined';

const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

export default function AnalyticEcommerce({ color = 'primary', title, count, percentage, isLoss, extra }: AnalyticEcommerceProps) {
  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary'
          }}
        >
          {title}
        </Typography>
        <Grid
          container
          sx={{
            alignItems: 'center'
          }}
        >
          <Grid>
            <Typography variant="h4">{count}</Typography>
          </Grid>
          {percentage && (
            <Grid>
              <Chip
                variant="combined"
                icon={isLoss ? <FallOutlined style={iconSX} /> : <RiseOutlined style={iconSX} />}
                label={`${percentage}%`}
                sx={{
                  ml: 1.25,
                  pl: 1,
                  color: `${color || 'primary'}.dark`,
                  bgcolor: `${color || 'primary'}.lighter`,
                  // border: '1px solid',
                  borderColor: `${color || 'primary'}.main`
                }}
                size="small"
                // bgcolor={`${color || 'primary'}.lighter`}
              />
            </Grid>
          )}
        </Grid>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary'
          }}
        >
          You made an extra{' '}
          <Typography variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
            {extra}
          </Typography>{' '}
          this year
        </Typography>
      </Box>
    </MainCard>
  );
}
