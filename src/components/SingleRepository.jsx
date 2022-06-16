import RepositoryItem from './RepositoryItem';
import { useSingleRepository } from '../hooks/useRepositories';
import { useParams } from 'react-router-native';
import { Text, FlatList, View, StyleSheet } from 'react-native';
import { format, parseISO } from 'date-fns'
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'grey',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  ratingText: {
    color: theme.colors.primary,
    fontSize: 20,
  },
  ratingContainer: {
    width: 80,
    height: 80,
    borderRadius: 40, 
    borderWidth: 4,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const RepositoryInfo = ({ repository }) => {
  return ( 
    <RepositoryItem
      key={repository.key}
      repository = {repository}
      link = {true}>
    </RepositoryItem>
  )
};

const ReviewItem = ({ review }) => {
  const date = format(parseISO(review.createdAt), 'dd.MM.yyyy')
  return (
    <View style={styles.flexContainer}>
      <View style={styles.ratingContainer}><Text style={styles.ratingText}>{review.rating}</Text></View>
      <View><Text style={{fontWeight: 'bold', padding: 10}}>{review.user.username}</Text>
      <Text style={{padding: 10}}>{date}</Text>
      <Text style={{width: 400, padding: 10}}>{review.text}</Text></View>
    </View>
  )
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  let { userId } = useParams();
  const { repository } = useSingleRepository({id: userId});

  if (!repository) return <Text>Waiting</Text>;

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];
  
  return ( 
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
};

export default SingleRepository;