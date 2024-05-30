import { useSelector } from "react-redux";

const server = 'localhost';
const port = 3000;


export const signinUser = async({email, password}) => {
    //const token = useSelector(state => state.auth.authenticationKey);
    const url = `http://${server}:${port}/users/signin`;
    const user = { email, password};
    try {
        const res = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error("Failed to sign in: "+error);
    }
}

export const updateUserProfile = async({token, name, password}) => {
    //const token = useSelector(state => state.auth.authenticationKey);
    const url = `http://${server}:${port}/users/update`;
    const user = {name, password};
    try {
        const res = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(user)
        });
        return await res.json();
    } catch(error) {
        throw new Error("Failed to update: " + error);
    }
}

export const signUpUser = async(name, email, password) =>{
    const url = `http://${server}:${port}/users/signup`;
    const user = { name, email, password };
    console.log("Inside signUpUser()", user);
    try {
        const res = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        return await res.json();
    } catch (error) {
        throw new Error("Failed to sign up user: ", + error);
    }
}
