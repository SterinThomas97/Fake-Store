import { View, Text, SafeAreaView } from "react-native";
import Heading from "../components/Heading";
import { getMyOrders } from "../service/orderService";
import { useEffect } from "react";
import { setOrders } from "../cart/cartSlice";
import { useDispatch, useSelector } from 'react-redux';

function MyOrdersScreen() {
    const token = useSelector(state => state.auth.authenticationKey);
    const dispatch = useDispatch();
    useEffect(() => {
        const getOrders = async() => {
            const result = await getMyOrders(token);
            if (result.orders && result.orders.length > 0) {
                console.log("Inside getOrders()", result.orders.length);
                dispatch(setOrders(result.orders));
            }
        } 
        getOrders();
    },[]);
    return (
        <SafeAreaView style={{flex: 1}}>
            <Heading title="My Orders"/>
            <View>

            </View>
        </SafeAreaView>
       
        
    )
}

export default MyOrdersScreen;