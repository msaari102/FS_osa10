import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import theme from '../theme';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

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
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const { data, error, loading } = useQuery(GET_ME, {fetchPolicy: 'cache-and-network'});
  const user = (!error && !loading)
    ?  data.me
    : null

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/"><Text style={styles.bartext}>Repository list</Text></Link>
        {user ?
        <>
          <Link to="/review"><Text style={styles.bartext}>Create a review</Text></Link> 
          <Pressable onPress={() => {
            authStorage.removeAccessToken();
            apolloClient.resetStore();
          }}>
            <Text style={styles.bartext}>Log out</Text>
          </Pressable> 
          </>
          : 
          <Link to="/signin"><Text style={styles.bartext}>Sign in</Text></Link>
          }
        
      </ScrollView>
    </View>
  )
};

export default AppBar;