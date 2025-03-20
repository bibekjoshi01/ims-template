import { SnackbarProvider } from 'notistack';

// project import
import Routes from '@/routes';
import ThemeCustomization from '@/themes';

import ScrollTop from '@/components/ScrollTop';
import StoreProvider from '@/libs/StoreProvider';
import { ThemeProviderComponent } from './contexts/theme-context';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <StoreProvider>
      <ThemeProviderComponent>
        <ThemeCustomization>
          <ScrollTop>
            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <Routes />
            </SnackbarProvider>
          </ScrollTop>
        </ThemeCustomization>
      </ThemeProviderComponent>
    </StoreProvider>
  );
}
