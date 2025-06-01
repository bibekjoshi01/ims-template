// ==============================
// Custom Search Bar

import CustomInput from '@/components/app-form/CustomInput';
import { GlobalStyles } from '@mui/material';
import { GridColumnsPanel, GridPanel } from '@mui/x-data-grid';
import { Search as SearchIcon } from '@mui/icons-material';
import { GridFilterPanel, GridFilterPanelProps } from '@mui/x-data-grid/components/panel/filterPanel/GridFilterPanel';

// ==============================
export const CustomSearchBar = ({ handleInputChange, searchText }: { handleInputChange?: (value: string) => void; searchText: string }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange?.(event.target.value);
  };

  return (
    <CustomInput
      autoFocus
      placeholder="Search..."
      type="text"
      value={searchText}
      onChange={onChange}
      startAdornment={<SearchIcon sx={{ height: '20px' }} color="action" />}
      sx={{
        displayPrint: 'none',
        display: 'flex',
        flex: 1
      }}
    />
  );
};

// ==============================
// Custom Columns Panel
// ==============================
export const CustomColumnsPanel = () => {
  return (
    <>
      <GlobalStyles
        styles={{
          '& [data-popper-placement="bottom-start"]': {
            display: 'none !important'
          }
        }}
      />
      <GridPanel open={true} placement="bottom-end">
        <GridColumnsPanel />
      </GridPanel>
    </>
  );
};

// ==============================
// Custom Filter Panel
// ==============================
export const CustomFilterPanel = (props: GridFilterPanelProps) => {
  return (
    <>
      <GlobalStyles
        styles={{
          '& [data-popper-placement="bottom-start"]': {
            display: 'none !important'
          }
        }}
      />
      <GridPanel open={true} placement="bottom-end">
        <GridFilterPanel {...props} />
      </GridPanel>
    </>
  );
};
