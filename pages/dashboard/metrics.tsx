import styled from '@emotion/styled';
import { Box, Modal, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import DashboardWrapper from 'src/dashboard/wrapper';
import { getApiClient } from 'src/helpers/apiConfig';
import { useAuth } from 'src/hooks/useAuth';
import InfoModal from 'src/metric/infoModal';
import SnowflakeModal from 'src/metric/snowflakeModal';
import MetricOnboarding from 'src/onboarding/metric';

const OnboardingContainer = styled(Box)(() => ({
  margin: '0 auto',
  maxWidth: '960px',
}));

const fetchWarehouse = () => {
  return getApiClient().get('datawarehouse');
};

function Metrics() {
  const router = useRouter();
  const { onConfirm, confirm } = useAuth();
  const { data, isError } = useQuery('warehouse', fetchWarehouse, { retry: 0 });
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);
  const [openSnowflakeModal, setOpenSnowflakeModal] = useState<boolean>(false);

  useEffect(() => {
    if (isError) {
      setOpenSnowflakeModal(true);
    } else {
      setOpenSnowflakeModal(false);
    }
  }, [isError]);

  useEffect(() => {
    if (!confirm) {
      setOpenInfoModal(true);
    } else {
      setOpenInfoModal(false);
    }
  }, [confirm]);

  const goToConnectSnowflake = () => {
    router.push('/settings/datawarehouse');
  };

  const onCloseInfoModal = () => {
    onConfirm(true);
    setOpenInfoModal(false);
  };

  return (
    <DashboardWrapper>
      <OnboardingContainer>
        <Typography mb={4} variant="h1">
          Metrics
        </Typography>
        <SnowflakeModal
          closeModal={goToConnectSnowflake}
          isOpen={openSnowflakeModal}
        />
        <InfoModal closeModal={onCloseInfoModal} isOpen={openInfoModal} />
        <MetricOnboarding
          dimensionMetadata={data ? data.data?.data[0].manifest_json : null}
        />
      </OnboardingContainer>
    </DashboardWrapper>
  );
}

export default Metrics;
