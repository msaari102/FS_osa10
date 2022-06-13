import RepositoryItem from './RepositoryItem';
import { useSingleRepository } from '../hooks/useRepositories';
import { useParams } from 'react-router-native';
import { Text } from 'react-native';

const SingleRepository = () => {
  let { userId } = useParams();
  const { repository } = useSingleRepository({id: userId});

  if (!repository) return <Text>Waiting</Text>;
  
  return ( 
    <RepositoryItem
      key={repository.key}
      repository = {repository}
      link = {true}>
    </RepositoryItem>
  )
};

export default SingleRepository;