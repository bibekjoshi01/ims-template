import { useEffect, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// third-party
import type { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

type ApexSeries = NonNullable<ApexOptions['series']>;

// chart options
const barChartOptions: ApexOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  grid: {
    show: false
  }
};

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function MonthlyBarChart(): JSX.Element {
  const theme = useTheme();

  const infoColor = theme.palette.info.light;
  const secondaryText = theme.palette.text.secondary;

  const [series] = useState<ApexSeries>([
    {
      data: [80, 95, 70, 42, 65, 55, 78]
    }
  ]);

  const [options, setOptions] = useState<ApexOptions>(barChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [infoColor],
      xaxis: {
        labels: {
          style: {
            colors: [secondaryText, secondaryText, secondaryText, secondaryText, secondaryText, secondaryText, secondaryText]
          }
        }
      },
      legend: {
        labels: {
          colors: [infoColor],
          useSeriesColors: false
        }
      },
      tooltip: {
        theme: theme.palette.mode
      }
    }));
  }, [secondaryText, infoColor]);

  return (
    <Box id="chart" sx={{ bgcolor: 'transparent' }}>
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </Box>
  );
}
