import React from "react";
import { useState, useEffect } from "react";
import {checklogin} from "../../../../Controller/users"
import {indexCart} from "../../../../Controller/cart"
import CartItemTile from './cartItemTile'
import './cart.css'
import Footer from '../footer'
import {useCurrency} from '../../util/currencyContext'
import { Link } from "react-router-dom";


function CartPage() {
    const [ItemsInCart, setItemsInCart] = useState()
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [GotTotal, setGotTotal] = useState(false)
    const {exchangeRates, currency} = useCurrency()
    


    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                const logged = await checklogin()
                setIsLoggedIn(logged)
                console.log(logged)
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

    const getCartTotal = () => {
            let total = 0
            for (let i = 0; i < ItemsInCart.cart.length; i++) {
                total = total + ItemsInCart.cart[i].Price
            }
            return {cost: total, stat: true}
    }
    
    if (isLoggedIn.user && ItemsInCart && !GotTotal){
        let response = getCartTotal()
        console.log(response)
        setTotal(response.cost)
        setGotTotal(response.stat)
    }

    return (
        <>
            <div className="CartPage">
                <h1>Cart</h1>
                {ItemsInCart.cart.map(item => (
                    <CartItemTile item={item} setTotal={setTotal} total={total}/>
                ))}
            </div>
            <div className="OrderDetails">
                <p>Total Cost: {currency.symbol}{ Math.round(total * exchangeRates.cny[currency.code.toLowerCase()] * 100) / 100}</p>
                <Link to="/OrderConfirm">
                    <button className="OrderAll" >Order</button>
                </Link>
            </div>
            <Footer/>
        </>

    )
}

export default CartPage