
const server = 'localhost';
const port = 3000;

export const createNewOrder = async(token,items) => {
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

export const updateOrder = async(token, item) => {
    const url = `http://${server}:${port}/orders/updateorder`;
    const orderItem = {item};
    try {
        const res = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(orderItem.item)
        });
        const data = await res.json();
    } catch(error) {
        throw new Error("Failed to update the order: " + error);
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
        if (data.orders) {
            const parsedOrders = data.orders.map(order => {
                try {
                    return {
                        ...order,
                        order_items: JSON.parse(order.order_items)
                    };
                } catch (error) {
                    console.error('Error parsing order_items:', error);
                }
            });
            return parsedOrders;
        }
        
    } catch(error) {
        throw new Error("Failed to load the orders "+ error);
    }
}