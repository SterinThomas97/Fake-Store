import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';
import UserProfile from '../components/UserProfile';
import SignInScreen from '../components/SignInScreen';
import SignUpScreen from '../components/SignUpScreen';
import UpdateUserProfileScreen from '../screens/UpdateUserProfileScreen';

const Stack = createNativeStackNavigator();

const UserProfileStackNavigator = () => {
  const isAuthenticated = useSelector((state) => !!state.auth.authenticationKey);
  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <>
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdateUserProfileScreen"
            component={UpdateUserProfileScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdateUserProfileScreen"
            component={UpdateUserProfileScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default UserProfileStackNavigator;
