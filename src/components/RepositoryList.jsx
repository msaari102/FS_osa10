import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});
/*
const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];
*/
const ItemSeparator = () => <View style={styles.separator} />;

const PickerList = ({ setOrder, order}) => {
  return (
  <Picker
  selectedValue={order}
  onValueChange={(itemValue) => {
    setOrder(itemValue)
  }
  }>
  <Picker.Item label="Latest repositories" value="0" />
  <Picker.Item label="Highest rated repositories" value="1" />
  <Picker.Item label="Lowest rated repositories" value="2" />
</Picker>
  )
}

export const RepositoryListContainer = ({ repositories, order, setOrder }) => {
  const navigate = useNavigate()
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <PickerList order={order} setOrder={setOrder}/>}

      renderItem={({ item }) => (
        <Pressable onPress={() => {
          navigate(`../user/${item.id}`, { replace: true });
        }}>    
        <RepositoryItem
          key={item.key}
          repository = {item}>
        </RepositoryItem>
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState("0")
  let orderBy = "CREATED_AT"
  let orderDirection = "DESC"
  switch(order) {
    case "0":
      orderBy = "CREATED_AT"
      orderDirection = "DESC" 
      break;
    case "1":
      orderBy = "RATING_AVERAGE"
      orderDirection = "DESC"
      break;
    case "2":
      orderBy = "RATING_AVERAGE"
      orderDirection = "ASC"
      break;
    default:
      orderBy = "CREATED_AT"
      orderDirection = "DESC"
  }
  const { repositories } = useRepositories({orderBy: orderBy, orderDirection: orderDirection});

  return <RepositoryListContainer repositories={repositories} order={order} setOrder={setOrder} />;
};

export default RepositoryList;