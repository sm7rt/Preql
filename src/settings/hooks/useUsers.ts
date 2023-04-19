import { useQuery } from 'react-query';
import { getApiClient } from 'src/helpers/apiConfig';

const useUsers = () => {
  const getUsersQuery = useQuery('users', async () => {
    return getApiClient().get('/companies/users');
  });

  return {
    ...getUsersQuery,
  };
};

export default useUsers;
