import { ColumnConfig } from '@/components/app-table/columns';
import { Theme } from '@mui/material/styles';

export interface TableData {
  id: number;
  title: string;
  author: string;
  content: string;
  userId: number;
  published: boolean;
  createdAt: string;
  actions?: string;
}

// Fetch data from JSONPlaceholder
export const fetchInitialRows = async (): Promise<TableData[]> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Failed to fetch data');

    let data = await response.json();
    data = [
      ...data.map((post: any, i: number) => ({
        id: post.id,
        title: post.title,
        author: `User ${i + 1}`,
        content: post.body,
        userId: post.userId,
        published: Math.random() > 0.5,
        createdAt: new Date(Date.now() - Math.random() * 1e12).toISOString().split('T')[0]
      }))
    ];

    return new Promise<TableData[]>((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 2000);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const getColumnConfig = (theme: Theme): ColumnConfig<TableData>[] => [
  { field: 'author', headerName: 'AUTHOR', width: 120, type: 'text' },
  { field: 'title', headerName: 'POST TITLE', width: 320, type: 'text' },
  { field: 'content', headerName: 'CONTENT', width: 320, type: 'text' },
  {
    field: 'published',
    headerName: 'STATUS',
    width: 160,
    type: 'boolean',
    trueLabel: 'Published',
    falseLabel: 'Draft'
  },
  { field: 'createdAt', headerName: 'CREATED AT', width: 160, type: 'date' },
  { field: 'actions', headerName: '', width: 100, type: 'actions' }
];
