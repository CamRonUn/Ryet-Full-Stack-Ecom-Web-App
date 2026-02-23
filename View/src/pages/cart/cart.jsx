import React from "react";
import { useState, useEffect } from "react";
import {checklogin} from "../../../../Controller/users"
import {indexCart} from "../../../../Controller/cart"
import CartItemTile from './cartItemTile'

function CartPage() {
    const [ItemsInCart, setItemsInCart] = useState()
    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                const logged = await checklogin()
                setIsLoggedIn(logged)
                if (logged) {
                    const cartData = await indexCart()
                    setItemsInCart(cartData)
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    },[])
    console.log(isLoggedIn)

    if (!isLoggedIn.user){
        return (
            <div>
                <p>Cart Currently only avalable for logged in Users</p>
            </div>
        )
    }

    if(loading){
        return (
            <></>
        )
    }

    console.log(ItemsInCart.cart)

    return (
        <>
            <div className="CartPage">
                <h1>Cart</h1>
                {ItemsInCart.cart.map(item => (
                    <CartItemTile item={item} />
                ))}
            </div>
        </>

    )
}

export default CartPage