import React from "react";
import { useCurrency } from "../../util/currencyContext";
import { Link } from "react-router-dom";

function RecommendedTile({item, currentId}) {
    const {currency, exchangeRates} = useCurrency()
    const price = `${currency.symbol}${Math.round(item.Price * exchangeRates.cny[currency.code.toLowerCase()] * 100) / 100}`

    if (item.id === parseInt(currentId)) {
        return (<>
        </>)
    }

    return(
        <div className="RecommendedTile">
            <Link to={`/Product/${item.id}`}>
                <div className="recommendedProdImgContainer">
                        <img className="recommendedProdImg" src={item.image}/>
                </div>
                <p className="recommendedProdTitle">{item.name.split(" ").splice(0,4).join(" ")}</p>
                <p>{price}</p>
            </Link>
        </div>
    )
}

export default RecommendedTile