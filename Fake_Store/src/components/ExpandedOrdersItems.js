import { View, Text, StyleSheet, Image } from "react-native";
function ExpandedOrdersItems({item}) {

    return (
        <View style={styles.productContainer}>
        <View style={styles.productImageContainer}>
            <Image source={{uri: item.image}} style={styles.image}/>
        </View>
        <View style={styles.productDetails}>
            <View style={styles.productTitle}>
                <Text>{item.title}</Text>
            </View>
            <View>
                <Text>Price: ${item.price}</Text>
            </View>
            <View style={styles.iconRow}>
                <View>
                    <Text>Quantity: {item.quantity}</Text>
                </View>
            </View>
        </View> 
</View>
    )
}

export default ExpandedOrdersItems;
const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 20,
        backgroundColor: 'white'
    },
    productImageContainer: {
        marginRight: 10
    },
    productDetails: {
        flex: 1
    },
    productTitle: {
        marginBottom: 5
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image:{
       
        width: 80,
        height: 60,
        borderWidth:1,
        borderColor: "black"
    },
})