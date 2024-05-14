import { View, Text, FlatList, SafeAreaView, StyleSheet, Image } from "react-native";
import { useSelector } from 'react-redux';
import AppButton from "../components/AppButton";
import { useDispatch } from 'react-redux';
import { increment, decrement} from '../cart/cartSlice';
import Heading from "../components/Heading";

function ShoppingCartScreen() {
    const cartItems = useSelector(state =>state.cart.shoppingCartItems);
    const totalNumberOfItems = useSelector(state => state.cart.numberOfItems);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    console.log("Total Number of items", totalNumberOfItems);
    const dispatch = useDispatch();
    console.log("cartItems",cartItems);

    const handleDecrement = (item) => {
        console.log("Decrement id",item.product.id)
        dispatch(decrement(item));
    }

    const handleIncrement = (item) => {
        console.log("Increment id",item.product.id)
        dispatch(increment(item));
    }

    const renderItem = ({item} ) => (
        //console.log("item",item);
        <View style={styles.productContainer}>
                <View style={styles.productImageContainer}>
                    <Image source={{uri: item.product.image}} style={styles.image}/>
                </View>
                <View style={styles.productDetails}>
                    <View style={styles.productTitle}>
                        <Text>{item.product.title}</Text>
                    </View>
                    <View>
                        <Text>Price: ${item.product.price}</Text>
                    </View>
                    <View style={styles.iconRow}>
                        <View>
                            <AppButton onPress={() => handleIncrement(item)} icon="add-circle" color="green" size={20}/>
                        </View>
                        <View>
                            <Text>Quantity: {item.quantity}</Text>
                        </View>
                        <View>
                            <AppButton onPress={() => handleDecrement(item)} icon="remove-circle" color="green" size={20}/>
                        </View>
                    </View>
                </View> 
        </View>
    ); 
 
    return ( 
        <SafeAreaView style={{flex: 1}}>

            <Heading title="Shopping Cart" />

            <View style={styles.valueHeading}>
                <View style={styles.secondHeading}>
                    <Text style={styles.text}>Items: {totalNumberOfItems}</Text>
                </View>
                <View style={styles.secondHeading}>
                    <Text style={styles.text}>Total Price: ${totalPrice}</Text>
                </View>
            </View>
            <View style={styles.productList}>
                {cartItems.length > 0 ? (
                <FlatList
                    data={cartItems}
                    renderItem={renderItem}
                    keyExtractor={item => item.product.id.toString()}
                />
            ) : (
            <Text>Your shopping cart is empty.</Text>
        )}
            </View>
        </SafeAreaView>
   
    ) 
} 
export default ShoppingCartScreen;

const styles = StyleSheet.create({
    productList: {
        flex : 1,
        marginBottom: 5,
        marginTop: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    valueHeading: {
        flexDirection: 'row',
        backgroundColor: '#0b90e3',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10

    },
    text: {
        color: 'black',
        fontWeight: 'bold'
    },
    secondHeading: {
        margin: 20
    },
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
    image: {
        height: 70,
        width: 70,
        borderColor: 'black',
        borderWidth: 1
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})