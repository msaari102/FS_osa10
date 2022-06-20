import useMe from '../hooks/useMe';
import { deleteReview } from '../hooks/useReview'
import { Text, FlatList, View, StyleSheet, Button, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
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
    padding: 10,
    backgroundColor: 'white',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'column',
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

const ReviewItem = ({ review, navigate, removeReview, refetch }) => {
  const date = format(parseISO(review.createdAt), 'dd.MM.yyyy')

  const deleteAlert = () =>
  Alert.alert(
    "Delete review",
    "Are you sure you want to delete this review?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      { text: "DELETE", 
        onPress: async () => {
          await removeReview({deleteReviewId: review.id});
          refetch();
        } 
      }
    ]
  );
  return (
    <View style={styles.flexRow}>
      <View style={styles.flexContainer}>
        <View style={styles.ratingContainer}><Text style={styles.ratingText}>{review.rating}</Text></View>
        <View><Text style={{fontWeight: 'bold', padding: 10}}>{review.repository.fullName}</Text>
        <Text style={{padding: 10}}>{date}</Text>
        <Text style={{width: 400, padding: 10}}>{review.text}</Text></View>
      </View>
      <View style={styles.flexContainer}>
        <Button title="View repository" onPress={() => {
              navigate(`../user/${review.repository.id}`, { replace: true });
            }}>
        </Button>
        <Button padding="20" color='red' title="Delete review" onPress={() => {
              deleteAlert();
            }}>
        </Button>
      </View>
    </View>
  )
};

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const navigate = useNavigate()
  const [ removeReview ] = deleteReview()
  const { reviews, refetch } = useMe({includeReviews: true});

  if (!reviews) return <Text>Waiting</Text>;

  const reviewList = reviews
    ? reviews.edges.map((edge) => edge.node)
    : [];
  
  return ( 
    <FlatList
      data={reviewList}
      renderItem={({ item }) => <ReviewItem review={item} navigate={navigate} removeReview={removeReview} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
};

export default UserReviews;