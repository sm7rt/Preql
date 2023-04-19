import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReportContent from 'src/report/content';
import { colors } from 'src/theme';

const Navbar = styled(Box)(({ theme }) => ({
  '& .link-back': {
    alignItems: 'center',
    color: colors.wfBase[800],
    display: 'flex',
    fontSize: 16,
    fontWeight: 700,
    gap: theme.spacing(),
    lineHeight: '24px',
    textDecoration: 'none',
  },
  alignItems: 'center',
  borderBottom: `1px solid ${colors.wfBase[400]}`,
  display: 'flex',
  flexShrink: 0,
  height: theme.spacing(10),
  justifyContent: 'space-between',
  padding: `0 ${theme.spacing(4.5)}`,
}));

const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
}));

export const ConnectIntegration = styled(Button)(({ theme }) => ({
  backgroundColor: `${colors.primary[400]} !important`,
  boxShadow: 'none',
  display: 'flex',
  height: theme.spacing(5.5),
  textTransform: 'none',
}));

function Report() {
  const router = useRouter();
  const [modalState, setModalState] = useState(false);

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = (value: boolean) => {
    console.log(value);
    if (value) {
      setModalState(value);
    }
    setModalState(false);
  };

  return (
    <Container>
      <Navbar>
        <Link href="/dashboard/reports">
          <a className="link-back">
            <NavigateBeforeIcon /> <span>Reports</span>
          </a>
        </Link>
        <ConnectIntegration
          color="primary"
          onClick={openModal}
          sx={{ px: '20px' }}
          type="submit"
          variant="contained"
        >
          Connect Integration
        </ConnectIntegration>
      </Navbar>
      <ReportContent
        clickModalHandler={closeModal}
        modalState={modalState}
        reportId={router.query.id}
        setModalState={closeModal}
      />
    </Container>
  );
}

export default Report;
