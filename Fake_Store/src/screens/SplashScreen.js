import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

function SplashScreen() {
    const navigation = useNavigation();
    useEffect(() => {
            navigation.navigate("UserProfileScreen");
      }, []);
} 

export default SplashScreen; 



