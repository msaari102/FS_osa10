import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../graphql/queries';

const useReview = () => {
  const [mutate, result] = useMutation(ADD_REVIEW);

  const userReview = async ({ ownerName, repositoryName, rating, text }) => {
    const review = {
      ownerName: ownerName,
      repositoryName: repositoryName,
      rating: Number(rating),
      text: text,
    }
    await mutate({ variables: { review }})
  };

  return [userReview, result];
};

export default useReview;