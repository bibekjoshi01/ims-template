import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useSnackbar } from 'notistack';
import Papa from 'papaparse';
import React from 'react';
import * as XLSX from 'xlsx';

import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button, Menu, MenuItem } from '@mui/material';

import { showErrorToast } from '@/utils/notifier';
import { IColumn } from './types';
import { GridRowModel, useGridApiContext } from '@mui/x-data-grid';

dayjs.extend(LocalizedFormat);

const formatValue = (col: IColumn, val: any, index: number) => {
  if (col.headerName === '#' || col.field === 'index') return index + 1;
  if (col.fieldType === 'date') return val ? dayjs(val).format('ll') : '';
  if (col.fieldType === 'boolean') return val ? 'TRUE' : 'FALSE';
  // FIXME - handle image type
  return val ?? '';
};

const buildData = (rows: GridRowModel[], columns: IColumn[]) =>
  rows?.map((row, idx) =>
    columns!.slice(0, -1).reduce(
      (acc, col) => {
        const key = col.headerName || col.field;
        acc[key] = formatValue(col, row[col.field], idx);
        return acc;
      },
      {} as Record<string, any>
    )
  ) ?? [];

export default function SaveExport({ title }: { title?: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { enqueueSnackbar } = useSnackbar();
  const apiRef = useGridApiContext();
  const allColumns = apiRef.current.getAllColumns() as IColumn[];
  const columns = allColumns.filter((col) => col.visible !== false && col.field !== '__check__');
  const rows = Array.from(apiRef.current.getRowModels().values());

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleExcelExport = () => {
    if (!columns?.length || !rows?.length) {
      enqueueSnackbar('No Data Available', { variant: 'error' });
      return;
    }
    const data = buildData(rows, columns);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const filename = `${title || 'export'}_table.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="primary"
        variant="text"
        aria-label="export"
        sx={{ fontSize: (theme) => theme.typography.body2 }}
        startIcon={<CloudDownloadOutlined style={{ marginLeft: '4px' }} />}
      >
        Export
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleCsvExport(columns, rows, title);
            handleClose();
          }}
        >
          Download CSV
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleExcelExport();
            handleClose();
          }}
        >
          Download Excel
        </MenuItem>
        <MenuItem
          onClick={() => {
            handlePrintPDF(columns, rows, title);
            handleClose();
          }}
        >
          Download PDF
        </MenuItem>
      </Menu>
    </>
  );
}

export const handlePrintPDF = (columns?: IColumn[], rows?: GridRowModel[], title = 'Exported Table') => {
  if (!columns?.length || !rows?.length) {
    showErrorToast('No Data Available');
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text(title, 14, 20);

  const headers = columns.slice(0, -1).map((col) => col.headerName || col.field);
  const data = rows.map((row, index) => columns.slice(0, -1).map((col) => formatValue(col, row[col.field], index)));

  autoTable(doc, {
    startY: 30,
    head: [headers],
    body: data,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [240, 240, 240], textColor: 0, fontStyle: 'bold' },
    theme: 'striped'
  });

  doc.save(`${title}.pdf`);
};

export const handleCsvExport = (columns?: IColumn[], rows?: GridRowModel[], title = 'Exported Table') => {
  if (!columns?.length || !rows?.length) {
    showErrorToast('No Data Available');
    return;
  }

  const headers = columns.slice(0, -1).map((col) => col.headerName || col.field);
  const data = rows.map((row, index) => columns.slice(0, -1).map((col) => formatValue(col, row[col.field], index)));

  const csv = Papa.unparse({
    fields: headers,
    data: data
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${title}_table.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
