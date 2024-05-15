import {createSlice} from '@reduxjs/toolkit';

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
            const item = state.shoppingCartItems.find(item => item.product.id === id);
            if (item) {
                item.quantity += 1;
                state.totalPrice =  state.totalPrice + item.product.price;
            } else {
                state.shoppingCartItems.push({product: action.payload, quantity : 1});
                state.totalPrice =  state.totalPrice + action.payload.price;
            }
            state.numberOfItems++;
            
        },
        increment: (state, action) => {
            const id = action.payload.product.id;
            const item = state.shoppingCartItems.find(item => item.product.id === id);
            if (item) {
                item.quantity += 1;
                state.totalPrice = state.totalPrice + item.product.price;
                state.numberOfItems++;
            }
            
        },
        decrement: (state, action) => {
            const id = action.payload.product.id;
            const item = state.shoppingCartItems.find(item => item.product.id === id);
            if (item) {
                item.quantity -= 1;
                state.numberOfItems--;
                state.totalPrice = state.totalPrice - item.product.price;
            }
        },
        removeFromCart: (state, action) => {
            state.shoppingCartItems = state.shoppingCartItems.filter(item => item.product.id !== action.payload.product.id);
            state.totalPrice = state.totalPrice - action.payload.product.price;
            state.numberOfItems--;
        }
    },
});

export const { addToCart, increment, decrement, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer; 