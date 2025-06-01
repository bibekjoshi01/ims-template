export interface IColumn {
  field: string;
  headerName?: string;
  fieldType?: string;
  [key: string]: any;
}

export interface IRow {
  [key: string]: any;
}

export interface ISaveExportProps {
  columns?: IColumn[];
  rows?: IRow[];
  title?: string;
}
