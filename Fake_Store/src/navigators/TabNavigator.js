// TabNavigator.js
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import MainStackNavigator from './MainStackNavigator';
import { useSelector } from 'react-redux';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const numberOfItems = useSelector(state => state.cart.numberOfItems);
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
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
      >
      <Tab.Screen name="Products" component={MainStackNavigator} options={{
          headerShown: false
        }} />
      <Tab.Screen name="My Cart" component={ShoppingCartScreen} options={{headerShown: false, tabBarBadge: numberOfItems > 0 ? numberOfItems : null}}/>
      <Tab.Screen name="My Orders" component={MyOrdersScreen} options={{headerShown : false}}/>
      <Tab.Screen name="User Profile" component={UserProfileScreen} options={{headerShown : false}}/>
    </Tab.Navigator>
  );
};

export default TabNavigator;
