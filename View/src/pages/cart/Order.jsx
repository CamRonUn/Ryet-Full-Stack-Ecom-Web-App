import { useState, useEffect, useRef } from "react";
import {checklogin} from "../../../../Controller/users"
import {indexCart, handleCheckout} from "../../../../Controller/cart"
import CartItemTile from './cartItemTile'
import Footer from '../footer'
import {useCurrency} from '../../util/currencyContext'
import "./order.css"
import OrderItemTile from "./orderItemTile"



function OrderConfirm() {
    const [ItemsInCart, setItemsInCart] = useState()
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [GotTotal, setGotTotal] = useState(false)
    const {exchangeRates, currency} = useCurrency()
    const [street_address, setStreet_address] = useState("")
    const [City, setCity] = useState("")
    const [postCode, setPostCode] = useState("")
    const [country, setCountry] = useState("")
    const CityRef = useRef(null)
    const PostCodeRef = useRef(null)
    const CountryRef = useRef(null)


    const handleStreet_address = (e) => {
        setStreet_address(e.target.value)
    }

    const handleStreetKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the form from submitting
            CityRef.current.focus(); // Corrected spelling: .focus()
        }
    };

    const handleCity = (e) => {
        setCity(e.target.value)
    }

    const handleCityKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the form from submitting
            PostCodeRef.current.focus(); // Corrected spelling: .focus()
        }
    };

    const handlePostCode = (e) => {
        setPostCode(e.target.value)
    }

    const handlePostCodeKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the form from submitting
            CountryRef.current.focus(); // Corrected spelling: .focus()
        }
    };

    const handleCountry = (e) => {
        setCountry(e.target.value)
    }

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

    if (!isLoggedIn.user){
        return (
            <div>
                <p>Order only avalable for logged in Users</p>
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
        setTotal(response.cost)
        setGotTotal(response.stat)
    }

    const onSubmitOrder = (e) => {
        e.preventDefault();
        handleCheckout(street_address, City, postCode, country);
    }


    return (
        <>
            <div className="OrderPage">
                <div className="OrderPageTitle">
                    <h1>Order Confirmation</h1>
                </div>
                <div className="ProductsOrder">
                    {ItemsInCart.cart.map(item => (
                        <OrderItemTile item={item} key={item.id}/>
                    ))}
                    <p className="OrderTotalPrice">
                        <span>Total</span>
                        <span>{currency.symbol}{Math.round(total * exchangeRates.cny[currency.code.toLowerCase()] * 100) / 100}</span>
                    </p>
                </div>
                <div className="ShippingDetails">
                    <h2>Shipping Details</h2>
                    <form className="ShippingDetails" onSubmit={onSubmitOrder}>
                        <input type="text" id="Street_Address" onKeyDown={handleStreetKeyDown}  value={street_address} placeholder="StreetAddress" onChange={handleStreet_address} className="ShippingDetailInput" />
                        <input type="text" id="City" value={City} placeholder="City" onKeyDown={handleCityKeyDown} onChange={handleCity} ref={CityRef} className="ShippingDetailInput" />
                        <input type="text" id="postCode" value={postCode} placeholder="PostCode" onKeyDown={handlePostCodeKeyDown} onChange={handlePostCode} ref={PostCodeRef} className="ShippingDetailInput" />
                        <input type="text" id="country" value={country} placeholder="Country" onChange={handleCountry} ref={CountryRef} className="ShippingDetailInput" />
                        <button type="submit">Pay Now</button>
                    </form>
                </div>
                <div className="orderPageBottom">
                    <button className="ConfirmOrder">Place Order</button>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default OrderConfirm