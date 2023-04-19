import { useMutation, useQuery } from 'react-query';
import { getApiClient } from 'src/helpers/apiConfig';

type InviteUserBody = {
  first_name: string;
  last_name: string;
  email: string;
};

const useCreateUser = () => {
  return useMutation((body: InviteUserBody) => {
    return getApiClient().post('/users/invite', body);
  });
};

export default useCreateUser;
