/**
 * Props for the TransferList component
 * @template T - The type of the items to be transferred.
 */
export interface TransferListProps<T> {
  /**
   * All available items (left list).
   */
  allItems: T[];

  /**
   * Currently selected items (right list).
   */
  selectedItems: T[];

  /**
   * Callback to update selected items.
   */
  onChange: (selected: T[]) => void;

  /**
   * Loading state for data fetching.
   */
  loading?: boolean;

  /**
   * Title for the left list.
   */
  titleLeft?: string;

  /**
   * Title for the right list.
   */
  titleRight?: string;

  /**
   * Primary Key to identify each item (e.g., 'id').
   */
  pk?: keyof T;

  /**
   * Function to render the label for each item.
   */
  renderLabel?: (item: T) => React.ReactNode;
}
