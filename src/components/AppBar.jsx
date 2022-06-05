import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appbar,
    
    flexShrink: 1,
  },
  bartext: {
    color: theme.colors.bartext,
    padding: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/"><Text style={styles.bartext}>Repository list</Text></Link>
        <Link to="/signin"><Text style={styles.bartext}>Sign in</Text></Link>
      </ScrollView>
    </View>
  )
};

export default AppBar;