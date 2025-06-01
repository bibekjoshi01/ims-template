import { SnackbarProvider, useSnackbar } from 'notistack';

// project import
import Routes from '@/routes';
import ThemeCustomization from '@/themes';

import ScrollTop from '@/components/ScrollTop';
import StoreProvider from '@/libs/StoreProvider';
import { useEffect } from 'react';
import { ThemeProviderComponent } from './contexts/theme-context';
import { ErrorBoundary } from './ErrorBoundary';
import './globals.css';
import { setSnackbar } from './utils/notifier';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

function SnackbarInitializer() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setSnackbar(enqueueSnackbar);
  }, [enqueueSnackbar]);

  return null;
}

export default function App() {
  return (
    <StoreProvider>
      <ThemeProviderComponent>
        <ErrorBoundary>
          <ThemeCustomization>
            <ScrollTop>
              <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <SnackbarInitializer />
                <Routes />
              </SnackbarProvider>
            </ScrollTop>
          </ThemeCustomization>
        </ErrorBoundary>
      </ThemeProviderComponent>
    </StoreProvider>
  );
}
