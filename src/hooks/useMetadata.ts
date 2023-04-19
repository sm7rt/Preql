import { useQuery } from 'react-query';
import { getApiClient } from 'src/helpers/apiConfig';
import { Manifest } from 'src/types/manifest.types';

export const fetchMetadata = async (): Promise<Manifest> => {
  return (await getApiClient().get('datawarehouse')).data.data[0].manifest_json;
};

const useMetadata = () =>
  useQuery(['warehouse'], () => fetchMetadata(), {
    retry: 0,
  });

export default useMetadata;
