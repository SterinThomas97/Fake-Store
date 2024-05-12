import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import TabNavigator from './src/navigators/TabNavigator';



export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* <MainStackNavigator/>   */}
        <TabNavigator/> 
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }

});
