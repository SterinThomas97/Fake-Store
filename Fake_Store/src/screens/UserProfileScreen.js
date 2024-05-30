import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SignInScreen from '../components/SignInScreen';
import SignUpScreen from '../components/SignUpScreen';

const UserProfileScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  
  const toggleScreen = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <View style={styles.container}>
      {isSignUp ? <SignUpScreen onSwitch={toggleScreen} /> : <SignInScreen onSwitch={toggleScreen} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default UserProfileScreen;
