import { useMutation } from '@apollo/client';
import { GET_TOKEN } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(GET_TOKEN
  );

  const signIn = async ({ username, password }) => {
    const {data} = await mutate({ variables: { username, password } })
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;