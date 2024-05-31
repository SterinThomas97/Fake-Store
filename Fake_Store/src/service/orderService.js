import { useSelector } from "react-redux";

const server = 'localhost';
const port = 3000;

export const createNewOrder = async(token,items) => {
    console.log("Inside createNewOrder()", {items});
    const url = `http://${server}:${port}/orders/neworder`;
    const order_items = {items}
    console.log(order_items)
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
        console.log("createNewOrder",data);
    } catch(error) {
        throw new Error("Failed to create new order: " +  error);
    }
}



export const getMyOrders = async(token) => {
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
        //console.log("data.order_items",data.orders[0].order_items)
        const parsedOrders = data.orders.map(order => {
            try {
                return {
                    ...order,
                    order_items: JSON.parse(order.order_items)
                };
            } catch (error) {
                console.error('Error parsing order_items:', error);
                return order; // In case of error, return the original order
            }
        });
        // console.log("dgDG",parsedOrders[0].order_items)
        // parsedOrders.forEach(order => {
        //     console.log(`Order ID: ${order.id}`);
        //     console.log('Parsed Order Items:', order.order_items);
        // });
        console.log("parsedOrders", parsedOrders[0].order_items);
        return parsedOrders;
    } catch(error) {
        throw new Error("Failed to load the orders "+ error);
    }
}