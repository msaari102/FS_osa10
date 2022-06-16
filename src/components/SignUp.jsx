import { Text,  Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, "minimum length 1")
    .max(30, "maximum length 30")
    .required('Username is required'),
  password: yup
    .string()
    .min(5, "minimum length 5")
    .max(50, "maximum length 50")
    .required('Password is required'),
    passwordConfirmation: yup
    .string()
    .min(5, "minimum length 5")
    .max(50, "maximum length 50")
    .oneOf([yup.ref('password'), ("password mismatch")])
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
  passwordConfirmation: '',
};

const SignUpForm = ({ onSubmit }) => {

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
       <FormikTextInput
        name="passwordConfirmation"
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

export const SignUpContainer = ({ initialValues, onSubmit, validationSchema }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
}

const SignUp = () => {
  const navigate = useNavigate();
  const [SignUp] = useSignUp();
  const [SignIn, resultIn] = useSignIn();

  useEffect(() => {
    if (resultIn.data) {
      navigate("../", { replace: true });
    }
  }, [resultIn.data])

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await SignUp({ username, password });
      await SignIn({ username, password });

    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}/>
};

export default SignUp;