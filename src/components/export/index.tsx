import { CloudDownloadOutlined } from '@ant-design/icons';
import { IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { GridCsvExportMenuItem } from '@mui/x-data-grid';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useSnackbar } from 'notistack';
import React from 'react';
import * as XLSX from 'xlsx';

import { showErrorToast } from '@/utils/notifier';

interface Column {
  field: string;
  headerName?: string;
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

export default function SaveExport({ columns, rows, title }: SaveExportProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExcelExport = () => {
    if (!columns || !columns.length || !rows || !rows.length) {
      enqueueSnackbar('No Data Available', { variant: 'error' });
      return;
    }

    const exportData = rows?.map((row: any) =>
      columns?.slice(0, -1).reduce((acc: any, col: any) => {
        acc[col.headerName || col.field] = row[col.field];
        return acc;
      }, {})
    );

    const worksheet = XLSX.utils.json_to_sheet(exportData || []);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, `${title || 'export'}_table.xlsx`);
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small" color="primary" aria-label="export" sx={{ p: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
          <CloudDownloadOutlined color="primary" />
          <Typography variant="button" color="primary" sx={{ userSelect: 'none' }}>
            Export
          </Typography>
        </Stack>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <GridCsvExportMenuItem
          options={{
            fileName: `${title || 'export'}_table`,
            delimiter: ',',
            utf8WithBom: true,
            includeHeaders: true,
            fields: columns?.slice(0, -1).map((col) => col.field) || []
          }}
        />
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

export const handlePrintPDF = (columns: Column[] | undefined, rows: Row[] | undefined, title: string = 'Exported Table'): void => {
  if (!columns || !columns.length || !rows || !rows.length) {
    showErrorToast('No Data Available');
    return;
  }

  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text(title, 14, 20);

  // Table Headers
  const headers = columns.slice(0, -1).map((col) => col.headerName || col.field);

  // Table Data
  const data = rows.map((row) => columns.slice(0, -1).map((col) => row[col.field] ?? ''));

  // Auto Table
  autoTable(doc, {
    startY: 30,
    head: [headers],
    body: data,
    styles: {
      font: 'helvetica',
      fontSize: 10
    },
    headStyles: {
      fillColor: [240, 240, 240],
      textColor: 0,
      fontStyle: 'bold'
    },
    theme: 'striped'
  });

  // Save PDF
  doc.save(`${title}.pdf`);
};
