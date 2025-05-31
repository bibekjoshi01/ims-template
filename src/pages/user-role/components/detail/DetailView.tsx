// PACKAGE IMPORTS
import { CalendarToday, CancelOutlined, CheckCircleOutline, Close, ExpandMore, PersonOutline } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';

// PROJECT IMPORTS
import InfoCard from '@/components/cards/Infocard';
import MainCard from '@/components/cards/MainCard';

// LOCAL IMPORTS
import { useGroupedPermissions } from '../../hooks/useGroupedPermissions';
import { UserRoleDetailed } from '../../redux/types';

interface DetailViewProps {
  userRoleData?: UserRoleDetailed;
  onClose: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ userRoleData, onClose }) => {
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
      {/* Close Button */}
      <IconButton onClick={onClose} aria-label="close" size="small" sx={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }}>
        <Close />
      </IconButton>

      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          flexDirection: { xxs: 'column', xs: 'row' },
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Avatar sx={{ width: 72, height: 72, mr: 3 }}>{userRoleData.name.charAt(0)}</Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5">{userRoleData.name}</Typography>
          {/* <Typography variant="body2" color="text.secondary">
            ID: {userRoleData.id}
          </Typography> */}
          <Box sx={{ mt: 1 }}>
            <Chip
              size="small"
              variant="outlined"
              color={userRoleData.isActive ? 'success' : 'error'}
              label={userRoleData.isActive ? 'Active' : 'Inactive'}
              icon={userRoleData.isActive ? <CheckCircleOutline fontSize="small" /> : <CancelOutlined fontSize="small" />}
              sx={{
                mr: 1,
                p: 1.5,
                fontWeight: 500,
                borderRadius: 1
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ px: { xxs: 0, xs: 2 }, py: 1 }}>
        {/* Role Information */}
        <Grid container spacing={3}>
          <Grid item xxs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
              Role Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xxs={12} sm={6} md={3}>
                <InfoCard icon={<PersonOutline />} title="Codename" value={userRoleData.codename} />
              </Grid>
              <Grid item xxs={12} sm={6} md={3}>
                <InfoCard icon={<PersonOutline />} title="Created By" value={userRoleData.createdByUsername} />
              </Grid>
              <Grid item xxs={12} sm={6} md={3}>
                <InfoCard icon={<CalendarToday />} title="Created At" value={formatDate(userRoleData.createdAt)} />
              </Grid>
              <Grid item xxs={12} sm={6} md={3}>
                <InfoCard icon={<CalendarToday />} title="Updated At" value={formatDate(userRoleData.updatedAt)} />
              </Grid>
            </Grid>
          </Grid>

          {/* Permissions */}
          <Grid item xxs={12}>
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

export default DetailView;
