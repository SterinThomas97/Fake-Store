import {createSlice} from '@reduxjs/toolkit';
import { updateCart } from '../service/cartService';

const initialState = {
    shoppingCartItems: [],
    numberOfItems: 0,
    totalPrice: 0
};

const cartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const {id} = action.payload;
            const item = state.shoppingCartItems.find(item => item.id === id);
            if (item) {
                item.count += 1;
                state.totalPrice =  state.totalPrice + item.price;
                updateCart(state.shoppingCartItems);
            } else {
                state.totalPrice =  state.totalPrice + action.payload.price;
                state.shoppingCartItems.push({id: action.payload.id, price: action.payload.price, count: 1, title: action.payload.title, image: action.payload.image});
                console.log("inside addToCart ",state.shoppingCartItems)
                updateCart(state.shoppingCartItems)
            }
            state.numberOfItems++;
            
        },
        increment: (state, action) => {
            const id = action.payload.id;
            const item = state.shoppingCartItems.find(item => item.id === id);
            console.log("Incremernt", item)
            if (item) {
                item.count += 1;
                state.totalPrice = state.totalPrice + item.price;
                state.numberOfItems++;
            }
            updateCart(state.shoppingCartItems);
            
        },
        decrement: (state, action) => {
            const id = action.payload.id;
            const item = state.shoppingCartItems.find(item => item.id === id);
            if (item) {
                item.count -= 1;
                state.numberOfItems--;
                state.totalPrice = state.totalPrice - item.price;
            }
            console.log("Inside decrement ", item);
            updateCart(state.shoppingCartItems);
            
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
            console.log("Inside setTotalPriceAndNumOfItems()")
            action.payload.forEach(item => {
                state.totalPrice += (item.price * item.count);
                state.numberOfItems += item.count;
            });
        }
    },
});

export const { addToCart, increment, decrement, removeFromCart, setShoppingCartItems, setTotalPriceAndNumOfItems} = cartSlice.actions;
export default cartSlice.reducer; 