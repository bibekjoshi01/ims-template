import { SnackbarProvider, useSnackbar } from 'notistack';

// project import
import Routes from '@/routes';
import ThemeCustomization from '@/themes';

import ScrollTop from '@/components/ScrollTop';
import StoreProvider from '@/libs/StoreProvider';
import { useEffect } from 'react';
import { ThemeProviderComponent } from './contexts/theme-context';
import './globals.css';
import { setSnackbar } from './utils/notifier';
import { ErrorBoundary } from './ErrorBoundary';

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
              <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
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
