import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_SINGLEREPO } from '../graphql/queries';

export const useSingleRepository = ({id}) => {
  const { data, error, loading, refetch } = useQuery(GET_SINGLEREPO, {variables: {id},
    fetchPolicy: 'cache-and-network',
  });
  const repository = (!error && !loading)
    ?  data.repository
    : undefined;
  return { repository, loading, refetch };
}

const useRepositories = ({orderBy, orderDirection, searchKeyword}) => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {variables: {orderBy, orderDirection, searchKeyword}, fetchPolicy: 'cache-and-network'});
  const repositories = (!error && !loading)
    ?  data.repositories
    : undefined;

  return { repositories, loading, refetch };
};

export default useRepositories;