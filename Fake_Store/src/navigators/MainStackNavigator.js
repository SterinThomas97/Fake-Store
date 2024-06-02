import { createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CategoryScreen from '../screens/CategoryScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CategoryScreen"> 
      
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={{
          headerShown: false
        }}/>
        <Stack.Screen name="ProductListScreen" component={ProductListScreen} options={{
          headerShown: false
        }}/>
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={{
          headerShown: false
        }}/>
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{
          headerShown: false
        }}/>
         
    </Stack.Navigator>
  ); 
};

export default MainStackNavigator;
