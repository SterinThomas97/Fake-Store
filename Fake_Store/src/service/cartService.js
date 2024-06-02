const server = 'localhost';
const port = 3000;

export const updateCart = async(token,items) => {
    const url = `http://${server}:${port}/cart`;
    const cartItems = {items};
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
        return data.items; 
    } catch (error) {
        throw new Error("Failed to load the cart items: "+ error);
    }
}
