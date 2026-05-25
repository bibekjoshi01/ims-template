import DOMPurify from 'dompurify';
import { Box, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';

export const HtmlSection: React.FC<{ html: string; title: string }> = ({ html, title }) => (
  <Box sx={{ mt: 2, py: 2, borderBottom: 1, borderColor: 'divider' }}>
    <Typography
      variant="body2"
      sx={(theme: Theme) => ({
        fontWeight: 500,
        color: theme.palette.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: '0.08em'
      })}
    >
      {title}
    </Typography>
    <Box dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
  </Box>
);
