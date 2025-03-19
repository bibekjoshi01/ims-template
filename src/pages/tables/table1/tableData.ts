import { ColumnConfig } from '@/components/app-table/columns';
import { Theme } from '@mui/material/styles';

export enum Status {
  RELATIONSHIP = 'Relationship',
  SINGLE = 'Single',
  COMPLICATED = 'Complicated'
}

// This defines what each row in the table will look like or (columns)
export interface TableData {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
  visits: number;
  status: Status;
  profileProgress: number;
  actions?: string;
}

// initialRows
export const initialRows: TableData[] = [
  {
    id: 1,
    name: 'Barbara Bernard',
    email: 'je@gmail.com',
    age: 18,
    role: 'Teacher',
    visits: 3710,
    status: Status.RELATIONSHIP,
    profileProgress: 75,
  },
  {
    id: 2,
    name: 'Elva Salucci',
    email: 'afbeodu@gmail.com',
    age: 19,
    role: 'Radiology Manager',
    visits: 420,
    status: Status.RELATIONSHIP,
    profileProgress: 96,
  },
  {
    id: 3,
    name: 'Lucile Turner',
    email: 'foger@gmail.com',
    age: 19,
    role: 'Organizational Development Manager',
    visits: 3227,
    status: Status.COMPLICATED,
    profileProgress: 26,
  },
  {
    id: 4,
    name: 'Ricardo van der Meulen',
    email: 'pif@gmail.com',
    age: 30,
    role: 'Forestry Technician',
    visits: 6204,
    status: Status.SINGLE,
    profileProgress: 88,
  },
  {
    id: 5,
    name: 'Anne Walters',
    email: 'oz@gmail.com',
    age: 37,
    role: 'Maintenance Manager',
    visits: 7612,
    status: Status.RELATIONSHIP,
    profileProgress: 12,
  },
  {
    id: 6,
    name: 'Blake Voigt',
    email: 'lucog@gmail.com',
    age: 42,
    role: 'Hazardous Waste Manager',
    visits: 1173,
    status: Status.RELATIONSHIP,
    profileProgress: 31,
  },
  {
    id: 7,
    name: 'Elsie Conforti',
    email: 'bosduh@gmail.com',
    age: 53,
    role: 'Bankruptcy Attorney',
    visits: 7823,
    status: Status.SINGLE,
    profileProgress: 19,
  },
  {
    id: 8,
    name: 'Luella Conti',
    email: 'atdofla@gmail.com',
    age: 54,
    role: 'Financial Analyst',
    visits: 2177,
    status: Status.SINGLE,
    profileProgress: 12,
  },
  {
    id: 9,
    name: 'Clara Paladini',
    email: 'ek@gmail.com',
    age: 60,
    role: 'Accountant',
    visits: 9009,
    status: Status.COMPLICATED,
    profileProgress: 13,
  },
  {
    id: 10,
    name: 'Joe Gérard',
    email: 'ludcagero@gmail.com',
    age: 60,
    role: 'Software Developer',
    visits: 3578,
    status: Status.RELATIONSHIP,
    profileProgress: 37,
  },
  {
    id: 11,
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    age: 28,
    role: 'Project Manager',
    visits: 1500,
    status: Status.SINGLE,
    profileProgress: 45,
  },
  {
    id: 12,
    name: 'Jane Smith',
    email: 'jane.smith@gmail.com',
    age: 34,
    role: 'Designer',
    visits: 2300,
    status: Status.RELATIONSHIP,
    profileProgress: 60,
  },
  {
    id: 13,
    name: 'Michael Brown',
    email: 'michael.brown@gmail.com',
    age: 45,
    role: 'Engineer',
    visits: 3200,
    status: Status.COMPLICATED,
    profileProgress: 80,
  },
  {
    id: 14,
    name: 'Emily Davis',
    email: 'emily.davis@gmail.com',
    age: 29,
    role: 'Marketing Manager',
    visits: 4100,
    status: Status.SINGLE,
    profileProgress: 50,
  },
  {
    id: 15,
    name: 'David Wilson',
    email: 'david.wilson@gmail.com',
    age: 38,
    role: 'Sales Manager',
    visits: 5000,
    status: Status.RELATIONSHIP,
    profileProgress: 70,
  },
  {
    id: 16,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@gmail.com',
    age: 32,
    role: 'HR Manager',
    visits: 6000,
    status: Status.COMPLICATED,
    profileProgress: 90,
  },
  {
    id: 17,
    name: 'Chris Lee',
    email: 'chris.lee@gmail.com',
    age: 27,
    role: 'Developer',
    visits: 7000,
    status: Status.SINGLE,
    profileProgress: 40,
  },
  {
    id: 18,
    name: 'Anna Kim',
    email: 'anna.kim@gmail.com',
    age: 35,
    role: 'Product Manager',
    visits: 8000,
    status: Status.RELATIONSHIP,
    profileProgress: 65,
  },
  {
    id: 19,
    name: 'James White',
    email: 'james.white@gmail.com',
    age: 42,
    role: 'Consultant',
    visits: 9000,
    status: Status.COMPLICATED,
    profileProgress: 85,
  },
  {
    id: 20,
    name: 'Laura Martinez',
    email: 'laura.martinez@gmail.com',
    age: 31,
    role: 'Analyst',
    visits: 10000,
    status: Status.SINGLE,
    profileProgress: 55,
  }
];

// Interface for color mapping
export type StatusColorMap = Record<Status, { backgroundColor: string | undefined; color: string }>;

// This defines what color to be used for each status
const getStatusColorMap = (theme: Theme): StatusColorMap => ({
  [Status.RELATIONSHIP]: {
    backgroundColor: theme.palette.success.lighter,
    color: theme.palette.success.main
  },
  [Status.SINGLE]: {
    backgroundColor: theme.palette.info.lighter,
    color: theme.palette.info.main
  },
  [Status.COMPLICATED]: {
    backgroundColor: theme.palette.error.lighter,
    color: theme.palette.error.main
  }
});

// This defines column configurations for the table
export const getColumnConfig = (theme: Theme): ColumnConfig<TableData>[] => [
  { field: 'name', headerName: 'NAME', type: 'text' },
  { field: 'email', headerName: 'EMAIL', type: 'text' },
  { field: 'role', headerName: 'ROLE', type: 'text' },
  { field: 'age', headerName: 'AGE', type: 'number' },
  { field: 'visits', headerName: 'VISITS', maxWidth: 100, type: 'number' },
  {
    field: 'status',
    headerName: 'STATUS',
    type: 'select',
    valueOptions: Object.values(Status),
    colorMap: getStatusColorMap(theme)
  },
  {
    field: 'profileProgress',
    headerName: 'PROFILE PROGRESS',
    type: 'progress'
  },
  {
    field: 'actions',
    headerName: '',
    type: 'actions'
  }
];
