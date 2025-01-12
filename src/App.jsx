import { RouterProvider } from 'react-router-dom';

// project import
import router from '@/routes';
import ThemeCustomization from '@/themes';

import ScrollTop from '@/components/ScrollTop';
import StoreProvider from '@/libs/StoreProvider';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <StoreProvider>
      <ThemeCustomization>
        <ScrollTop>
          <RouterProvider router={router} />
        </ScrollTop>
      </ThemeCustomization>
    </StoreProvider>
  );
}
