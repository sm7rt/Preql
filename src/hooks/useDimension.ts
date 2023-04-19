import { useQuery } from 'react-query';
import { getApiClient } from 'src/helpers/apiConfig';

export const fetchDimension = async () => {
  return (await getApiClient().get(`datawarehouse/metrics/dimensions`)).data
    .data.dimensions;
};

const useDimension = () => {
  const getDimensionQuery = useQuery(
    ['datawarehouse'],
    () => fetchDimension(),
    { retry: 0 }
  );

  return getDimensionQuery;
};

export default useDimension;
