import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import TabNavigator from './src/navigators/TabNavigator';
import { Provider } from 'react-redux';
import store from './src/cart/store';



export default function App() {
  return (
    <Provider store={store}>
        <NavigationContainer>
        <View style={styles.container}>
          <TabNavigator/> 
        </View>
      </NavigationContainer>
    </Provider>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }

});
