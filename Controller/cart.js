import {baseURL} from './config'

export const addProductToCart = async (id) => {
    try {
        const ressponse = await fetch(`${baseURL}/cart/addproduct`, {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                item_id: id
            })
        })

        if (!ressponse){
            throw new Error(`Server Error ${response.status}`)
        }

        return response.json()
    } catch (err) {
        console.error(err)
    }
}

export const indexCart = async () => {
    try {
        const response = await fetch(`${baseURL}/cart`, {
            credentials: 'include'
        })
        const data = await response.json()
        return data 
    } catch(err) {
        console.error(err)
    }
}

export const RemoveFromCart = async (id) => {
    try {
        const response = await fetch(`${baseURL}/cart/removeprod/${id}`, {
            method: "DELETE",
            credentials: "include"
        })
        const data = await response.json()
        return data
    } catch(err) {
        throw (err)
    }
}

export const handleCheckout = async () => {
    const response = await fetch(`${baseURL}/create-checkout-session`, {
    method: "post",
    headers: {
        'Content-Type': 'application/json' 
    },
    credentials: "include"
    })
    const { url } = await response.json();
    window.location.href = url; // Redirect to Stripe
};

export const verifyPayment = async (sessionId) => {
    try {
        const response = await fetch(`${baseURL}/verifyOrder`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                sessionId: sessionId
            }), 
            credentials: "include"
            })
        const data = await response.json()
        return data.status
    } catch (err) {
        console.error(err)
    }
}