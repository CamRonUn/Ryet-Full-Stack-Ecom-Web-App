import React, { useEffect, useState } from "react";
import {indexTop3, indexOrderPrice} from "../../../../Controller/orders"
import {useCurrency} from '../../util/currencyContext'
import { Link } from "react-router-dom";



function OrderListElement({ order }) {
    const [orderItemPhotos, setOrderItemPhotos] = useState([])
    const [loading, setLoading] = useState(true)
    const [orderPrice, setOrderPrice] = useState([])
    const monthdate = (month) => {
        if (month === "01") {
            return "Jan"
        }
        if (month === "02") {
            return "Feb"
        }
        if (month === "03") {
            return "Mar"
        }
        if (month === "04") {
            return "Apr"
        }
        if (month === "05") {
            return "May"
        }
        if (month === "06") {
            return "Jun"
        }
        if (month === "07") {
            return "Jul"
        }
        if (month === "08") {
            return "Aug"
        }
        if (month === "09") {
            return "Sep"
        }
        if (month === "10") {
            return "Oct"
        }
        if (month === "11") {
            return "Nov"
        }
        if (month === "12") {
            return "Dec"
        }
    }
    const productLink = `/Order/${order.id}`
    const {exchangeRates, currency} = useCurrency()
    
    useEffect(() => {
        const getPhotos = async () => {
            try {
                setLoading(true)
                const orderPhotos = await indexTop3(order.id)
                const orderPriceData = await (indexOrderPrice(order.id))
                setOrderPrice(orderPriceData)
                setOrderItemPhotos(orderPhotos)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        getPhotos()
    }, [order.id])

    if (loading) {
        return (
            <></>
        )
    }

    console.log(orderItemPhotos)
    console.log(orderPrice)

    return (
        <div className="orderTile">
            <p className="ordertileText">Order: {order.date.split('-')[2].slice(0,2)} {monthdate(order.date.split('-')[1])} {order.date.split('-')[0]}</p>
            <div className="ordertileImageContainer">
                {orderItemPhotos.map((photo) => (
                    <div className="ordertileImagesContainer">
                        <img className="ordertileImages" src={photo.image} alt="productImage" />
                    </div>
                ))}
            </div>
            <p className="ordertileText">Total Cost: {currency.symbol}{ Math.round(orderPrice[0].total * exchangeRates.cny[currency.code.toLowerCase()] * 100) / 100}</p>
            <Link to={productLink}>
                <button className="ViewOrder">View Order</button>
            </Link>
        </div>
    )
}

export default OrderListElement