import { useQuery } from 'react-query';
import { getApiClient } from 'src/helpers/apiConfig';

const useGetInvites = () => {
  const getInvitesQuery = useQuery('invites', async () => {
    return getApiClient().get('/companies/invites');
  });

  return {
    ...getInvitesQuery,
  };
};

export default useGetInvites;
