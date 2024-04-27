import { StyleSheet, View, Text, Pressable } from "react-native";
import {Ionicons} from "@expo/vector-icons";

function AppButton({icon, onPress, color, size, title}) {
    return(
        <Pressable  onPress={onPress} style={({pressed}) => [pressed && styles.pressed]}>
                    <View style={styles.iconButtonContainer}>
                        <Ionicons name={icon} size={size} color={color} />
                        <Text style={styles.backButtonText}>{title}</Text>
                    </View>
        </Pressable>
    )
}

export default AppButton;

const styles = StyleSheet.create({
    iconButtonContainer: {
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent: 'center'
    },
    backButtonText: {
        color: 'white',
        marginLeft: 5,
        fontWeight: 'bold'
    },
    pressed: {
        opacity: 0.5
    }
})



