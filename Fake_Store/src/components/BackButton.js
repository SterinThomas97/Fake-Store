import { StyleSheet, View, Text, Pressable } from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function BackButton() {
    const navigation = useNavigation();
    
    function backButtonHandler() {
        navigation.goBack()
    }

    return(
        <Pressable  onPress={backButtonHandler} style={({pressed}) => [pressed && styles.pressed]}>
                    <View style={styles.iconButtonContainer}>
                        <Ionicons name="backspace" size={20} color="white" />
                        <Text style={styles.backButtonText}>Back</Text>
                    </View>
        </Pressable>
    )
}

export default BackButton;

const styles = StyleSheet.create({
    iconButtonContainer: {
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent: 'center'
    },
    backButtonText: {
        color: 'white',
        marginLeft: 5
    },
    pressed: {
        opacity: 0.5
    }
})