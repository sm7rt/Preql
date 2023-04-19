import { useQuery } from 'react-query';
import { getApiClient } from 'src/helpers/apiConfig';

const useGetProviderAuthorizationUrl = (provider_id: string) => {
  const getProviderAuthorizationUrlQuery = useQuery('providerUrl', async () => {
    return getApiClient().get(
      `/integrations/provider/url?provider_id=${provider_id}`
    );
  });

  return {
    ...getProviderAuthorizationUrlQuery,
  };
};

export default useGetProviderAuthorizationUrl;
