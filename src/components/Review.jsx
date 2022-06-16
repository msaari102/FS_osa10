import { Text,  Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useReview from '../hooks/useReview';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Username is required'),
  repositoryName: yup
    .string()
    .required('Password is required'),
  rating: yup
    .number()
    .min(0, 'Review must be between 0 and 100')
    .max(100, 'Review must be between 0 and 100')
    .required('Password is required'),
  text: yup
    .string(),
});

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: 0,
  text: '',
};

const ReviewForm = ({ onSubmit }) => {

  return (
    <View style={{padding: 20}}>
      <FormikTextInput
        name="ownerName"
        placeholder="Repository owner's username"
        style={styles.container}
      />
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository name"
        style={styles.container}
      />
      <FormikTextInput
        name="rating"
        placeholder="Rating"
        style={styles.container}
      />
      <FormikTextInput
        name="text"
        placeholder="Review"
        style={styles.container}
        multiline
        numberOfLines='5'
      />
      <Pressable onPress={onSubmit} style={{padding: 10}}>
        <Text style={styles.button}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export const ReviewContainer = ({ initialValues, onSubmit, validationSchema }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
}

const Review = () => {
  const navigate = useNavigate();
  const [userReview, result] = useReview();

  useEffect(() => {
    if (result.data) {
      navigate(`../user/${result.data.createReview.repository.id}`, { replace: true });
    }
  }, [result.data])

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      await userReview({ ownerName, repositoryName, rating, text });

    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewContainer initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}/>
};

export default Review;