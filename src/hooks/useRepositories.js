import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_SINGLEREPO } from '../graphql/queries';

export const useSingleRepository = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_SINGLEREPO, {variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };  

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
}

const useRepositories = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {variables, fetchPolicy: 'cache-and-network'});

    const handleFetchMore = () => {
      const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
  
      if (!canFetchMore) {
        return;
      }
  
      fetchMore({
        variables: {
          after: data.repositories.pageInfo.endCursor,
          ...variables,
        },
      });
    };  

    return {
      repositories: data?.repositories,
      fetchMore: handleFetchMore,
      loading,
      ...result,
    };
};

export default useRepositories;