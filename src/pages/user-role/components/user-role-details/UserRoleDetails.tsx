// MUI Imports
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography
} from '@mui/material';

import { CheckCircleOutline, Close, PersonOutline, CalendarToday, ExpandMore } from '@mui/icons-material';

// Project Imports
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import MainCard from '@/components/MainCard';
import { UserRoleDetailed } from '../../redux/types';
import { useGroupedPermissions } from '../../hooks/useGroupedPermissions';

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  chipColor?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value, chipColor }) => (
  <Card variant="outlined" sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ color: 'primary.main', mr: 1 }}>{icon}</Box>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
      </Box>
      {chipColor ? (
        <Chip label={value} color={chipColor} sx={{ mt: 1 }} />
      ) : (
        <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
          {value || 'N/A'}
        </Typography>
      )}
    </CardContent>
  </Card>
);

interface UserRoleDetailsProps {
  userRoleData?: UserRoleDetailed;
  onClose: () => void;
}

const UserRoleDetails: React.FC<UserRoleDetailsProps> = ({ userRoleData, onClose }) => {
  const { groupedPermissions, isLoading } = useGroupedPermissions(userRoleData);
  const formatDate = (date?: string) => (date ? dayjs(date).format('MMM D, YYYY h:mm A') : 'N/A');

  if (!userRoleData) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" mb={3}>
          User Role Details
        </Typography>
        <CircularProgress />
      </Paper>
    );
  }

  return (
    <MainCard sx={{ p: 0, overflow: 'hidden', position: 'relative' }}>
      <IconButton onClick={onClose} color="error" size="small" sx={{ position: 'absolute', top: 5, right: 5 }}>
        <Close />
      </IconButton>

      {/* Header */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <Avatar sx={{ width: 72, height: 72, mr: 3 }}>{userRoleData.name.charAt(0)}</Avatar>
        <Box>
          <Typography variant="h5">{userRoleData.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            ID: {userRoleData.id}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Chip
              size="small"
              color={userRoleData.isActive ? 'success' : 'error'}
              label={userRoleData.isActive ? 'Active' : 'Inactive'}
              icon={<CheckCircleOutline fontSize="small" />}
            />
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3 }}>
        {/* Role Information */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
              Role Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <InfoCard icon={<PersonOutline />} title="Codename" value={userRoleData.codename} />
              </Grid>
              <Grid item xs={3}>
                <InfoCard icon={<PersonOutline />} title="Created By" value={userRoleData.createdByUsername} />
              </Grid>
              <Grid item xs={3}>
                <InfoCard icon={<CalendarToday />} title="Created At" value={formatDate(userRoleData.createdAt)} />
              </Grid>
              <Grid item xs={3}>
                <InfoCard icon={<CalendarToday />} title="Updated At" value={formatDate(userRoleData.updatedAt)} />
              </Grid>
            </Grid>
          </Grid>

          {/* Permissions */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
              Permissions
            </Typography>
            {isLoading ? (
              <CircularProgress />
            ) : groupedPermissions.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No permissions assigned
              </Typography>
            ) : (
              <Box>
                {groupedPermissions.map((moduleGroup, index) => (
                  <Accordion key={`module-${index}`} defaultExpanded={index === 0}>
                    <AccordionSummary expandIcon={<ExpandMore />} aria-controls={`module-${index}-content`} id={`module-${index}-header`}>
                      <Typography sx={{ fontWeight: 'medium' }}>{moduleGroup.mainModuleName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 2 }}>
                      {moduleGroup.categories.map((category, catIndex) => (
                        <Accordion key={`category-${index}-${catIndex}`}>
                          <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls={`category-${index}-${catIndex}-content`}
                            id={`category-${index}-${catIndex}-header`}
                          >
                            <Typography>{category.permissionCategoryName}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid container spacing={1}>
                              {category.permissions.map((permission) => (
                                <Grid item key={permission.id}>
                                  <Chip label={permission.name} variant="outlined" size="small" color="primary" />
                                </Grid>
                              ))}
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default UserRoleDetails;
