// material-ui
// project import
import Logo from '@/components/logo';
import DrawerHeaderStyled from './DrawerHeaderStyled';

// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader({ open }: { open: boolean }) {
  return (
    <DrawerHeaderStyled open={!!open}>
      <Logo open={open} />
    </DrawerHeaderStyled>
  );
}
