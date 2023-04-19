import { Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from 'src/theme';

export const Accordion = styled(Box)(({ theme }) => ({
  '&:last-child': {
    marginBottom: 0,
  },
  marginBottom: theme.spacing(1),
}));

export const AccordionSummaryWrapper = styled(Box)(({ theme }) => ({
  '& .expand-icon': {
    borderRadius: '100%',
  },
  '& .metric-summary': {
    '& .metric-summary__bottom': {
      '& .generated': {
        '& p': {
          color: colors.wfBase[600],
          fontSize: '12px',
        },
        alignItems: 'center',
        display: 'flex',
        gap: theme.spacing(1),
      },
      alignItems: 'center',
      background: colors.wfBase[100],
      borderBottomRightRadius: theme.spacing(2),
      display: 'flex',
      gap: theme.spacing(1),
      padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
    },
    '& .metric-summary__top': {
      '& .stats': {
        display: 'flex',
        gap: theme.spacing(2),
      },
      padding: theme.spacing(3),
    },
    borderLeft: `1px solid ${colors.wfBase[400]}`,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    width: '600px',
  },
  '& .metric-title': {
    '& h5': {
      fontWeight: 700,
    },
    color: colors.wfBase[800],
    height: '100%',
    padding: theme.spacing(3),
    width: 'calc(100% - 600px)',
  },
  '& .summary': {
    display: 'flex',
    gap: '0.5rem',
  },
  '&:hover': {
    boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.16)',
  },
  background: '#fff',
  borderRadius: theme.spacing(2),
  boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.08)',
  cursor: 'pointer',
  display: 'flex',
  flex: 1,
  position: 'relative',
  transition: 'all .2s',
}));

export const SummaryItemBox = styled(Box)(({ theme }) => ({
  '&.active': {
    background:
      'linear-gradient(0deg, rgba(118, 90, 255, 0.16), rgba(118, 90, 255, 0.16)), #FFFFFF',
  },
  alignItems: 'center',
  color: colors.wfBase[800],
  display: 'flex',
  fontSize: '14px',
  fontWeight: 700,
  gap: '10px',
  padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  background: colors.wfBase[300],
  borderRadius: theme.spacing(0.5),
  color: colors.wfBase[600],
  fontSize: '12px',
}));
