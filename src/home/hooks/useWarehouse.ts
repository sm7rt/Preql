import { useQuery } from 'react-query';
import { getApiClient } from 'src/helpers/apiConfig';

import { IWarehouseResponse } from '../types/warehouseResponse.types';

export const fetchWarehouse = async (): Promise<IWarehouseResponse> => {
  return (await getApiClient().get(`datawarehouse`)).data;
};

const useWarehouse = () => {
  const getWarehouse = useQuery(['datawarehouse'], () => fetchWarehouse(), {
    retry: 0,
  });

  return getWarehouse;
};

export default useWarehouse;
