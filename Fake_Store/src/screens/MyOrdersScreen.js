import React, { useState, useEffect } from "react";
import { View, SafeAreaView, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Heading from "../components/Heading";
import { getMyOrders } from "../service/orderService";
import { useDispatch, useSelector } from 'react-redux';
import Orders from "../components/Orders";
import ExpandedOrders from "../components/ExpandedOrders";
import ExpandedOrdersItems from "../components/ExpandedOrdersItems";
import { moveItemToDeliveredOrder, moveItemToPaidOrder, setNumberOfOrders } from "../cart/cartSlice";
import AppButton from "../components/AppButton";

function MyOrdersScreen() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.authenticationKey);
    const numNewOrders = useSelector(state => state.cart.numberOfOrders);
    const newOrders = useSelector( state =>  state.cart.orders);
    const paidOrders = useSelector( state => state.cart.paidOrders);
    const deliveredOrders = useSelector( state => state.cart.deliveredOrders);
    const numPaidOrders = useSelector( state => state.cart.numPaidOrders);
    const [expandedId, setExpandedId] = useState(null);
    const [myOrdersExpanded, setMyOrdersExpanded] = useState({ newMyOrders: false, newMyPaidOrders: false, newMyDeliveredOrders: false });
    
    const isExpanded = (id) => id === expandedId;

    
    const getMyOrdersData = async () => {
        const result = await getMyOrders(token);
        if (result && result.length > 0) {
            dispatch(setNumberOfOrders(result));
        }
    };

    useEffect(() => {
        const getMyOrdersData = async () => {
            const result = await getMyOrders(token);
            if (result && result.length > 0) {
                dispatch(setNumberOfOrders(result));
            }
        };
        getMyOrdersData();
    }, [numNewOrders]);

    useEffect(() => {
        const getMyOrdersData = async () => {
            const result = await getMyOrders(token);
            if (result && result.length > 0) {
                dispatch(setNumberOfOrders(result));
            }
        };
        getMyOrdersData();
    }, []);


    const toggleExpand = (id) => {
        getMyOrdersData();
        setExpandedId(prevId => (prevId === id ? null : id));
    };

    const toggleExpanded = () => {
        getMyOrdersData();
        setMyOrdersExpanded(prevState => ({
            ...prevState,
            newMyOrders: !prevState.newMyOrders
        }));
    };

    const displayNewOrdersItems = ({ item }) => {
        return(<ExpandedOrdersItems order={item} />)

    }

    const handlePayPress = (id) => {
        const item = {id: id, token: token};
        dispatch(moveItemToPaidOrder(item));
    }

    const handleReceivePress = (id) => {
        const item = {id: id, token: token};
        dispatch(moveItemToDeliveredOrder(item));
    }

    const toggleExpandedPaid = () => {
        getMyOrdersData();
        setMyOrdersExpanded({ newMyOrders: false, newMyPaidOrders: !myOrdersExpanded.newMyPaidOrders, newMyDeliveredOrders: false })
    }

    const toggleExpandedDelivered = () => {
        getMyOrdersData();
        setMyOrdersExpanded({ newMyOrders: false, newMyPaidOrders: false, newMyDeliveredOrders: !myOrdersExpanded.newMyDeliveredOrders })
    }
    const checkPaid = (item) => {
        if (item.is_paid) {
            return true;
        } else {
            return false;
        }
    }

    const checkDelivered = (item) => {
        if (item.is_delivered) {
            return true;
        } else {
            return false;
        }
    }
    const displayNewOrders = ({ item }) => (
        <View>
            { !checkPaid(item) && (
            <View>
                <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                    <ExpandedOrders order={item} name={isExpanded(item.id) ? "caret-up" : "caret-down"} size={20} color="green" />
                </TouchableOpacity>
                {isExpanded(item.id) &&
                    <View>
                        <FlatList
                            data={item.order_items}
                            renderItem={displayNewOrdersItems}
                            keyExtractor={(order) => order.prodID.toString()}
                        />
                        <View style={styles.buttonContainer}>
                                <View style={styles.button}>
                                    <AppButton icon="wallet" onPress={() => handlePayPress(item.id)} color="white" size={20} title="Pay"/>
                                </View>
                        </View>
                    </View>
                }
            </View>
            )}
           
        </View>
    );
    const displayPaidOrders = ({ item }) => (
        <View>
            { checkPaid(item) && (
            <View>
                <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                    <ExpandedOrders order={item} name={isExpanded(item.id) ? "caret-up" : "caret-down"} size={20} color="green" />
                </TouchableOpacity>
                {isExpanded(item.id) &&
                    <View>
                        <FlatList
                            data={item.order_items}
                            renderItem={displayNewOrdersItems}
                            keyExtractor={(order) => order.prodID.toString()}
                        />
                        <View style={styles.buttonContainer}>
                                <View style={styles.button}>
                                    <AppButton icon="card" onPress={() => handleReceivePress(item.id)} color="white" size={20} title="Receive"/>
                                </View>
                        </View>
                    </View>
                }
            </View>
            )}
           
        </View>
    );

    const displayDeliveredOrders = ({ item }) => (
        <View>
            { checkDelivered(item) && (
            <View>
                <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                    <ExpandedOrders order={item} name={isExpanded(item.id) ? "caret-up" : "caret-down"} size={20} color="green" />
                </TouchableOpacity>
                {isExpanded(item.id) &&
                    <View>
                        <FlatList
                            data={item.order_items}
                            renderItem={displayNewOrdersItems}
                            keyExtractor={(order) => order.prodID.toString()}
                        />
                    </View>
                }
            </View>
            )}
           
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.order}>
                <Heading title="My Orders" />
                <TouchableOpacity onPress={toggleExpanded}>
                    <Orders title="New Orders" num={numNewOrders} icon={myOrdersExpanded.newMyOrders ? "caret-up" : "caret-down"} size={20} color="green" />
                </TouchableOpacity>
                {myOrdersExpanded.newMyOrders && (
                        <FlatList
                        data={newOrders}
                        renderItem={displayNewOrders}
                        keyExtractor={(order) => order.id.toString()}
                    />
                    
                )} 
            </View>
            <View style={styles.order}>
                <TouchableOpacity onPress={toggleExpandedPaid}>
                    <Orders title="Paid Orders" num={paidOrders.length} icon={myOrdersExpanded.newMyPaidOrders ? "caret-up" : "caret-down"} size={20} color="green" />
                </TouchableOpacity>
                {
                    myOrdersExpanded.newMyPaidOrders && (
                        <FlatList
                        data={paidOrders}
                        renderItem={displayPaidOrders}
                        keyExtractor={(order) => order.id.toString()}
                        />
                    )
                }
            </View>
            <View style={styles.order}>
                <TouchableOpacity onPress={toggleExpandedDelivered}>
                    <Orders title="Delivered Orders" num={deliveredOrders.length} icon={myOrdersExpanded.newMyDeliveredOrders ? "caret-up" : "caret-down"} size={20} color="green" />
                </TouchableOpacity>
                {
                    myOrdersExpanded.newMyDeliveredOrders && (
                        <FlatList
                        data={deliveredOrders}
                        renderItem={displayDeliveredOrders}
                        keyExtractor={(order) => order.id.toString()}
                        />
                    )
                }
            </View>
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
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 8
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems:'center',
    },
    order: {
        marginTop: 10
    }
});
