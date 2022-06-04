import { View, StyleSheet, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appbar,
    height: 60,
  },
  bartext: {
    color: theme.colors.bartext,
  }
  // ...
});

const AppBar = () => {
  return <View style={styles.container}>{
    <Pressable onPress={() => {
     console.log("pressed");
    }}>
      <Text style={styles.bartext}>Repositories</Text>
    </Pressable>
    }</View>;
};

export default AppBar;