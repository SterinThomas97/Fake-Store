import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function ExpandedOrders({ order, name, size, color }) {
    return (
        <View style={styles.valueContainer}>
            <View>
                <Text style={styles.valueColor}>Order ID: {order.id}</Text>
            </View>
            <View>
                <Text style={styles.valueColor}>Items: {order.item_numbers}</Text>
            </View>
            <View>
                <Text style={styles.valueColor}>Total: {order.total_price}</Text>
            </View>
           
                <Ionicons name={name} size={size} color={color} />
            
        </View>
    );
}

export default ExpandedOrders;

const styles = StyleSheet.create({
    valueColor: {
        color: "black",
        margin: 3,
        fontWeight: 'bold'
    },
    valueContainer: {
        marginHorizontal: 20,
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: "white",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
});
