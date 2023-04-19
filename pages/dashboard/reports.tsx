import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import DashboardWrapper from 'src/dashboard/wrapper';
import { getApiClient } from 'src/helpers/apiConfig';
import { CustomButton } from 'src/report/content.styles';
import ReportCard from 'src/reports/reportCard';

const Container = styled(Box)(() => ({
  margin: '0 auto',
  maxWidth: '960px',
}));

const fetchReports = () => {
  return getApiClient().get('reports');
};

function Reports() {
  const router = useRouter();
  const { data } = useQuery('reports', fetchReports, { retry: 0 });

  const handleNewReport = () => {
    router.push('report/new-report');
  };

  return (
    <DashboardWrapper>
      <Container>
        <Box
          alignItems="flex-start"
          display="flex"
          justifyContent="space-between"
          mb={2}
        >
          <Box display="flex" mb={2} sx={{ flexDirection: 'column' }}>
            <Typography mb={2} variant="h1">
              Reports
            </Typography>
            <Box
              alignItems="center"
              color="#9e9e9e"
              display="flex"
              fontSize={15}
            >
              <Image height={32} src="/icons/a-z.svg" width={25} />
              Last Edited
            </Box>
          </Box>
          <CustomButton onClick={handleNewReport} variant="contained">
            Create new report
          </CustomButton>
        </Box>
        {data ? (
          data.data.data.map((opt) => (
            <ReportCard
              description={opt.description}
              display_name={opt.display_name}
              id={opt.id}
              key={opt.id}
              numberOfEmails={0}
              numberOfSchedule={0}
              numberOfSheet={opt.sheets.length}
            />
          ))
        ) : (
          <Box
            mt={20}
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
            <Box
              height={40}
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography color="#666" variant="subtitle2">
                Reports created from your metrics will live here
              </Typography>
            </Box>
          </Box>
        )}
      </Container>
    </DashboardWrapper>
  );
}

export default Reports;
