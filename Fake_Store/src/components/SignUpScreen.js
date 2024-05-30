import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { signUpUser } from '../service/authService';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleClear = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleSignUp = async() => {
    console.log("Inside handleSignUp()", username, email, password)
    const data = await signUpUser(username, email, password );
    console.log("Inside handleSignUp() ", data);
    if (data.status === "OK") {
        console.log("user signed up successfully");
        navigation.navigate("UserProfile", {data});
    } else if (data.status === "error") {
        Alert.alert(data.message);
    }
  };

  const onSwitch = () => {
    navigation.navigate("SignInScreen");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign up a new user</Text>
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onSwitch} style={styles.switchContainer}>
        <Text style={styles.switchText}>Switch to: sign in with an existing user</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
   
    
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: '#343a40',
  },
  input: {
   
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  switchContainer: {
    marginTop: 20,
  },
  switchText: {
    color: '#007bff',
  },
});

export default SignUpScreen;
