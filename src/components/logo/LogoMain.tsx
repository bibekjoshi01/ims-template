// project import
import SiteLogo from '@/assets/images/logo.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = ({ open }: { open?: boolean }): JSX.Element => {
  return <img src={SiteLogo} alt="Logo Main" width={open ? '80' : '35'} />;
};

export default Logo;
