import React from "react";
import {useCurrency} from '../../util/currencyContext'
import { Link } from "react-router-dom";


function OrderItemTile({item}) {
    const {exchangeRates, currency} = useCurrency()
    const link = `/product/${item.product_id}`

    console.log(item)
    return (
        <div className="OrderItemTile">
            <Link to={link}>
                <p className="OrderItemName">{item.name}</p>
            </Link>
            <p className="OrderItemPrice">{currency.symbol}{Math.round(item.price * exchangeRates.cny[currency.code.toLowerCase()] * 100) / 100}</p>
            <div className="CartTileImageeContainer">
                <Link to={link}>
                <img src={item.image} alt="TileImg" />
                </Link>
            </div>
            <Link to={link}>
                <button className="BuyNowButton viewItemButton">View Item</button>
            </Link>
        </div>
        
    )
}

export default OrderItemTile