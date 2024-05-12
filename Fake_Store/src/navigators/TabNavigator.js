// TabNavigator.js
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import MainStackNavigator from './MainStackNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
  
          if (route.name === 'Products') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'My Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          }
  
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      >
      <Tab.Screen name="Products" component={MainStackNavigator} />
      <Tab.Screen name="My Cart" component={ShoppingCartScreen} />
      
    </Tab.Navigator>
  );
};

export default TabNavigator;
