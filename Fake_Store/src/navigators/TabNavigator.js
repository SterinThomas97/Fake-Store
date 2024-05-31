// TabNavigator.js
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import MainStackNavigator from './MainStackNavigator';
import { useSelector } from 'react-redux';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import { Alert } from 'react-native';
import UserProfileStackNavigator from './UserProfileStackNavigator';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const authKey = useSelector(state => state.auth.authenticationKey);
  const numberOfItems = useSelector(state => state.cart.numberOfItems);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const numberOfOrders = useSelector(state => state.cart.numberOfOrders);
  const handleTabPress = (e, route) => {
    if (!isLoggedIn && route.name !== 'User Profile') {
      e.preventDefault();
      Alert.alert('Not Logged in', 'You must log in to view this tab.');
    }
  };
  return (
    <Tab.Navigator initialRouteName="User Profile" screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Products') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'My Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          
        } else if (route.name === 'My Orders') {
          iconName = focused ? 'gift' : 'gift-outline';
        } else if (route.name === 'User Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      }
      })}
      screenListeners={({ route }) => ({
        tabPress: e => handleTabPress(e, route),
      })}
      >
      <Tab.Screen name="Products" component={MainStackNavigator} options={{
          headerShown: false
        }} />
      <Tab.Screen name="My Cart" component={ShoppingCartScreen} options={{headerShown: false, tabBarBadge: numberOfItems > 0 && authKey ? numberOfItems : null}}/>
      <Tab.Screen name="My Orders" component={MyOrdersScreen} options={{headerShown : false, tabBarBadge: numberOfOrders > 0 && authKey ? numberOfOrders : null}}/>
      <Tab.Screen name="User Profile" component={UserProfileStackNavigator} options={{headerShown : false}}/>
    </Tab.Navigator> 
  );
};

export default TabNavigator;
