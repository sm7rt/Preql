import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from 'src/theme';

export const Table = styled(Box)(({ theme }) => ({
  color: colors.wfBase[800],
}));

export const TableHeader = styled(Box)(({ theme }) => ({
  '& .tr': {
    '& .th': {
      alignItems: 'center',
      display: 'flex',
      height: theme.spacing(5),
      justifyContent: 'center',
      width: 200,
    },
    '& .th-default': {
      padding: `0 ${theme.spacing(3)}`,
    },
    '& .th-index': {
      width: theme.spacing(6),
    },
    '& .th-orders': {
      paddingLeft: theme.spacing(3),
      width: 160,
    },
    '& .th-timeframe': {
      width: 180,
    },
    borderBottom: `1px solid ${colors.wfBase[400]}`,
    borderTop: `1px solid ${colors.wfBase[400]}`,
    display: 'flex',
  },
}));

export const TableBody = styled(Box)(({ theme }) => ({
  '& .tr': {
    '& .td': {
      alignItems: 'center',
      borderRight: `1px solid ${colors.wfBase[400]}`,
      display: 'flex',
      height: '56px',
      justifyContent: 'center',
      width: 200,
    },
    '& .td-index': {
      color: colors.wfBase[400],
      justifyContent: 'flex-end',
      paddingRight: theme.spacing(2),
      width: theme.spacing(6),
    },
    '& .td-orders': {
      borderRight: `1px solid ${colors.wfBase[400]}`,
      paddingLeft: theme.spacing(3),
      width: 160,
    },
    '& .td-timeframe': {
      borderRight: `1px solid ${colors.wfBase[400]}`,
      width: 180,
    },
    borderBottom: `1px solid ${colors.wfBase[400]}`,
    display: 'flex',
  },
}));
