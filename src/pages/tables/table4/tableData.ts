import { ColumnConfig } from '@/components/app-table/columns';
import { Theme } from '@mui/material/styles';

export enum Availability {
  IN_STOCK = 'In Stock',
  OUT_OF_STOCK = 'Out of Stock',
  LIMITED = 'Limited'
}

// This defines what each row in the table will look like or (columns)
export interface TableData {
  id: number;
  title: string;
  author: string;
  genre: string;
  price: number;
  rating: number;
  availability: Availability;
  releaseDate: string;
  purchaseLink?: string;
  actions?: string;
}

// initialRows
export const initialRows: TableData[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    price: 10.99,
    rating: 4.5,
    availability: Availability.IN_STOCK,
    releaseDate: '1925-04-10',
    purchaseLink: 'https://example.com/great-gatsby'
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    price: 9.99,
    rating: 4.8,
    availability: Availability.IN_STOCK,
    releaseDate: '1949-06-08',
    purchaseLink: 'https://example.com/1984'
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    price: 12.99,
    rating: 4.7,
    availability: Availability.LIMITED,
    releaseDate: '1960-07-11',
    purchaseLink: 'https://example.com/to-kill-a-mockingbird'
  },
  {
    id: 4,
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    price: 15.99,
    rating: 3.9,
    availability: Availability.OUT_OF_STOCK,
    releaseDate: '1851-10-18',
    purchaseLink: 'https://example.com/moby-dick'
  },
  {
    id: 5,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    price: 10.49,
    rating: 4.3,
    availability: Availability.IN_STOCK,
    releaseDate: '1951-07-16',
    purchaseLink: 'https://example.com/catcher-in-the-rye'
  },
  {
    id: 6,
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    price: 11.49,
    rating: 4.2,
    availability: Availability.LIMITED,
    releaseDate: '1932-08-31',
    purchaseLink: 'https://example.com/brave-new-world'
  },
  {
    id: 7,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    price: 8.99,
    rating: 4.6,
    availability: Availability.IN_STOCK,
    releaseDate: '1813-01-28',
    purchaseLink: 'https://example.com/pride-and-prejudice'
  },
  {
    id: 8,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    price: 13.99,
    rating: 4.9,
    availability: Availability.IN_STOCK,
    releaseDate: '1937-09-21',
    purchaseLink: 'https://example.com/the-hobbit'
  }
];

// Interface for color mapping
export type AvailabilityColorMap = Record<Availability, { backgroundColor: string; color: string }>;

// This defines what color to be used for each status
const getAvailabilityColorMap = (theme: Theme): AvailabilityColorMap => ({
  // FIXME - Handle Theme properly
  [Availability.IN_STOCK]: {
    // @ts-ignore
    backgroundColor: theme.palette.success.lighter,
    color: theme.palette.success.main
  },
  [Availability.OUT_OF_STOCK]: {
    // @ts-ignore
    backgroundColor: theme.palette.error.lighter,
    color: theme.palette.error.main
  },
  [Availability.LIMITED]: {
    // @ts-ignore
    backgroundColor: theme.palette.warning.lighter,
    color: theme.palette.warning.main
  }
});

// This defines column configurations for the table
export const getColumnConfig = (theme: Theme): ColumnConfig<TableData>[] => [
  { field: 'title', headerName: 'BOOK TITLE', type: 'text' },
  { field: 'author', headerName: 'AUTHOR', type: 'text' },
  { field: 'genre', headerName: 'GENRE', type: 'text' },
  { field: 'price', headerName: 'PRICE ($)', type: 'number' },
  { field: 'rating', headerName: 'RATING', type: 'number' },
  {
    field: 'availability',
    headerName: 'AVAILABILITY',
    type: 'select',
    valueOptions: Object.values(Availability),
    colorMap: getAvailabilityColorMap(theme)
  },
  { field: 'releaseDate', headerName: 'RELEASE DATE', type: 'date' },
  {
    field: 'purchaseLink',
    headerName: 'LINK',
    type: 'link',
    maxWidth: 60
  },
  { field: 'actions', headerName: '', type: 'actions' }
];
