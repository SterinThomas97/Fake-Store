import {createSlice} from '@reduxjs/toolkit';
import { updateCart } from '../service/cartService';
import { createNewOrder } from '../service/orderService';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';

export const initialState = {
    orders: [],
    shoppingCartItems: [],
    numberOfItems: 0,
    totalPrice: 0,
    numberOfOrders : 0
}; 
//const token = useSelector(state => state.auth.authenticationKey);

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
                console.log("Inside addToCart()- state.totalPrice", state.totalPrice);
                state.shoppingCartItems.push({id: action.payload.id, price: action.payload.price, count: 1, title: action.payload.title, image: action.payload.image});
                console.log("inside addToCart()- state.shoppingCartItems",state.shoppingCartItems);
                updateCart(action.payload.token,state.shoppingCartItems)
            }
            state.numberOfItems++; 
            
        },
        increment: (state, action) => {
            const id = action.payload.item.id;
            const item = state.shoppingCartItems.find(item => item.id === id);
            console.log("token",action.payload.authKey);
            console.log("Incremernt", item)
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
            console.log("Inside decrement ", item);
            updateCart(action.payload.authKey, state.shoppingCartItems);
            
        },
        removeFromCart: (state, action) => {
            state.shoppingCartItems = state.shoppingCartItems.filter(item => item.id !== action.payload.id);
            state.totalPrice = state.totalPrice - action.payload.price;
            state.numberOfItems--;
            updateCart(state.shoppingCartItems);
        },
        setShoppingCartItems: (state, action) => {
            console.log("Inside setShoppingCartItems()")
            state.shoppingCartItems = action.payload;
        },
        setTotalPriceAndNumOfItems: (state, action) => {
            state.totalPrice = 0;
            state.numberOfItems = 0;
            console.log("Inside setTotalPriceAndNumOfItems()", state)
            action.payload.forEach(item => {
                state.totalPrice += (item.price * item.count);
                state.numberOfItems += item.count;
            });
        },
        updateOrders: (state, action) => {
            console.log("updateOrders", state)
            console.log("Inside updateOrders()", action.payload);
            const data = createNewOrder(action.payload.token, action.payload.orderItems);
            //state.orders.push(action.payload.orderItems);
            state.shoppingCartItems = [];
            state.numberOfItems = 0;
            state.totalPrice = 0;
            state.numberOfOrders += 1;
            updateCart(action.payload.token, state.shoppingCartItems);

        },
        setOrders: (state, action) => {
            console.log("Inside setOrders()",action.payload);
            state.orders = action.payload;
            //console.log(state.orders.length)
        },
        setNumberOfOrders: (state, action) => {
            console.log("Inside setNumberOfOrders ", action);
            state.numberOfOrders = action.payload.length;
            state.orders = action.payload;
        }
        ,
        setOrdersState: (state, action) => {
            state.orders = action.payload;
        }
    },
});

export const { setOrdersState,setNumberOfOrders, addToCart, increment, decrement, removeFromCart, setShoppingCartItems, setOrders, setTotalPriceAndNumOfItems, updateOrders} = cartSlice.actions;
export default cartSlice.reducer; 