import { Box, Button, ButtonBase, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from 'src/theme';

export const Content = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
}));

export const LeftNavigation = styled(Box)(({ theme }) => ({
  borderRight: `1px solid ${colors.wfBase[400]}`,
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  width: 396,
}));

export const SheetsList = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${colors.wfBase[400]}`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(),
  marginTop: 75,
  paddingTop: theme.spacing(2),
}));

export const SheetButton = styled(ButtonBase)(({ theme }) => ({
  '&.active': {
    background: 'rgba(130, 111, 245, 0.16)',
  },
  alignItems: 'center',
  borderRadius: theme.spacing(2),
  color: colors.wfBase[800],
  display: 'flex',
  fontSize: '18px',
  fontWeight: 700,
  gap: '10px',
  height: '56px',
  justifyContent: 'space-between',
  padding: `0 ${theme.spacing(2)}`,
  width: '100%',
}));

export const NewSheetButton = styled(ButtonBase)(({ theme }) => ({
  '&:hover': {
    backgroundColor: colors.wfBase[200],
  },
  color: colors.wfBase[800],
  fontSize: '14px',
  fontWeight: 700,
  justifyContent: 'flex-start',
  lineHeight: '24px',
  padding: `0 ${theme.spacing(1.5)}`,
}));

export const SheetWrapper = styled(Box)(({ theme }) => ({
  '& .sheet-actions': {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: `0 ${theme.spacing(6)}`,
  },
  '& .sheet-label': {
    padding: `${theme.spacing()} ${theme.spacing(6)} ${theme.spacing(2)}`,
  },
  flex: 1,
  paddingTop: theme.spacing(2),
}));

export const SheetAction = styled(ButtonBase)(({ theme }) => ({
  '&:hover': {
    backgroundColor: colors.wfBase[300],
  },
  borderRadius: '5px',
  color: colors.wfBase[600],
  fontSize: '14px',
  fontWeight: 700,
  gap: 10,
  height: theme.spacing(5),
  padding: `0 ${theme.spacing(1.5)}`,
}));

export const DrawerContent = styled(Box)(({ theme }) => ({
  '& .form-field': {
    '& p': {
      color: colors.wfBase[800],
      fontSize: 14,
      fontWeight: 600,
    },
  },
  '& .tab-panel': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: theme.spacing(4),
  width: 448,
}));

export const AddColumnButton = styled(ButtonBase)(({ theme }) => ({
  color: colors.wfBase[800],
  display: 'flex',
  fontSize: '14px',
  fontWeight: 700,
  justifyContent: 'space-between',
  lineHeight: '24px',
  marginTop: theme.spacing(),
  padding: `${theme.spacing()} ${theme.spacing(0.5)}`,
  width: '100%',
}));

export const Columns = styled(Box)(({ theme }) => ({
  '& .column': {
    alignItems: 'center',
    color: colors.wfBase[800],
    display: 'flex',
    fontSize: '16px',
    justifyContent: 'space-between',
    lineHeight: '24px',
    padding: `${theme.spacing()} 0`,
    paddingRight: theme.spacing(2.5),
  },
  borderBottom: `1px solid ${colors.wfBase[400]}`,
}));

export const TimeframeToggleButton = styled(ToggleButton)({
  '&.Mui-selected': {
    border: `1px solid ${colors.primary[400]}`,
    borderLeft: `1px solid ${colors.primary[400]} !important`,
  },
});

export const CustomButton = styled(Button)(() => ({
  backgroundColor: `${colors.primary[400]} !important`,
  textTransform: 'none',
}));
