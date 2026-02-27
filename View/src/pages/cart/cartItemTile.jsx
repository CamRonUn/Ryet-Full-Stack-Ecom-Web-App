import React from "react";
import {RemoveFromCart} from '../../../../Controller/cart'
import { useState } from "react";
import {useCurrency} from '../../util/currencyContext'

function CartItemTile({item, setTotal, total}) {
    const [deleted, setDeleted] = useState(false)
    const {exchangeRates, currency} = useCurrency()
    const handleDelete = () => {
        RemoveFromCart(item.id)
        setDeleted(item.id)
        setTotal(total - item.Price)
    }

    const handleBuyNow = () => {

    }

    if (deleted) {
        return (<></>)
    }

    return (
        <div className="CartTile">
            <p className="CartTileTitle">{item.Product}</p>
            <p className="CartTilePrice">{currency.symbol}{Math.round(item.Price * exchangeRates.cny[currency.code.toLowerCase()] * 100) / 100}</p>
            <div className="CartTileImageeContainer">
                <img src={item.image} alt="TileImg" />
            </div>
            <div className="tilespace"></div>
            <button className="BuyNowButton">Buy Now</button>
            <p className="CartTileCloseButton" onClick={() => handleDelete()}>x Remove From Cart</p>

        </div>
    )
}

export default CartItemTile