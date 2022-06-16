import { useMutation } from '@apollo/client';
import { ADD_USER } from '../graphql/queries';

const useSignUp = () => {
  const [mutate, result] = useMutation(ADD_USER
  );

  const signUp = async ({ username, password }) => {
    const user = {
      username: username,
      password: password
    }
    await mutate({ variables: {user} })
  };

  return [signUp, result];
};

export default useSignUp;