import {createSlice} from '@reduxjs/toolkit';
import { updateCart } from '../service/cartService';
import { createNewOrder, updateOrder } from '../service/orderService';
import { Alert } from 'react-native';

export const initialState = {
    orders: [],
    shoppingCartItems: [],
    numberOfItems: 0,
    totalPrice: 0,
    numberOfOrders : 0,
    numPaidOrders: 0,
    paidOrders: [],
    deliveredOrders: [],
    numDeliveredOrders: 0
}; 

const cartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: { 
        addToCart: (state, action) => {
            const id = action.payload.id;
            const item = state.shoppingCartItems.find(item => item.id === id);
            if (item) {
                item.count += 1;
                state.totalPrice =  state.totalPrice + item.price;
                updateCart(action.payload.token,state.shoppingCartItems);
            } else {
                state.totalPrice =  state.totalPrice + action.payload.price;
                state.shoppingCartItems.push({id: action.payload.id, price: action.payload.price, count: 1, title: action.payload.title, image: action.payload.image});
                updateCart(action.payload.token,state.shoppingCartItems)
            }
            state.numberOfItems++; 
            
        },
        increment: (state, action) => {
            const id = action.payload.item.id;
            const item = state.shoppingCartItems.find(item => item.id === id);
            if (item) {
                item.count += 1;
                state.totalPrice = state.totalPrice + item.price;
                state.numberOfItems++;
            }
            updateCart(action.payload.authKey, state.shoppingCartItems);
            
        },
        decrement: (state, action) => {
            const id = action.payload.item.id;
            const item = state.shoppingCartItems.find(item => item.id === id);
            if (item) {
                item.count -= 1;
                state.numberOfItems--;
                state.totalPrice = state.totalPrice - item.price;
            }
            updateCart(action.payload.authKey, state.shoppingCartItems);
            
        },
        removeFromCart: (state, action) => {
            state.shoppingCartItems = state.shoppingCartItems.filter(item => item.id !== action.payload.item.id);
            state.totalPrice = state.totalPrice - action.payload.item.price;
            state.numberOfItems--;
            updateCart(action.payload.authKey, state.shoppingCartItems);
        },
        setShoppingCartItems: (state, action) => {
            state.shoppingCartItems = action.payload;
        },
        setTotalPriceAndNumOfItems: (state, action) => {
            state.totalPrice = 0;
            state.numberOfItems = 0;
            action.payload.forEach(item => {
                state.totalPrice += (item.price * item.count);
                state.numberOfItems += item.count;
            });
        },
        updateOrders: (state, action) => {
            const data = createNewOrder(action.payload.token, action.payload.orderItems);
            state.shoppingCartItems = [];
            state.numberOfItems = 0;
            state.totalPrice = 0;
            state.numberOfOrders += 1;
            updateCart(action.payload.token, state.shoppingCartItems);

        },
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        setNumberOfOrders: (state, action) => {
            state.paidOrders = [];
            state.numPaidOrders = 0;
            state.orders = [];
            state.numberOfOrders = 0;
            state.deliveredOrders = [];
            if (state.orders.length == 0 && state.paidOrders.length == 0) {
                action.payload.forEach(order => {
                    if (order.is_paid == 1) {
                       state.numPaidOrders += 1;
                       state.paidOrders.push(order);
                    } else if (order.is_delivered == 1) {
                        state.numDeliveredOrders += 1;
                        state.deliveredOrders.push(order);
                    } else {
                        state.numberOfOrders += 1;
                        state.orders.push(order);
                    }
                })
            }
        }
        ,
        getNewOrders: (state, action) => {
            return state.orders;
        },
        
        moveItemToPaidOrder: (state, action) => {
            state.paidOrders = state.orders.filter(item => item.id == action.payload.id);
            state.orders = state.orders.filter(item => item.id !== action.payload.id);
            state.numPaidOrders += 1;
            state.numberOfOrders -= 1;
            const orderItem = {token: action.payload.token, item : {orderID: action.payload.id, isPaid: 1, isDelivered: 0}};
            const res = updateOrder(orderItem.token, orderItem.item);
            Alert.alert("Order is paid");
        },
        moveItemToDeliveredOrder: (state, action) => {
            state.deliveredOrders = state.paidOrders.filter(item => item.id == action.payload.id);
            state.paidOrders = state.paidOrders.filter(item => item.id !== action.payload.id);
            state.numDeliveredOrders += 1;
            state.numPaidOrders -= 1;
            const orderItem = {token : action.payload.token, item: {orderID: action.payload.id, isPaid: 0, isDelivered: 1}};
            updateOrder(orderItem.token, orderItem.item);
            Alert.alert("Order is received.");
        }
    },
});

export const { moveItemToDeliveredOrder, getNewOrders, moveItemToPaidOrder, setOrdersState,setNumberOfOrders, addToCart, increment, decrement, removeFromCart, setShoppingCartItems, setOrders, setTotalPriceAndNumOfItems, updateOrders} = cartSlice.actions;
export default cartSlice.reducer; 