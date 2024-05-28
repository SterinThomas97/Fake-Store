const server = 'localhost';
const port = 3000;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjI2LCJpYXQiOjE3MTY5MTI2MzcsImV4cCI6MTcxNjkxNjIzN30.lqTMcB73YjgSDDfNjpA8FHC38MtIsVlqjz9pGpt_CPc";
export const updateCart = async(items) => {
    console.log(items);
    const url = `http://${server}:${port}/cart`;
    const cartItems = {items};
    console.log("Inside updateCart()", cartItems)
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
        //console.log(data);
        return data;
    } catch (error) {
        throw new Error("Failed to update the cart: " + error);
    }
}

export const getCartItems = async() => {
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
        console.log("getCartItems",data);
        return data.items; 
    } catch (error) {
        throw new Error("Failed to load the cart items: "+ error);
    }
}
