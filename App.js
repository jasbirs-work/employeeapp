/* import 'react-native-gesture-handler'; */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import CreateEmployee from './screens/CreateEmployee';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from './screens/Home';
import Profile from './screens/Profile';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const myOptions = {
  title: 'My Home',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: '#006aff',
  },
};

const App = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={myOptions} />
        <Stack.Screen
          name="Create"
          component={CreateEmployee}
          options={{...myOptions, title: 'Create Employee'}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{...myOptions, title: 'Profile'}}
        />
      </Stack.Navigator>
    </View>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    height: '100%',
  },
});
