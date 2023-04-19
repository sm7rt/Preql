import { Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from 'src/theme';

export const MetricContentWrapper = styled(Box)(({ theme }) => ({
  '& .bottom': {
    '& .add-filter': {
      '& button': {
        textTransform: 'capitalize',
      },
      borderTop: `1px solid ${colors.wfBase[400]}`,
      padding: `${theme.spacing(1)} 0 ${theme.spacing(2)}`,
    },
    paddingTop: theme.spacing(2),
  },
  '& .dimensions': {
    '& .list': {
      '& .MuiChip-root': {
        '& .MuiChip-label': {
          paddingLeft: theme.spacing(0.5),
          paddingRight: theme.spacing(0.5),
        },
        background: colors.wfBase[300],
        borderRadius: theme.spacing(0.5),
        color: colors.wfBase[800],
        fontSize: '14px',
      },
      background: colors.wfBase[100],
      borderRadius: theme.spacing(1),
      display: 'flex',
      flexWrap: 'wrap',
      gap: theme.spacing(2),
      padding: theme.spacing(2),
    },
    '& p': {
      color: colors.wfBase[800],
      marginBottom: theme.spacing(2),
    },
  },
  '& .filter': {
    '& .selects': {
      '& .date-range-picker': {
        '& input': {
          border: 'none',
          color: colors.wfBase[800],
          height: '100%',
          outline: 'none',
          width: 80,
        },
        alignItems: 'center',
        border: `1px solid ${colors.wfBase[400]}`,
        borderRadius: '0px 6px 6px 0px',
        display: 'flex',
        height: 45,
        paddingLeft: theme.spacing(2),
        width: '100%',
      },
      '& .date-selector': {
        '& input': {
          border: 'none',
          color: colors.wfBase[800],
          flex: 1,
          height: '100%',
          outline: 'none',
          paddingLeft: theme.spacing(2),
        },
        border: `1px solid ${colors.wfBase[400]}`,
        borderRadius: '0px 6px 6px 0px',
        height: 45,
        paddingRight: theme.spacing(2),
        width: '100%',
      },
      display: 'flex',
      flex: 1,
    },
    alignItems: 'center',
    display: 'flex',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  '& .metric-wrapper': {
    '& .metric': {
      '& div': {
        '& span.variable': {
          background: colors.wfBase[200],
          borderRadius: '100px',
          fontSize: '14px',
        },
        color: colors.wfBase[800],
      },
    },
    '& .type': {
      color: colors.wfBase[800],
      fontSize: '14px',
      lineHeight: '46px',
      padding: `0 ${theme.spacing(1)}`,
      width: '135px',
    },
    alignItems: 'flex-start',
    display: 'flex',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
}));
