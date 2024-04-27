import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import colors from './src/constants/Colors';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
            contentStyle: { backgroundColor: colors.appBackgroundColour },
          }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
          headerShown: false
        }}/>
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={{
          headerShown: false
        }}/>
        <Stack.Screen name="ProductListScreen" component={ProductListScreen} options={{
          headerShown: false
        }}/>
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={{
          headerShown: false
        }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
