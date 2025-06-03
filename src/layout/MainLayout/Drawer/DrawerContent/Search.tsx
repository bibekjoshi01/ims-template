// material-ui
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

// project imports
import { useMenuSearch } from '@/contexts/search-context';

// ==============================|| DRAWER CONTENT - SEARCH ||============================== //

export default function Search() {
  const { searchTerm, setSearchTerm } = useMenuSearch();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2, mb: 1 }}>
      <FormControl>
        <OutlinedInput
          size="small"
          id="header-search"
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
    </Box>
  );
}
