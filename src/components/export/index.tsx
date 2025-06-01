import React from 'react';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button, Menu, MenuItem } from '@mui/material';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { showErrorToast } from '@/utils/notifier';
import * as XLSX from 'xlsx';

interface Column {
  field: string;
  headerName?: string;
  fieldType?: string;
  [key: string]: any;
}

interface Row {
  [key: string]: any;
}

interface SaveExportProps {
  columns?: Column[];
  rows?: Row[];
  title?: string;
}

dayjs.extend(LocalizedFormat);

const formatValue = (col: Column, val: any, index: number) => {
  if (col.headerName === '#' || col.field === 'index') return index + 1;
  if (col.fieldType === 'date') return val ? dayjs(val).format('ll') : '';
  if (col.fieldType === 'boolean') return val ? 'TRUE' : 'FALSE';

  // FIXME - handle image
  // if (col.fieldType === 'image') return ''; //
  return val ?? '';
};

const buildData = (rows: Row[], columns: Column[]) =>
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

export default function SaveExport({ columns, rows, title }: SaveExportProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { enqueueSnackbar } = useSnackbar();

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

export const handlePrintPDF = (columns?: Column[], rows?: Row[], title = 'Exported Table') => {
  if (!columns?.length || !rows?.length) {
    showErrorToast('No Data Available');
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text(title, 14, 20);

  const headers = columns.slice(0, -1).map((col) => col.headerName || col.field);
  const data = rows.map((row, index) => columns.slice(0, -1).map((col) => formatValue(col, row[col.field], index)));

  // to limit width of image columns
  // const columnStyles = columns.reduce((acc, col, index) => {
  //   if (col.fieldType === 'image') {
  //     acc[index] = { cellWidth: 20 };
  //   }
  //   return acc;
  // }, {} as Record<string, { cellWidth: number }>);

  autoTable(doc, {
    startY: 30,
    head: [headers],
    body: data,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [240, 240, 240], textColor: 0, fontStyle: 'bold' },
    theme: 'striped'
    // columnStyles,
  });

  doc.save(`${title}.pdf`);
};

export const handleCsvExport = (columns?: Column[], rows?: Row[], title = 'Exported Table') => {
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
