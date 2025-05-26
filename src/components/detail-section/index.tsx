// Mui Imports
import React from 'react';
import { Typography, Box, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

// Utils
import { camelCaseToNormal } from '@/utils/functions/formatString';
import { formatReadableDatetime } from '@/utils/functions/date';

// Types
import { DynamicInfoSectionProps, InfoFieldProps } from './types';

// Styled components
const InfoItem = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2)
}));

const Label = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: theme.spacing(0.5)
}));

const Value = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 400,
  color: theme.palette.text.primary,
  lineHeight: 1.5
}));

// InfoField component
const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => (
  <InfoItem>
    <Label variant="caption">{label}</Label>
    <Value variant="body1">{Array.isArray(value) ? value.join(', ') : String(value || 'N/A')}</Value>
  </InfoItem>
);

const DynamicInfoSection: React.FC<DynamicInfoSectionProps> = ({
  data,
  columns = 2,
  excludeFields = [],
  dateTimeFields = [],
  customLabels = {},
  fieldOrder = null
}) => {
  if (!data || typeof data !== 'object') return null;

  // Filter out excluded fields and get entries
  const entries: [string, any][] = Object.entries(data).filter(([key]) => !excludeFields.includes(key));

  // Order entries based on fieldOrder if provided
  const orderedEntries: [string, any][] = fieldOrder
    ? fieldOrder
        .filter((key) => data.hasOwnProperty(key) && !excludeFields.includes(key))
        .map((key) => [key, data[key]] as [string, any])
        .concat(entries.filter(([key]) => !fieldOrder.includes(key)))
    : entries;

  // Format date/time fields if provided
  const formattedEntries: [string, any][] = dateTimeFields
    ? orderedEntries.map(([key, value]) => {
        if (dateTimeFields.includes(key) && value) {
          return [key, formatReadableDatetime(value)];
        }
        return [key, value];
      })
    : orderedEntries;

  return (
    <Grid container spacing={2}>
      {formattedEntries.map(([key, value], index) => {
        const label = customLabels[key] || camelCaseToNormal(key);
        return (
          <Grid
            item
            xs={12}
            sm={6} // 2 columns on small+ screens
            md={12 / columns} // Flexible column count for md+
            key={index}
          >
            <InfoField label={label} value={value} />
            {/* Divider between items except the last one */}
            {index < formattedEntries.length - 1 && <Divider />}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DynamicInfoSection;
