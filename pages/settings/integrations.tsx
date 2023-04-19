import { Box, Button, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import DashboardWrapper from 'src/dashboard/wrapper';
import { getApiClient } from 'src/helpers/apiConfig';
import SettingsHeader from 'src/settings/header';
import useActivateProvider, {
  IConnectionData,
} from 'src/settings/hooks/useActivateProvider';
import useGetActivatedIntegrations from 'src/settings/hooks/useGetActivatedIntegrations';
import useGetIntegrationProviders from 'src/settings/hooks/useGetIntegrationProviders';
import IntegrationModal, {
  IntegrationData,
} from 'src/settings/integration/integrationModal';

export const IntegrationButton = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  display: 'flex',
  height: theme.spacing(5.5),
  textTransform: 'none',
}));

export const ImageWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  // marginBottom: theme.spacing(6)
}));

const fetchAuthorizationUrl = async (provider_id) => {
  return getApiClient().get(
    `/integrations/provider/url?provider_id=${provider_id}`
  );
};

function extractAuthorizationState(connection_data: IConnectionData[]): string {
  const authorizationState = connection_data.find((element) => {
    return element.name === 'state';
  }).value;

  return authorizationState;
}

function Integrations() {
  const router = useRouter();
  const { code } = router.query;
  const [provider, setProvider] = useState(null);
  const [modalState, setModalState] = useState(false);
  const { data, refetch: integrationRefetch } = useGetIntegrationProviders();
  const { data: url, refetch: providerRefetch } = useQuery(
    ['providerurl', provider],
    () => fetchAuthorizationUrl(provider),
    { enabled: !!provider, retry: 0 }
  );
  const {
    data: activated,
    isLoading: isActivatedLoading,
    isSuccess: isActivatedSuccess,
  } = useGetActivatedIntegrations();
  const activateProviderMutator = useActivateProvider({
    onError: (err) => {
      console.error('err', err);
    },
    onSettled: () => {
      router.push('/settings/integrations').finally(() => {
        integrationRefetch();
        if (provider) {
          providerRefetch();
        }
      });
    },
    onSuccess: () => {
      console.log('success added integration');
    },
  });

  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };

  const getProviderUrl = (provider_id: string) => {
    console.log(provider_id);
    setProvider(provider_id);
  };

  useEffect(() => {
    if (typeof url?.data.data === 'undefined') return;
    console.log(url?.data.data);
    if (url?.data.data) {
      window.location = url?.data.data;
    }
  }, [url?.data.data]);

  useEffect(() => {
    if (typeof code === 'undefined') return;
    if (!router.isReady) return;
    const querydata = router.query;
    const connectionData = Object.keys(querydata).map((key) => ({
      name: key,
      value: querydata[key] as string,
    }));
    const data = {
      connection_data: connectionData,
      provider_id: extractAuthorizationState(connectionData),
    };
    // Prevent multiple mutations
    if (
      !activateProviderMutator.isLoading &&
      !activateProviderMutator.isError &&
      !activateProviderMutator.isSuccess
    ) {
      activateProviderMutator.mutate(data);
    }
  }, [activateProviderMutator, code, router.isReady, router.query]);

  return (
    <DashboardWrapper>
      <SettingsHeader />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography mb={2} variant="h1">
          Integrations
        </Typography>
        <IntegrationButton
          color="primary"
          onClick={openModal}
          sx={{ px: '20px' }}
          type="submit"
          variant="contained"
        >
          Add Integration
        </IntegrationButton>
      </Box>
      {isActivatedLoading ? (
        <ImageWrapper>
          <object
            data="/icons/loader-logo.svg"
            height={100}
            type="image/svg+xml"
            width={100}
          >
            svg-animation
          </object>
        </ImageWrapper>
      ) : null}
      {isActivatedSuccess ? <IntegrationData data={activated} /> : null}
      <IntegrationModal
        closeModal={closeModal}
        data={data}
        getProviderHandler={getProviderUrl}
        isOpen={modalState}
      />
    </DashboardWrapper>
  );
}

export default Integrations;
