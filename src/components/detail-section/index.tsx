import React from 'react';
import { Box, Chip, Divider, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { camelCaseToNormal } from '@/utils/functions/formatString';
import { formatReadableDatetime } from '@/utils/functions/date';
import { DynamicInfoSectionProps } from './types';

const InfoItem = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2)
}));

const Label = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: theme.spacing(0.5)
}));

const Value = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  lineHeight: 1.5,
  '& .MuiChip-root': {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  }
}));

// Utility to safely access nested values
const getNestedValue = (obj: any, path: string): any =>
  path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);

// Value rendering logic
const renderValue = (path: string, value: any, dateTimeFields: string[], booleanFields: string[]): React.ReactNode => {
  if (dateTimeFields.includes(path) && value) {
    return formatReadableDatetime(value);
  }

  if (booleanFields.includes(path)) {
    return value ? <CheckCircleIcon color="success" fontSize="small" /> : <CancelIcon color="error" fontSize="small" />;
  }

  if (Array.isArray(value)) {
    return value.map((v, i) => <Chip key={i} label={String(v)} variant="outlined" />);
  }

  if (typeof value === 'object' && value !== null) {
    return Object.entries(value).map(([k, v], i) => (
      <Typography key={i} variant="body2">
        <strong>{camelCaseToNormal(k)}:</strong> {String(v)}
      </Typography>
    ));
  }

  return value !== null && value !== undefined ? String(value) : 'N/A';
};

const DynamicInfoSection: React.FC<DynamicInfoSectionProps> = ({
  data,
  columns = 2,
  excludeFields = [],
  fieldOrder = [],
  dateTimeFields = [],
  booleanFields = [],
  customLabels = {}
}) => {
  if (!data || typeof data !== 'object') return null;

  const fields = fieldOrder || Object.keys(data);
  const visibleFields = fields.filter((field) => !excludeFields.some((ex) => field === ex || field.startsWith(`${ex}.`)));

  return (
    <Grid container spacing={2}>
      {visibleFields.map((path) => {
        const value = getNestedValue(data, path);
        const label = customLabels[path] || camelCaseToNormal(path.split('.').pop() || path);
        const content = renderValue(path, value, dateTimeFields, booleanFields);

        return (
          <Grid item xs={12} sm={6} md={12 / columns} key={path}>
            <InfoItem>
              <Label variant="caption">{label}</Label>
              <Value>{content}</Value>
            </InfoItem>
            <Divider />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DynamicInfoSection;
