import { useSelector } from "react-redux";

const server = 'localhost';
const port = 3000;

export const createNewOrder = async(token,items) => {
    //const token = useSelector(state => state.auth.authenticationKey);
    console.log("Inside createNewOrder()", {items});
    const url = `http://${server}:${port}/orders/neworder`;
    const order_items = {items}
    try {
        const res = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(order_items)
        });
        const data = await res.json();
    } catch(error) {
        throw new Error("Failed to create new order: " +  error);
    }
}

export const getMyOrders = async() => {
    const token = useSelector(state => state.auth.authenticationKey);
    const url = `http://${server}:${port}/orders/all`;
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
        return data;
    } catch(error) {
        throw new Error("Failed to load the orders "+ error);
    }
}