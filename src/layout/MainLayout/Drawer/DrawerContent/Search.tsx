// material-ui
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

// project imports
import { handlerDrawerOpen, useGetMenuMaster } from '@/api/menu';
import { useMenuSearch } from '@/contexts/search-context';
import { useRef, useEffect } from 'react';

// ==============================|| DRAWER CONTENT - SEARCH ||============================== //

export default function Search() {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;
  const { searchTerm, setSearchTerm } = useMenuSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    if (!drawerOpen) {
      handlerDrawerOpen(true);
    }
  };

  useEffect(() => {
    if (drawerOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [drawerOpen]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2, mb: 1, px: 0 }}>
        {!drawerOpen ? (
          <IconButton
            onClick={handleToggle}
            color="secondary"
            sx={{
              p: 0.5,
              width: 28,
              height: 28,
              color: 'text.primary',
              '& .MuiSvgIcon-root': { fontSize: '1.25rem' }
            }}
          >
            <SearchOutlined />
          </IconButton>
        ) : (
          <FormControl sx={{ width: '80%' }}>
            <OutlinedInput
              size="small"
              id="header-search"
              inputRef={inputRef}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target?.value)}
              startAdornment={
                <InputAdornment position="start" sx={{ mr: -0.5 }}>
                  <SearchOutlined />
                </InputAdornment>
              }
              aria-describedby="header-search-text"
              inputProps={{
                'aria-label': 'weight'
              }}
              placeholder="Search"
              sx={{
                '& .MuiOutlinedInput-input': {
                  color: 'text.secondary',
                  borderColor: 'theme.palette.divider',
                  outlineColor: 'theme.palette.divider'
                }
              }}
            />
          </FormControl>
        )}
      </Box>
      {!drawerOpen && <Divider sx={{ my: 1, mx: 1.5 }} />}
    </>
  );
}
