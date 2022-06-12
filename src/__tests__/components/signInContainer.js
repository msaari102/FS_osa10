//import { Text, View } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import * as yup from 'yup';

const SignInContainer = require('../../components/SignIn').SignInContainer

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('Sign in submits right data', async () => {
      const onSubmit = jest.fn();

      const { getByPlaceholderText, getByText } = render(<SignInContainer initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} />);
      fireEvent.changeText(getByPlaceholderText('username'), 'kalle');
      fireEvent.changeText(getByPlaceholderText('password'), 'password');
      fireEvent.press(getByText('Submit'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
      

      

    });
  });
});