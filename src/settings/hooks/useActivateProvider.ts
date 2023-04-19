import { MutationMeta, useMutation } from 'react-query';
import { getApiClient } from 'src/helpers/apiConfig';

export type IConnectionData = {
  name: string;
  value: string;
};

export type IActivatProvider = {
  provider_id: string;
  connection_data: IConnectionData[];
};

const useActivateProvider = (options?: MutationMeta) => {
  return useMutation(
    'activateProvider',
    (body: IActivatProvider) => {
      return getApiClient().post('/integrations/provider/activate', body);
    },
    { ...options }
  );
};

export default useActivateProvider;
