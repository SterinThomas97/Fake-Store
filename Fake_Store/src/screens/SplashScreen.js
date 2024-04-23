import { useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

function SplashScreen() {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("CategoryScreen");
        }, 3000); 
      }, []);
    return(
        <View style={styles.container}>
            <Image
                source={require('../assets/splash-screen.png')}
                style={styles.image}
            />
        </View>
    )

} 

export default SplashScreen; 

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: width,
        height: height
      }
})