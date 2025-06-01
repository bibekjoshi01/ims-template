import { ReactNode } from 'react';

// material-ui
import Box from '@mui/material/Box';

// project import
import MainCard from '@/components/cards/MainCard';

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <MainCard
      sx={{ maxWidth: { xs: 400, lg: 475 }, margin: { xs: 2.5, md: 3 }, '& > *': { flexGrow: 1, flexBasis: '50%' } }}
      content={false}
      border={false}
      boxShadow
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      shadow={(theme: any) => theme.customShadows.z1}
    >
      <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
    </MainCard>
  );
}
