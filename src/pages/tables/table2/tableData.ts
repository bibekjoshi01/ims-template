import { ColumnConfig } from '@/components/app-table/columns';
import { Theme } from '@mui/material/styles';

// Enum for Employee Departments
export enum Department {
  HR = 'Human Resources',
  ENGINEERING = 'Engineering',
  MARKETING = 'Marketing',
  SALES = 'Sales',
  FINANCE = 'Finance',
  IT = 'IT Support'
}

// Enum for Employment Status
export enum EmploymentStatus {
  FULL_TIME = 'Full-Time',
  PART_TIME = 'Part-Time',
  CONTRACT = 'Contract',
  INTERN = 'Intern'
}

// Employee Table Data Interface
export interface TableData {
  id: number;
  name: string;
  email: string;
  age: number;
  department: Department;
  position: string;
  salary: number;
  status: EmploymentStatus;
  dateJoined: string;
  actions?: string;
}

// Initial Employee Data
export const initialRows: TableData[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@company.com',
    age: 30,
    department: Department.ENGINEERING,
    position: 'Software Engineer',
    salary: 85000,
    status: EmploymentStatus.FULL_TIME,
    dateJoined: '2025-03-11'
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@company.com',
    age: 27,
    department: Department.MARKETING,
    position: 'SEO Specialist',
    salary: 65000,
    status: EmploymentStatus.FULL_TIME,
    dateJoined: '2021-08-15'
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie.brown@company.com',
    age: 35,
    department: Department.SALES,
    position: 'Sales Manager',
    salary: 90000,
    status: EmploymentStatus.FULL_TIME,
    dateJoined: '2019-03-21'
  },
  {
    id: 4,
    name: 'David Lee',
    email: 'david.lee@company.com',
    age: 24,
    department: Department.IT,
    position: 'IT Support Technician',
    salary: 50000,
    status: EmploymentStatus.CONTRACT,
    dateJoined: '2023-06-30'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    email: 'emma.wilson@company.com',
    age: 22,
    department: Department.FINANCE,
    position: 'Financial Analyst',
    salary: 70000,
    status: EmploymentStatus.INTERN,
    dateJoined: '2024-01-05'
  },
  {
    id: 6,
    name: 'Fiona Green',
    email: 'fiona.green@company.com',
    age: 29,
    department: Department.HR,
    position: 'HR Manager',
    salary: 75000,
    status: EmploymentStatus.FULL_TIME,
    dateJoined: '2020-11-12'
  },
  {
    id: 7,
    name: 'George White',
    email: 'george.white@company.com',
    age: 31,
    department: Department.ENGINEERING,
    position: 'DevOps Engineer',
    salary: 88000,
    status: EmploymentStatus.FULL_TIME,
    dateJoined: '2018-07-23'
  },
  {
    id: 8,
    name: 'Hannah Black',
    email: 'hannah.black@company.com',
    age: 26,
    department: Department.MARKETING,
    position: 'Content Writer',
    salary: 62000,
    status: EmploymentStatus.PART_TIME,
    dateJoined: '2021-02-14'
  },
  {
    id: 9,
    name: 'Ian Brown',
    email: 'ian.brown@company.com',
    age: 28,
    department: Department.SALES,
    position: 'Sales Executive',
    salary: 68000,
    status: EmploymentStatus.FULL_TIME,
    dateJoined: '2020-09-30'
  },
  {
    id: 10,
    name: 'Jane Doe',
    email: 'jane.doe@company.com',
    age: 34,
    department: Department.IT,
    position: 'Network Administrator',
    salary: 78000,
    status: EmploymentStatus.FULL_TIME,
    dateJoined: '2019-12-01'
  },
  {
    id: 11,
    name: 'Kevin Hart',
    email: 'kevin.hart@company.com',
    age: 25,
    department: Department.FINANCE,
    position: 'Accountant',
    salary: 71000,
    status: EmploymentStatus.CONTRACT,
    dateJoined: '2022-03-15'
  },
  {
    id: 12,
    name: 'Laura King',
    email: 'laura.king@company.com',
    age: 32,
    department: Department.HR,
    position: 'Recruiter',
    salary: 67000,
    status: EmploymentStatus.FULL_TIME,
    dateJoined: '2021-06-18'
  },
  {
    id: 13,
    name: 'Michael Scott',
    email: 'michael.scott@company.com',
    age: 40,
    department: Department.SALES,
    position: 'Regional Manager',
    salary: 95000,
    status: EmploymentStatus.FULL_TIME,
    dateJoined: '2017-04-25'
  },
  {
    id: 14,
    name: 'Nancy Drew',
    email: 'nancy.drew@company.com',
    age: 27,
    department: Department.ENGINEERING,
    position: 'Frontend Developer',
    salary: 82000,
    status: EmploymentStatus.FULL_TIME,
    dateJoined: '2020-10-05'
  },
  {
    id: 15,
    name: 'Oscar Wilde',
    email: 'oscar.wilde@company.com',
    age: 33,
    department: Department.MARKETING,
    position: 'Marketing Manager',
    salary: 86000,
    status: EmploymentStatus.FULL_TIME,
    dateJoined: '2019-01-20'
  },
  {
    id: 16,
    name: 'Paul Newman',
    email: 'paul.newman@company.com',
    age: 29,
    department: Department.IT,
    position: 'System Administrator',
    salary: 74000,
    status: EmploymentStatus.FULL_TIME,
    dateJoined: '2021-11-11'
  },
  {
    id: 17,
    name: 'Quincy Adams',
    email: 'quincy.adams@company.com',
    age: 26,
    department: Department.FINANCE,
    position: 'Financial Advisor',
    salary: 69000,
    status: EmploymentStatus.PART_TIME,
    dateJoined: '2022-08-22'
  },
  {
    id: 18,
    name: 'Rachel Green',
    email: 'rachel.green@company.com',
    age: 28,
    department: Department.HR,
    position: 'HR Specialist',
    salary: 72000,
    status: EmploymentStatus.FULL_TIME,
    dateJoined: '2020-05-17'
  },
  {
    id: 19,
    name: 'Steve Rogers',
    email: 'steve.rogers@company.com',
    age: 35,
    department: Department.ENGINEERING,
    position: 'Backend Developer',
    salary: 89000,
    status: EmploymentStatus.FULL_TIME,
    dateJoined: '2018-03-12'
  },
  {
    id: 20,
    name: 'Tina Turner',
    email: 'tina.turner@company.com',
    age: 30,
    department: Department.MARKETING,
    position: 'Social Media Manager',
    salary: 68000,
    status: EmploymentStatus.FULL_TIME,
    dateJoined: '2021-07-29'
  }
];

// Employee Status Colors
export type EmployeeStatusColorMap = Record<EmploymentStatus, { backgroundColor: string; color: string }>;

const getEmployeeStatusColorMap = (theme: Theme): EmployeeStatusColorMap => ({
  // FIXME - Handle Theme properly
  // @ts-ignore
  [EmploymentStatus.FULL_TIME]: { backgroundColor: theme.palette.success.lighter, color: theme.palette.success.main },
  // @ts-ignore
  [EmploymentStatus.PART_TIME]: { backgroundColor: theme.palette.warning.lighter, color: theme.palette.warning.main },
  // @ts-ignore
  [EmploymentStatus.CONTRACT]: { backgroundColor: theme.palette.info.lighter, color: theme.palette.info.main },
  // @ts-ignore
  [EmploymentStatus.INTERN]: { backgroundColor: theme.palette.secondary.lighter, color: theme.palette.secondary.main }
});

export type DepartmentColorMap = Record<Department, { backgroundColor: string; color: string }>;

const getDepartmentColorMap = (theme: Theme): DepartmentColorMap => ({
  // @ts-ignore
  [Department.HR]: { backgroundColor: theme.palette.primary.lighter, color: theme.palette.primary.main },
  // @ts-ignore
  [Department.ENGINEERING]: { backgroundColor: theme.palette.secondary.lighter, color: theme.palette.secondary.main },
  // @ts-ignore
  [Department.MARKETING]: { backgroundColor: theme.palette.error.lighter, color: theme.palette.error.main },
  // @ts-ignore
  [Department.SALES]: { backgroundColor: theme.palette.warning.lighter, color: theme.palette.warning.main },
  // @ts-ignore
  [Department.FINANCE]: { backgroundColor: theme.palette.info.lighter, color: theme.palette.info.main },
  // @ts-ignore
  [Department.IT]: { backgroundColor: theme.palette.success.lighter, color: theme.palette.success.main }
});

// Employee Table Column Config
export const getColumnConfig = (theme: Theme): ColumnConfig<TableData>[] => [
  { field: 'name', headerName: 'NAME', type: 'text' },
  { field: 'email', headerName: 'EMAIL', type: 'text' },
  {
    field: 'department',
    headerName: 'DEPARTMENT',

    type: 'select',
    valueOptions: Object.values(Department),
    colorMap: getDepartmentColorMap(theme)
  },
  { field: 'position', headerName: 'POSITION', type: 'text' },
  { field: 'salary', headerName: 'SALARY ($)', type: 'number' },
  {
    field: 'status',
    headerName: 'STATUS',

    type: 'select',
    valueOptions: Object.values(EmploymentStatus),
    colorMap: getEmployeeStatusColorMap(theme)
  },
  { field: 'dateJoined', headerName: 'DATE JOINED', type: 'date' },
  { field: 'actions', headerName: '', type: 'actions' }
];
