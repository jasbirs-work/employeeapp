import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, Linking, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Title, Card, Button} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Profile = props => {
  const {
    id,
    name,
    email,
    phone,
    position,
    salary,
    picture,
  } = props.route.params.item;

  const openDial = () => {
    if (Platform.OS === 'android') {
      Linking.openURL('tel:12345');
    } else {
      Linking.openURL('telprompt:12345');
    }
  };

  return (
    <View style={style.profileContainer}>
      <LinearGradient colors={['#0033ff', '#6bc1ff']} style={{height: 100}} />
      <View style={{alignItems: 'center'}}>
        <Image
          style={{width: 140, height: 140, borderRadius: 70, marginTop: -50}}
          //source={require(picture)}
          source={{uri: picture}}
        />
      </View>
      <View style={{alignItems: 'center', margin: 15}}>
        <Title>{name}</Title>
        <Text style={{fontSize: 18}}>{position}</Text>
      </View>
      <Card
        style={style.myCard}
        onPress={() => {
          Linking.openURL(email);
        }}>
        <View style={style.mycardContainer}>
          <AntDesign name="mail" size={30} color="#006aff" />
          <Text style={style.myText}>{email}</Text>
        </View>
      </Card>
      <Card
        style={style.myCard}
        onPress={() => {
          openDial();
        }}>
        <View style={style.mycardContainer}>
          <FontAwesome name="phone" size={30} color="#006aff" />
          <Text style={style.myText}>{phone}</Text>
        </View>
      </Card>
      <Card style={style.myCard}>
        <View style={style.mycardContainer}>
          <FontAwesome name="dollar" size={30} color="#006aff" />
          <Text style={style.myText}>{salary}</Text>
        </View>
      </Card>
      <View style={style.profileButtonview}>
        <Button
          icon="account-edit"
          mode="contained"
          theme={theme}
          onPress={() => console.log('pressed')}>
          Edit
        </Button>
        <Button
          icon="delete"
          mode="contained"
          theme={theme}
          onPress={() => console.log('pressed')}>
          Delete Employee
        </Button>
      </View>
    </View>
  );
};
const theme = {
  colors: {
    primary: '#006aff',
  },
};
const style = StyleSheet.create({
  profileContainer: {},
  myCard: {
    margin: 3,
  },
  mycardContainer: {
    flexDirection: 'row',
    padding: 8,
  },
  myText: {
    fontSize: 18,
    marginTop: 3,
    marginLeft: 5,
  },
  profileButtonview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Profile;
