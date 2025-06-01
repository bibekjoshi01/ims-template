import MainCard from '@/components/cards/MainCard';
import { Box, Button, Checkbox, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useState } from 'react';
import { TransferListProps } from './types';

/**
 * Generic Transfer List Component
 *
 * - Allows transferring items between two lists.
 * - Handles single and bulk selection with checkbox.
 * - Supports custom rendering of item labels.
 *
 * @template T - The type of items to be transferred.
 */
export default function TransferList<T>({
  allItems,
  selectedItems,
  onChange,
  loading = false,
  titleLeft = 'Available',
  titleRight = 'Selected',
  pk = 'id' as keyof T,
  renderLabel
}: TransferListProps<T>) {
  /**
   * State to manage checked items across both lists.
   */
  const [checked, setChecked] = useState<T[]>([]);

  /**
   * Helper function to find items in `a` but not in `b`.
   * This is used to identify available and unselected items.
   */
  const not = (a: T[], b: T[]): T[] => a.filter((itemA) => !b.some((itemB) => itemB[pk] === itemA[pk]));

  /**
   * Helper function to find common items in both `a` and `b`.
   * Used to identify checked items in each list.
   */
  const intersection = (a: T[], b: T[]): T[] => a.filter((itemA) => b.some((itemB) => itemB[pk] === itemA[pk]));

  /**
   * Helper function to merge two lists, removing duplicates.
   * Ensures no duplicate items in either list.
   */
  const union = (a: T[], b: T[]): T[] => [...a, ...not(b, a)];

  /**
   * Available items for selection (left list).
   */
  const availableItems = not(allItems, selectedItems);

  /**
   * Checked items specific to the left and right lists.
   */
  const leftChecked = intersection(checked, availableItems);
  const rightChecked = intersection(checked, selectedItems);

  /**
   * Toggle an item's checked state.
   */
  const handleToggle = (item: T) => () => {
    const isChecked = checked.some((checkedItem) => checkedItem[pk] === item[pk]);
    const newChecked = isChecked ? not(checked, [item]) : [...checked, item];
    setChecked(newChecked);
  };

  /**
   * Toggle all items' checked state within a list.
   */
  const handleToggleAll = (items: T[]) => () => {
    const allChecked = intersection(checked, items).length === items.length;
    setChecked(allChecked ? not(checked, items) : union(checked, items));
  };

  /**
   * Moves checked items from the left list to the right list.
   */
  const handleCheckedRight = () => {
    const newSelected = union(selectedItems, leftChecked);
    onChange(newSelected);
    setChecked(not(checked, leftChecked));
  };

  /**
   * Moves checked items from the right list to the left list.
   */
  const handleCheckedLeft = () => {
    const newSelected = not(selectedItems, rightChecked);
    onChange(newSelected);
    setChecked(not(checked, rightChecked));
  };

  /**
   * Renders a list with checkboxes, a title, and a selection count.
   */
  const renderList = (title: string, items: T[]) => (
    <MainCard
      sx={{
        mt: 4,
        border: '1px solid',
        borderColor: 'divider',
        width: '100%',
        height: 320,
        overflow: 'auto',
        position: 'relative',
        '& .MuiCardContent-root': {
          pt: 0
        }
      }}
    >
      {/* Header with checkbox to select/deselect all items */}
      <Box
        sx={{
          p: 2,
          backgroundColor: 'background.paper',
          zIndex: 1,
          position: 'sticky',
          top: 0,
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          gap: 1
        }}
      >
        <Checkbox
          onClick={handleToggleAll(items)}
          checked={intersection(checked, items).length === items.length && items.length !== 0}
          indeterminate={intersection(checked, items).length > 0 && intersection(checked, items).length < items.length}
          disabled={items.length === 0}
        />
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">
            {intersection(checked, items).length}/{items.length} selected
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* List of items with checkboxes */}
      <List dense>
        {loading ? (
          <Typography textAlign="center" mt={2}>
            Loading...
          </Typography>
        ) : items.length === 0 ? (
          <Typography textAlign="center" mt={2}>
            No items
          </Typography>
        ) : (
          items.map((item) => {
            const itemId = item[pk] as string | number;
            const label = renderLabel ? renderLabel(item) : itemId;

            return (
              <ListItem key={itemId} button onClick={handleToggle(item)}>
                <ListItemIcon>
                  <Checkbox checked={checked.some((c) => c[pk] === itemId)} />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            );
          })
        )}
      </List>
    </MainCard>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={5}>
        {renderList(titleLeft, availableItems)}
      </Grid>

      {/* Transfer Buttons */}
      <Grid item sm={2}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Button variant="outlined" size="small" onClick={handleCheckedRight} disabled={leftChecked.length === 0}>
            <Typography variant="body2" sx={{ rotate: { xxs: '90deg', sm: '0deg' } }}>
              {' '}
              &gt;{' '}
            </Typography>
          </Button>
          <Button variant="outlined" size="small" onClick={handleCheckedLeft} disabled={rightChecked.length === 0}>
            <Typography variant="body2" sx={{ rotate: { xxs: '90deg', sm: '0deg' } }}>
              {' '}
              &lt;{' '}
            </Typography>
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} sm={5}>
        {renderList(titleRight, selectedItems)}
      </Grid>
    </Grid>
  );
}
