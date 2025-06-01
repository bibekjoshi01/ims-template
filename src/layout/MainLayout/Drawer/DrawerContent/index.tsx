// project import
import SimpleBar from '@/components/third-party/SimpleBar';
import { SearchProvider } from '@/contexts/search-context';
import Navigation from './Navigation';
import Search from './Search';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  return (
    <>
      <SearchProvider>
        <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
          <Search />
          <Navigation />
        </SimpleBar>
      </SearchProvider>
    </>
  );
}
