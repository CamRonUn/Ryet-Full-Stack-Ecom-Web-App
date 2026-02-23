import React from "react";
import {RemoveFromCart} from '../../../../Controller/cart'
import { useState } from "react";

function CartItemTile({item}) {
    const [deleted, setDeleted] = useState(false)
    const handleDelete = () => {
        RemoveFromCart(item.id)
        setDeleted(true)
    }

    if (deleted) {
        return (<></>)
    }

    return (
        <div className="CartTile">
            <p className="CartTileTitle">{item.Product}</p>
            <p className="CartTilePrice">{item.Price}</p>
            <div className="CartTileImageeContainer">
                <img src={item.image} alt="TileImg" />
            </div>
            <p className="CartTileCloseButton" onClick={() => handleDelete()}>x</p>

        </div>
    )
}

export default CartItemTile