import { SnackbarProvider } from 'notistack';

// project import
import Routes from '@/routes';
import ThemeCustomization from '@/themes';

import ScrollTop from '@/components/ScrollTop';
import StoreProvider from '@/libs/StoreProvider';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <StoreProvider>
      <ThemeCustomization>
        <ScrollTop>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Routes />
          </SnackbarProvider>
        </ScrollTop>
      </ThemeCustomization>
    </StoreProvider>
  );
}
