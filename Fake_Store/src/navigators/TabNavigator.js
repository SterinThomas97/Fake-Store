// TabNavigator.js
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import MainStackNavigator from './MainStackNavigator';
import { useSelector } from 'react-redux';

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
          
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      }
      })}
      >
      <Tab.Screen name="Products" component={MainStackNavigator} options={{
          headerShown: false
        }} />
      <Tab.Screen name="My Cart" component={ShoppingCartScreen} options={{headerShown: false, tabBarBadge: numberOfItems > 0 ? numberOfItems : null}}/>
      
    </Tab.Navigator>
  );
};

export default TabNavigator;
