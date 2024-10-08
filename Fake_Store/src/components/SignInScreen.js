import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signinUser } from '../service/authService';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../auth/authSlice';
import { useNavigation } from "@react-navigation/native";
import { getCartItems } from '../service/cartService';
import { setNumberOfOrders, setShoppingCartItems, setTotalPriceAndNumOfItems } from '../cart/cartSlice';
import { getMyOrders } from '../service/orderService';

const SignInScreen = () => {
  const isAuthenticated = useSelector((state) => !!state.auth.authenticationKey);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  let data = useSelector(state => state.auth.userData);
  
  const handleClear = () => {
    setEmail('');
    setPassword('');
  };
  
  const setStateValues = (cartItems) => {
    dispatch(setShoppingCartItems(cartItems));
    dispatch(setTotalPriceAndNumOfItems(cartItems));
}

const setOrderStateValues = (orders) => {
    dispatch(setNumberOfOrders(orders));
}
  const getCartData = async(token) => {
    const result = await getCartItems(token);
    if (result && result.length > 0) {
        setStateValues(result);
    }
}
    const getMyOrdersData = async(token) => {
        const result = await getMyOrders(token);
        console.log("result", result);
        if (result && result.length > 0) {
            setOrderStateValues(result);
        }
    }
    useEffect(() => {
    if (isAuthenticated) {
        navigation.navigate("UserProfile", {data});
    }
  }, [isAuthenticated, navigation]);
  
  const handleSignIn = async() => {
    data = await signinUser({email, password});
    if (data.status === "OK") {
        await getCartData(data.token);
        await getMyOrdersData(data.token);
        userData = data;
        dispatch(login(data.token));
        navigation.navigate("UserProfile", {data});
    } else if (data.status === "error") {
        Alert.alert(data.message);
    }
  };

  const onSwitch = () => {
    navigation.navigate("SignUpScreen");
  }
  return (
   
    <View style={styles.container}>
      <Text style={styles.header}>Sign in with email and password</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onSwitch} style={styles.switchContainer}>
        <Text style={styles.switchText}>Switch to: sign up a new user</Text>
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

export default SignInScreen;
