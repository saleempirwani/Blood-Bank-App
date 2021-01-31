import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {restoreToken, singOut, getDonorData} from '../actions/actions';

import {Button, Text} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DonorDetailsScreen from '../screens/DonorDetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import Splash from '../screens/SplashScreen';
import DonorScreen from '../screens/DonorScreen';

const Stack = createStackNavigator();

function Navigation() {
  const state = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken, home;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        home = await AsyncStorage.getItem('home');
      } catch (e) {
        console.log('Error: ', e.message);
      }
      dispatch(restoreToken(userToken, home));
    };

    bootstrapAsync();

    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <Splash />
      ) : state.userToken == null ? (
        <AuthStack />
      ) : state.home === null ? (
        <HomeStack /> // Acceptor
      ) : (
        <DonorStack />
      )}
    </NavigationContainer>
  );
}

// Authentication Screens
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

// DonorScreens

const DonorStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Donor"
        component={DonorScreen}
        options={{title: 'Home', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

// Acceptor Screens
const HomeStack = () => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: null,
          headerRight: () => (
            <Button
              primary
              onPress={() => {
                dispatch(singOut());
                dispatch(getDonorData([]));
              }}>
              <Text>Logout</Text>
            </Button>
          ),
        }}
      />

      <Stack.Screen name="Donor Details" component={DonorDetailsScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
