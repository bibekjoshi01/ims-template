import { Grid, Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { settingsSchema, settings, defaultValues, SettingsFormDataType } from './data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import MainCard from '@/components/MainCard';
import FormSection from '@/components/FormSection';

export default function SettingsTab() {
  const theme = useTheme();

  // 1. Use react-hook-form with zodResolver for form validation
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SettingsFormDataType>({
    resolver: zodResolver(settingsSchema),
    defaultValues
  });

  // 2. Submit handler
  const onSubmit = (data: SettingsFormDataType) => {
    console.log('Form Data Submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ my: 1 }}>
        {/* Loop through settings and create a Grid item for each group */}
        {settings.map((group) => (
          <Grid item xs={12} sm={6} key={group.id}>
            <MainCard divider title={group.cardTitle}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">{group.cardDescription}</Typography>
              </Box>
              <FormSection<SettingsFormDataType>
                fields={group.fields}
                control={control}
                errors={errors}
                defaultValue={defaultValues}
                sx={{ display: 'flex', justifyContent: 'space-between', color: theme.palette.grey[500] }}
              />
            </MainCard>
          </Grid>
        ))}

        {/* --------------------- Bottom: Submit and Cancel Button -------------------- */}
        <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Update Settings
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
