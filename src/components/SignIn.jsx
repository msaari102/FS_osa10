import { Text,  Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
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
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {

  return (
    <View style={{padding: 20}}>
      <FormikTextInput
        name="username"
        placeholder="username"
        style={styles.container}
      />
      <FormikTextInput
        name="password"
        placeholder="password"
        secureTextEntry
        style={styles.container}
      />
      <Pressable onPress={onSubmit}>
        <Text style={styles.button}>Submit</Text>
      </Pressable>
    </View>
  );
};

export const SignInContainer = ({ initialValues, onSubmit, validationSchema }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
}

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn, result] = useSignIn();

  useEffect(() => {
    if (result.data) {
      navigate("../", { replace: true });
    }
  }, [result.data])

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });

    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}/>
};

export default SignIn;