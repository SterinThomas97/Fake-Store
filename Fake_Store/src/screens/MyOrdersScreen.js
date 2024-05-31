import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Heading from "../components/Heading";
import { getMyOrders } from "../service/orderService";
import { useDispatch, useSelector } from 'react-redux';
import Orders from "../components/Orders";
import ExpandedOrders from "../components/ExpandedOrders";
import ExpandedOrdersItems from "../components/ExpandedOrdersItems";
import { setOrdersState } from "../cart/cartSlice";

function MyOrdersScreen() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.authenticationKey);
    const numNewOrders = useSelector(state => state.cart.numberOfOrders);
    const newOrders = useSelector( state =>  state.cart.orders);
    const [expandedId, setExpandedId] = useState(null);
    const [myOrdersExpanded, setMyOrdersExpanded] = useState({ newMyOrders: false, newMyPaidOrders: false, newMyDeliveredOrders: false });

    const isExpanded = (id) => id === expandedId;

    
    const getMyOrdersData = async () => {
        const result = await getMyOrders(token);
        console.log("useeffect", result)
        if (result && result.length > 0) {
            console.log("result", result)
            dispatch(setOrdersState(result));
        }
    };

    useEffect(() => {
        const getMyOrdersData = async () => {
            const result = await getMyOrders(token);
            console.log("useeffect", result)
            if (result && result.length > 0) {
                console.log("result", result)
                dispatch(setOrdersState(result));
            }
        };
        getMyOrdersData();
    }, [numNewOrders]);
    useEffect(() => {
        const getMyOrdersData = async () => {
            const result = await getMyOrders(token);
            console.log("useeffect", result)
            if (result && result.length > 0) {
                console.log("result", result)
                dispatch(setOrdersState(result));
            }
        };
        getMyOrdersData();
    }, []);


    const toggleExpand = (id) => {
        getMyOrdersData();
        setExpandedId(prevId => (prevId === id ? null : id));
    };

    const toggleExpanded = () => {
        console.log(newOrders)
        setMyOrdersExpanded(prevState => ({
            ...prevState,
            newMyOrders: !prevState.newMyOrders
        }));
    };

    const displayNewOrdersItems = ({ item }) => (
        <ExpandedOrdersItems  item={item} />
    );

    const displayNewOrders = ({ item }) => (
        <View>
            {console.log("sfnsdnv",item)}
            <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                <ExpandedOrders order={item} name={isExpanded(item.id) ? "caret-up" : "caret-down"} size={20} color="green" />
            </TouchableOpacity>
            {isExpanded(item.id) && (
                <FlatList
                    data={item.order_items}
                    renderItem={displayNewOrdersItems}
                    keyExtractor={(item) => item.prodID.toString()}
                />
            )}
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Heading title="My Orders" />
            <TouchableOpacity onPress={toggleExpanded}>
                <Orders title="New Orders" num={numNewOrders} icon={myOrdersExpanded.newMyOrders ? "caret-up" : "caret-down"} size={20} color="green" />
            </TouchableOpacity>
            {myOrdersExpanded.newMyOrders && (
                // <Text>{newOrders.length}</Text>
                <FlatList
                    data={newOrders}
                    renderItem={displayNewOrders}
                    keyExtractor={(order) => order.id.toString()}
                />
            )} 
        </SafeAreaView>
    );
}

export default MyOrdersScreen;

const styles = StyleSheet.create({
    valueColor: {
        color: "black",
        margin: 10,
        fontWeight: 'bold'
    },
    valueContainer: {
        marginHorizontal: 20,
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: "white",
        justifyContent: 'space-evenly'
    },
});
