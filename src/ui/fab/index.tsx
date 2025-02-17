import Fab from '@mui/material/Fab';
import React from 'react';

interface AppFABProps {
  color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  variant?: 'circular' | 'extended';
  icon?: React.ReactNode;
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const AppFAB: React.FC<AppFABProps> = ({ color = 'primary', variant = 'circular', icon, label, disabled = false, onClick, className }) => {
  /*
    FAB (Floating Action Button) is a special type of button that “floats” above the UI 
    and is typically used for primary actions in an application. 
*/
  return (
    <Fab color={color === 'default' ? undefined : color} variant={variant} disabled={disabled} onClick={onClick} className={className}>
      {icon}
      {variant === 'extended' && label && <span style={{ marginLeft: 8 }}>{label}</span>}
    </Fab>
  );
};

export default AppFAB;
