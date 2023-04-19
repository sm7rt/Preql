import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Select, { components } from 'react-select';

import { getApiClient } from '../../helpers/apiConfig';
import useGetIntegrationProviders from '../../settings/hooks/useGetIntegrationProviders';

export const OptionContent = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  padding: '1px 12px 1px 12px',
}));

export const ValueContent = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  height: '50px',
}));

const { Option, SingleValue } = components;
function IconOption(props) {
  const { data } = props;
  return (
    <Option {...props}>
      <OptionContent>
        <Box sx={{ marginRight: '10px', marginTop: '3px' }}>
          <Image alt={data.label} height={25} src={data.icon} width={25} />
        </Box>
        {data.label}
      </OptionContent>
    </Option>
  );
}

function ValueOption(props) {
  const { data } = props;
  return (
    <SingleValue {...props}>
      <ValueContent>
        <Box sx={{ marginRight: '10px', marginTop: '3px' }}>
          <Image alt={data.label} height={25} src={data.icon} width={25} />
        </Box>
        {data.label}
      </ValueContent>
    </SingleValue>
  );
}

const selectStyles = {
  container: (provided) => ({
    ...provided,
    fontSize: 14,
  }),
  control: (provided, state) => ({
    ...provided,
    '&:hover': {
      border: '1px solid #cccccc',
      boxShadow: 'none',
    },

    backgroundColor: 'white',

    // This line disable the blue border
    border: state.isFocused ? '1px solid #cccccc' : '1px solid #cccccc',
    borderRadius: '6px 6px 6px 6px',
    boxShadow: state.isFocused ? 'none' : 'none',
    height: '56px',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? '#765AFF'
            : '#ccc'
          : undefined,
      },
      backgroundColor: isDisabled
        ? undefined
        : isSelected
          ? '#765AFF'
          : isFocused
            ? '#F8F9FA'
            : undefined,
      color: isDisabled ? '#ccc' : isSelected ? 'white' : 'black',

      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  valueContainer: (provided) => ({
    ...provided,
    fontSize: 14,
  }),
};

const fetchActivatedIntegrationByProvider = async (provider_id) => {
  return getApiClient().get(
    `/integrations/provider/company/activated?provider_id=${provider_id}`
  );
};

export const IntegrationModalBox = styled(Box)(({ theme }) => ({
  background: '#fff',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: theme.spacing(2),
  left: '50%',
  padding: '20px 40px 20px 40px',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '650px',
}));

export const IntergrationModalTitle = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 600,
  lineHeight: theme.spacing(6),
}));

export const IntergrationModalText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  marginBottom: theme.spacing(3),
}));

export const ProviderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '510px',
  overflowY: 'scroll',
}));

export const CloseButton = styled(Box)(({ theme }) => ({
  '&:hover': {
    background: '#E4E7EB',
  },
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
  height: '40px',
  width: '40px',
}));

export const ConectIntegrationButton = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  display: 'flex',
  height: theme.spacing(5.5),
  textTransform: 'none',
}));

function ConnectIntegrationModal({ clickModalHandler, setModalState }) {
  const router = useRouter();
  const [activationSuccess, setActivationSuccess] = useState(false);
  const { data, isLoading, isSuccess } = useGetIntegrationProviders();
  const [providerOptions, setProviderOptions] = useState([]);
  const [integrationOptions, setIntegrationOptions] = useState([]);
  const [provider, setProvider] = useState(null);
  const [integration, setIntegration] = useState(null);
  const {
    data: activated,
    isLoading: isIntegrationLoading,
    isSuccess: isIntegrationSuccess,
  } = useQuery(
    ['providerurl', provider],
    () => fetchActivatedIntegrationByProvider(provider),
    { enabled: !!provider, retry: 0 }
  );

  const connectIntegrationMutation = useMutation((connectionData: any) => {
    return getApiClient().post(
      '/integrations/provider/connect',
      connectionData
    );
  });

  const formatProviderData = (providers: any) => {
    const result = providers.map((provider: any) => ({
      icon: provider.icon,
      label: provider.name,
      value: provider.id,
    }));
    return result;
  };

  const formatActiviatedProviderData = (activatedIntegrations: any) => {
    const result = activatedIntegrations.map((integration: any) => ({
      icon: integration.provider.icon,
      label: integration.integration_name,
      provider: integration.provider.id,
      value: integration.id,
    }));
    return result;
  };

  const getIntegrationData = (value) => {
    console.log(value);
    setProvider(value.value);
  };

  const connectIntegrationData = (value) => {
    console.log(value);
    setIntegration(value.value);
  };

  const connectIntegration = () => {
    const data = {
      integration_id: integration,
      provider_id: provider,
      report_id: router.query.id,
    };
    connectIntegrationMutation.mutate(data);
  };

  useEffect(() => {
    if (typeof data === 'undefined') return;
    console.log(data);
    setProviderOptions(formatProviderData(data?.data.data));
  }, [data]);

  useEffect(() => {
    if (typeof activated === 'undefined') return;
    console.log(activated);
    setIntegrationOptions(formatActiviatedProviderData(activated?.data.data));
  }, [activated]);

  useEffect(() => {
    if (typeof connectIntegrationMutation.data === 'undefined') return;
    setModalState(false);
    console.log('mutation connection success', connectIntegrationMutation.data);
  }, [connectIntegrationMutation.data, setModalState]);

  return (
    <IntegrationModalBox sx={{ height: '350px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IntergrationModalTitle>
          Add a new integration to your report
        </IntergrationModalTitle>
        <CloseButton onClick={clickModalHandler}>
          <Image
            alt="Close"
            height={40}
            src="/icons/close-times.svg"
            width={40}
          />
        </CloseButton>
      </Box>
      <IntergrationModalText>
        To begin the procedure, simply click on the app you wish to connect to.
      </IntergrationModalText>
      <ProviderContainer>
        {data ? (
          <Select
            components={{ Option: IconOption, SingleValue: ValueOption }}
            onChange={getIntegrationData}
            options={providerOptions}
            styles={selectStyles}
          />
        ) : null}
        {activated ? (
          <Box sx={{ marginTop: '20px' }}>
            <Select
              components={{ Option: IconOption, SingleValue: ValueOption }}
              noOptionsMessage={() =>
                'No integration found go to settings to connect account'
              }
              onChange={connectIntegrationData}
              options={integrationOptions}
              styles={selectStyles}
            />
          </Box>
        ) : null}
        {integration ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '20px',
            }}
          >
            <ConectIntegrationButton
              color="primary"
              onClick={connectIntegration}
              sx={{ px: '20px' }}
              type="submit"
              variant="contained"
            >
              Connect
            </ConectIntegrationButton>
          </Box>
        ) : null}
      </ProviderContainer>
    </IntegrationModalBox>
  );
}

export default ConnectIntegrationModal;
