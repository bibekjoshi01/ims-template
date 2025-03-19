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
  name: string;
  image: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  availability: Availability;
  addedDate: string;
  actions?: string;
}

// initialRows
export const initialRows: TableData[] = [
  {
    id: 1,
    image: 'https://picsum.photos/200',
    name: 'Laptop',
    category: 'Electronics',
    price: 1200,
    stock: 15,
    rating: 4.5,
    availability: Availability.IN_STOCK,
    addedDate: '2024-03-01'
  },
  {
    id: 2,
    image: 'https://picsum.photos/200',
    name: 'Mobile Phone',
    category: 'Electronics',
    price: 800,
    stock: 10,
    rating: 4.3,
    availability: Availability.IN_STOCK,
    addedDate: '2024-02-15'
  },
  {
    id: 3,
    image: 'https://picsum.photos/200',
    name: 'Table',
    category: 'Furniture',
    price: 150,
    stock: 5,
    rating: 4.8,
    availability: Availability.LIMITED,
    addedDate: '2024-01-20'
  },
  {
    id: 4,
    image: 'https://picsum.photos/200',
    name: 'Office Chair',
    category: 'Furniture',
    price: 250,
    stock: 0,
    rating: 4.1,
    availability: Availability.OUT_OF_STOCK,
    addedDate: '2023-12-10'
  },
  {
    id: 5,
    image: 'https://picsum.photos/200',
    name: 'Headphones',
    category: 'Electronics',
    price: 200,
    stock: 25,
    rating: 4.7,
    availability: Availability.IN_STOCK,
    addedDate: '2024-03-05'
  },
  {
    id: 6,
    image: 'https://picsum.photos/200',
    name: 'Smart Watch',
    category: 'Electronics',
    price: 300,
    stock: 8,
    rating: 4.4,
    availability: Availability.LIMITED,
    addedDate: '2024-02-20'
  },
  {
    id: 7,
    image: 'https://picsum.photos/200',
    name: 'Desk Lamp',
    category: 'Furniture',
    price: 45,
    stock: 12,
    rating: 4.6,
    availability: Availability.IN_STOCK,
    addedDate: '2024-01-25'
  },
  {
    id: 8,
    image: 'https://picsum.photos/200',
    name: 'Bookshelf',
    category: 'Furniture',
    price: 120,
    stock: 3,
    rating: 4.2,
    availability: Availability.OUT_OF_STOCK,
    addedDate: '2023-12-15'
  },
  {
    id: 9,
    image: 'https://picsum.photos/200',
    name: 'Blender',
    category: 'Appliances',
    price: 60,
    stock: 20,
    rating: 4.5,
    availability: Availability.IN_STOCK,
    addedDate: '2024-03-10'
  },
  {
    id: 10,
    image: 'https://picsum.photos/200',
    name: 'Microwave',
    category: 'Appliances',
    price: 150,
    stock: 7,
    rating: 4.3,
    availability: Availability.LIMITED,
    addedDate: '2024-02-25'
  },
  {
    id: 11,
    image: 'https://picsum.photos/200',
    name: 'Refrigerator',
    category: 'Appliances',
    price: 800,
    stock: 2,
    rating: 4.8,
    availability: Availability.OUT_OF_STOCK,
    addedDate: '2024-01-30'
  },
  {
    id: 12,
    image: 'https://picsum.photos/200',
    name: 'Sofa',
    category: 'Furniture',
    price: 700,
    stock: 5,
    rating: 4.7,
    availability: Availability.IN_STOCK,
    addedDate: '2023-12-20'
  },
  {
    id: 13,
    image: 'https://picsum.photos/200',
    name: 'Dining Table',
    category: 'Furniture',
    price: 500,
    stock: 1,
    rating: 4.6,
    availability: Availability.LIMITED,
    addedDate: '2024-03-15'
  },
  {
    id: 14,
    image: 'https://picsum.photos/200',
    name: 'Television',
    category: 'Electronics',
    price: 1000,
    stock: 10,
    rating: 4.9,
    availability: Availability.IN_STOCK,
    addedDate: '2024-02-10'
  },
  {
    id: 15,
    image: 'https://picsum.photos/200',
    name: 'Camera',
    category: 'Electronics',
    price: 600,
    stock: 4,
    rating: 4.4,
    availability: Availability.OUT_OF_STOCK,
    addedDate: '2024-01-15'
  },
  {
    id: 16,
    image: 'https://picsum.photos/200',
    name: 'Printer',
    category: 'Electronics',
    price: 200,
    stock: 9,
    rating: 4.3,
    availability: Availability.LIMITED,
    addedDate: '2023-12-05'
  },
  {
    id: 17,
    image: 'https://picsum.photos/200',
    name: 'Air Conditioner',
    category: 'Appliances',
    price: 1200,
    stock: 3,
    rating: 4.7,
    availability: Availability.IN_STOCK,
    addedDate: '2024-03-20'
  },
  {
    id: 18,
    image: 'https://picsum.photos/200',
    name: 'Washing Machine',
    category: 'Appliances',
    price: 900,
    stock: 6,
    rating: 4.5,
    availability: Availability.LIMITED,
    addedDate: '2024-02-05'
  },
  {
    id: 19,
    image: 'https://picsum.photos/200',
    name: 'Vacuum Cleaner',
    category: 'Appliances',
    price: 300,
    stock: 15,
    rating: 4.6,
    availability: Availability.IN_STOCK,
    addedDate: '2024-01-10'
  },
  {
    id: 20,
    image: 'https://picsum.photos/200',
    name: 'Fan',
    category: 'Appliances',
    price: 100,
    stock: 20,
    rating: 4.2,
    availability: Availability.OUT_OF_STOCK,
    addedDate: '2023-12-01'
  }
];

// Interface for color mapping
export type AvailabilityColorMap = Record<Availability, { backgroundColor: string | undefined; color: string }>;

// This defines what color to be used for each status
const getAvailabilityColorMap = (theme: Theme): AvailabilityColorMap => ({
  [Availability.IN_STOCK]: {
    backgroundColor: theme.palette.success.lighter,
    color: theme.palette.success.main
  },
  [Availability.OUT_OF_STOCK]: {
    backgroundColor: theme.palette.error.lighter,
    color: theme.palette.error.main
  },
  [Availability.LIMITED]: {
    backgroundColor: theme.palette.warning.lighter,
    color: theme.palette.warning.main
  }
});

// This defines column configurations for the table
export const getColumnConfig = (theme: Theme): ColumnConfig<TableData>[] => [
  { field: 'image', headerName: 'IMAGE', type: 'image' },
  { field: 'name', headerName: 'PRODUCT NAME', type: 'text' },
  { field: 'category', headerName: 'CATEGORY', type: 'text' },
  { field: 'price', headerName: 'PRICE ($)', type: 'number' },
  { field: 'stock', headerName: 'STOCK', type: 'number' },
  { field: 'rating', headerName: 'RATING', type: 'number' },
  {
    field: 'availability',
    headerName: 'AVAILABILITY',
    type: 'select',
    valueOptions: Object.values(Availability),
    colorMap: getAvailabilityColorMap(theme)
  },
  { field: 'addedDate', headerName: 'ADDED DATE', type: 'date' },
  { field: 'actions', headerName: '', type: 'actions' }
];
