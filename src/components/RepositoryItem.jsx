import { View, Text, Image, StyleSheet, Button } from 'react-native';
import theme from '../theme';
import * as Linking from 'expo-linking';

const numerizer = (number) => {
  if (Number(number)>=1000) {
    return (String(Math.round(Number(number)/100)/10) + 'k')
  }
  return number;
}

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    padding: 10,
    backgroundColor: 'white',
    width: 500
  },
  flexRow: {
    flexDirection: 'row',
    //flexShrink: 1,
    justifyContent: 'flex-start',
  },
  flexItemA: {
    flexShrink: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  container: {
    backgroundColor: theme.colors.primary,
    height: 20,
  },
  languageText: {
    color: 'white',
    fontFamily: theme.fonts.main,
    flexShrink: 1,
    backgroundColor: theme.colors.primary
  },
  primaryText: {
    fontWeight: "bold", 
    fontFamily: theme.fonts.main,
    color: theme.colors.textPrimary,
  }
});

const RepositoryItem = (props) => {
  const repo = props.repository;

  const openUrl = async () => {
    const supported = await Linking.canOpenURL(repo.url);
    if (supported) {
      await Linking.openURL(repo.url);
    } else {
      console.log("Don't know how to open this URL")  
    }
  }

  return (
    <View style={styles.flexContainer} testID="repositoryItem">
      <View style={styles.flexRow}>
        <Image
          style = {{ width: 100, height: 100 }}
          source={{
          uri: repo.ownerAvatarUrl}}
        />
          <View style={styles.flexContainer}>
            <Text style={styles.primaryText}>{repo.fullName}</Text>
            <Text >{repo.description}</Text>
            <Text style={styles.languageText}>{repo.language}</Text>
          </View>
      </View>
      

      <View style={[styles.flexRow, /*{justifyContent: 'space-evenly'}*/]}>

      <View style={styles.flexItemA}>
        <Text>Stars</Text>
        <Text styles={{fontWeight:'bald'}}>{numerizer(repo.stargazersCount)}</Text>
      </View>

      <View style={styles.flexItemA}>
        <Text>Forks</Text>
        <Text styles={{fontWeight:'bald'}}>{numerizer(repo.forksCount)}</Text>
      </View>

      <View style={styles.flexItemA}>
        <Text>Reviews</Text>
        <Text styles={{fontWeight:'bald'}}>{numerizer(repo.reviewCount)}</Text>
      </View>

      <View style={styles.flexItemA}>
        <Text>Rating</Text>
        <Text styles={{fontWeight:'bald'}}>{numerizer(repo.ratingAverage)}</Text>
      </View>
        
      </View>
      <View style={styles.flexRow}>
        {props.link&&<Button style={styles.flexItemA} onPress={ () => openUrl()} title={'Open in GitHub'}></Button>}
      </View>
    </View>
  );
};

export default RepositoryItem;