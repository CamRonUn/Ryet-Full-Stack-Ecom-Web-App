import React from "react";
import {RemoveFromCart} from '../../../../Controller/cart'
import {useCurrency} from '../../util/currencyContext'

function OrderItemTile({item}) {
    const {exchangeRates, currency} = useCurrency()

    return (
        <div className="OrderConfirmItem">
            <div className="CartTileImageeContainer">
                <img src={item.image} alt="TileImg" />
            </div>
            <p className="CartTileTitle">{item.Product.split(" ").splice(0,5).join(" ")}</p>
            <p className="CartTilePrice">{currency.symbol}{Math.round(item.Price * exchangeRates.cny[currency.code.toLowerCase()] * 100) / 100}</p>
        </div>
    )
}

export default OrderItemTile