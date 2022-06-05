/* eslint-disable no-unused-vars */
import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { Formik, useField } from 'formik';
import FormikTextInput from './FormikTextInput';

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

const SignIn = () => {
  const onSubmit = values => {
    console.log(values.username + ': ' + values.password)
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;