import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import Review from './Review';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UserReviews from './UserReviews';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin/" element={<SignIn />} exact />
        <Route path="/signup/" element={<SignUp />} exact />
        <Route path="/review/" element={<Review />} exact />
        <Route path="/userReviews/" element={<UserReviews />} exact />
        <Route path="/user/:userId" element={<SingleRepository />} exact/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;