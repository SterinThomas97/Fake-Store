import { View, Text, StyleSheet } from "react-native";
import {Ionicons} from "@expo/vector-icons";

function Orders({title, num, icon, size, color}) {
    return(
        <View style={styles.headingContainer}>
            <Text style={styles.heading} >{title} : {num}</Text>
            <Ionicons name={icon} size={size} color={color} />
        </View>
    )
}

export default Orders;

const styles = StyleSheet.create({
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#9abdf5',
        justifyContent:'center',
        borderRadius: 10,
        padding: 15
      }, 
      heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        
        marginRight: 220
      },
})