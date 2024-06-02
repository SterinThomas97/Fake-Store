import { View, Text, FlatList, SafeAreaView, StyleSheet, Image, Alert } from "react-native";
import { useSelector } from 'react-redux';
import AppButton from "../components/AppButton";
import { useDispatch } from 'react-redux';
import { increment, decrement, removeFromCart, updateOrders} from '../cart/cartSlice';
import Heading from "../components/Heading";
import colors from "../constants/Colors";
import { useEffect} from "react";
import { getCartItems } from "../service/cartService";

function ShoppingCartScreen() {
    const token = useSelector(state => state.auth.authenticationKey);
    const cartItems = useSelector(state =>state.cart.shoppingCartItems);
    const totalNumberOfItems = useSelector(state => state.cart.numberOfItems);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const getCartData = async() => {
            const result = await getCartItems(token);
            if (result && result.length > 0) {
                console.log("Inside getCartData useEffect()",result)
            }
        } 
       getCartData();
       
    },[]);
    
    const handleDecrement = ({item}) => {
        const shopItem = {item};
        shopItem.authKey = token;
        if(shopItem.count > 1) {
            dispatch(decrement(shopItem));
        } else {
            dispatch(removeFromCart(shopItem))
        }
    }

    const handleIncrement = ({item}) => {
        const shopItem = {item};
        shopItem.authKey = token;
        dispatch(increment(shopItem));
    }
 
    const handleCheckOut = (cartItems) => {
        const checkout = {orderItems:[], token: null};
        cartItems.forEach(cartItem => {
            checkout.orderItems.push({prodID: cartItem.id, price: cartItem.price, quantity: cartItem.count, image: cartItem.image, title: cartItem.title})
        });
        checkout.token = token;
        dispatch(updateOrders(checkout));
        Alert.alert("Checkout successfully. New order is created.")
    }

    const renderItem = ({item} ) => (
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
                            <AppButton onPress={() => handleIncrement({item})} icon="add-circle" color="green" size={20}/>
                        </View>
                        <View>
                            <Text>Quantity: {item.count}</Text>
                        </View>
                        <View>
                            <AppButton onPress={() => handleDecrement({item})} icon="remove-circle" color="green" size={20}/>
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
                <View>
                    <FlatList
                    data={cartItems}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    /> 
                </View>
                ) : (
                <View style={styles.cartEmpty}>
                    <Text style={styles.cartEmptyText}>Your cart is empty!</Text>
                </View>
                )}
                {cartItems.length > 0 ? (<View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <AppButton onPress={() => handleCheckOut(cartItems)} icon="wallet"  color="white" size={20} title="Check Out"/>
                    </View>
                </View>):""}
            </View>
        </SafeAreaView>
    ) 
} 
export default ShoppingCartScreen;

const styles = StyleSheet.create({
    cartEmptyText:{
        fontSize: 25
    },
    cartEmpty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    productList: {
        flex : 1,
        marginBottom: 5,
        marginTop: 1,
        borderBottomColor: 'black',
       
        justifyContent: 'space-between'
    },
    valueHeading: {
        flexDirection: 'row',
        backgroundColor: colors.valueHeadingColor,
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
    },
    button: {
        backgroundColor: colors.backButtonBackgroundColour,
        padding: 10,
        borderRadius: 8
    },
    buttonContainer: {
        
        alignItems:'center',
        
    },
})