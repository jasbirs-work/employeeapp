import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';
import {Card, FAB} from 'react-native-paper';

const Home = ({navigation}) => {
  const data = [
    {
      id: 1,
      name: 'mukesh',
      email: 'abs@abc.com',
      salary: '170K',
      phone: '1234567890',
      picture:
        'https://cdn.clipart.email/d85569dfeefc5deb0e3d2105cd00a99d_hadie-profile-pic-circle-skylight-recruitment_602-600.png',
      position: 'Web Development',
    },
    {
      id: 2,
      name: 'arindam',
      email: 'aec@abc.com',
      salary: '180K',
      phone: '1234556790',
      picture:
        'https://cdn.clipart.email/d85569dfeefc5deb0e3d2105cd00a99d_hadie-profile-pic-circle-skylight-recruitment_602-600.png',
      position: 'iOS developer',
    },
    {
      id: 3,
      name: 'abhisek',
      email: 'ayc@abc.com',
      salary: '190K',
      phone: '1234567590',
      picture:
        'https://cdn.clipart.email/d85569dfeefc5deb0e3d2105cd00a99d_hadie-profile-pic-circle-skylight-recruitment_602-600.png',
      position: 'Architect',
    },
    {
      id: 4,
      name: 'Jasbir',
      email: 'ahc@abc.com',
      salary: '200K',
      phone: '1234567890',
      picture:
        'https://cdn.clipart.email/d85569dfeefc5deb0e3d2105cd00a99d_hadie-profile-pic-circle-skylight-recruitment_602-600.png',
      position: 'Software Developer',
    },
  ];
  const renderList = item => {
    return (
      <Card
        style={style.myCard}
        onPress={() => navigation.navigate('Profile', {item})}>
        <View style={style.cardView}>
          <Image
            source={require('../assets/employee.jpg')}
            style={{height: 60, width: 60, borderRadius: 30}}
            resizeMode={'cover'}
          />
          <View style={{marginLeft: 10}}>
            <Text style={style.text}>{item.name}</Text>
            <Text style={style.text}>{item.position}</Text>
          </View>
        </View>
      </Card>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return renderList(item);
        }}
        keyExtractor={item => {
          `${item.id}`;
        }}
      />
      <FAB
        onPress={() => {
          navigation.navigate('Create');
        }}
        style={style.fab}
        small={false}
        theme={{colors: {accent: '#006aff'}}}
        icon="plus"
      />
    </View>
  );
};

const style = StyleSheet.create({
  myCard: {
    margin: 5,
  },
  cardView: {
    flexDirection: 'row',
    padding: 6,
  },
  text: {
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;
