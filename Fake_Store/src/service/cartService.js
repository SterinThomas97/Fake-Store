import { useSelector } from "react-redux";

const server = 'localhost';
const port = 3000;

export const updateCart = async(token,items) => {
    console.log(items);
    const url = `http://${server}:${port}/cart`;
    const cartItems = {items};
    console.log("Inside updateCart()", cartItems)
    console.log("Inside updateCart() ssss", JSON.stringify(cartItems))
    try {
        const res = await fetch(url, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(cartItems)
        });
        const data = await res.json();
        
        console.log("updateCart",data);
        return data;
    } catch (error) {
        throw new Error("Failed to update the cart: " + error);
    }
}

export const getCartItems = async(token) => {
    const url = `http://${server}:${port}/cart`;
    try {
        const res = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json();
       
        console.log("getCartItems",(data));
        return data.items; 
    } catch (error) {
        throw new Error("Failed to load the cart items: "+ error);
    }
}
