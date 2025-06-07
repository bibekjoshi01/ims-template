export const TitleStyles = {
  displayPrint: 'none',
  px: 2,
  py: 3,
  fontWeight: 900
};

export const ContainerStyles = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  alignItems: { xs: 'flex-start', sm: 'center' },
  pb: { xxs: 1, sm: 0 },
  px: 1
};

export const MenuItemStyles = {
  p: 0,
  '& .MuiButtonBase-root': {
    px: 2.4,
    py: 1,
    gap: 0.5,
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    width: '100%'
  },
  '& .MuiSvgIcon-root': {
    fontSize: 'initial',
    width: 20,
    height: 20
  }
};

export const ToolbarStyles = {
  display: 'flex',
  gap: 1,
  flexWrap: 'wrap',
  alignItems: { xs: 'flex-start', sm: 'center' },
  width: { xs: '100%', sm: 'auto' },
  displayPrint: 'none'
};
