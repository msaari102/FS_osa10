import { useMutation } from '@apollo/client';
import { ADD_REVIEW, DELETE_REVIEW } from '../graphql/queries';

export const deleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const removeReview = async ({ deleteReviewId }) => {
    await mutate( {variables: { deleteReviewId }})
  };

  return [removeReview, result]
}

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