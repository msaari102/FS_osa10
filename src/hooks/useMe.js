import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';

const useMe = (variables) => {
  const { data, loading, ...result } = useQuery(GET_ME, {variables, fetchPolicy: 'cache-and-network'});

    return {
      reviews: data?.me.reviews,
      loading,
      ...result,
    };
};

export default useMe;