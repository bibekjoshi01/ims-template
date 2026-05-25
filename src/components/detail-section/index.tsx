// Package Imports
import { useState } from 'react';

// MUI Core Imports
import MainCard from '@/components/cards/MainCard';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';

// Project Components & Types
import CloseButton from '@/components/app-dialog/CloseButton';
import FilePreviewDialog from '@/components/app-dialog/FilePreviewDialog';
import DynamicInfoSection from '@/components/detail-section/sections/dynamic-info';
import { DetailViewProps } from './types';

// --------------------
// Sub-Components
// --------------------
import { FilesSection } from './sections/files';
import { Header } from './sections/header';
import { HtmlSection } from './sections/html';
import { MembersSection } from './sections/members';

// --------------------
// Main Component
// --------------------
const DetailView: React.FC<DetailViewProps> = ({ title, avatar, status, sections, onClose }) => {
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [fileModalUrl, setFileModalUrl] = useState<string | null>(null);
  const [isCurrentFilePdf, setIsCurrentFilePdf] = useState(false);

  const handleOpenFileModal = (url: string, isPdf: boolean = false) => {
    setFileModalUrl(url);
    setIsCurrentFilePdf(isPdf);
    setIsFileModalOpen(true);
  };

  const handleCloseFileModal = () => {
    setFileModalUrl(null);
    setIsCurrentFilePdf(false);
    setIsFileModalOpen(false);
  };

  if (!sections || sections.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography
          variant="h5"
          sx={{
            mb: 3
          }}
        >
          No details found
        </Typography>
        <CircularProgress />
      </Paper>
    );
  }

  return (
    <MainCard sx={{ p: 0, overflow: 'hidden', position: 'relative' }}>
      <CloseButton onClose={onClose} />

      <Header title={title} avatar={avatar} status={status} />

      <Box sx={{ px: 2, py: 2 }}>
        {sections.map((section, idx) => {
          switch (section.type) {
            case 'dynamic-info':
              return <DynamicInfoSection key={idx} {...section.dynamicInfoProps} />;
            case 'html':
              return <HtmlSection key={idx} title={section.title || ''} html={section.html || ''} />;
            case 'files':
              return <FilesSection key={idx} files={section.files || []} onFileClick={handleOpenFileModal} />;
            case 'members':
              return <MembersSection key={idx} members={section.members || []} onFileClick={handleOpenFileModal} />;
            case 'custom':
              return (
                <Box key={idx} sx={{ mt: 3 }}>
                  {section.render?.()}
                </Box>
              );
            default:
              return null;
          }
        })}
      </Box>

      <FilePreviewDialog open={isFileModalOpen} onClose={handleCloseFileModal} fileUrl={fileModalUrl} isPdf={isCurrentFilePdf} />
    </MainCard>
  );
};

export default DetailView;
