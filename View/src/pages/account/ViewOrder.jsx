import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {indexOrder} from "../../../../Controller/orders"
import Footer from "../footer"
import OrderItemTile from "./orderItemTile"
import "./ViewOrder.css"

function ViewProduct() {
    const { OrderId } = useParams()
    const [loading, setLoading] = useState(true)
    const  [order, setOrder] = useState([])
    const [ownsOrder, setOwnsOrder] = useState(false)
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

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            try {
                const data = await indexOrder(OrderId)
                if (data.doesNotOwn){
                    setOwnsOrder(false)
                } else {
                    setOwnsOrder(true)
                    setOrder(data.data)
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        getData()
    },[])

    if(loading){
        return(
            <>
            </>
        )
    }

    if(!ownsOrder){
        return(
        <>
            <p>Please Login To see Your Order</p>
        </>
        )
    }

    console.log(order)
    return (
        <>
        <div className="OrderInfo" >
            <h1>Order #{OrderId.slice(0,15)}...</h1>
            <p className="OrderDate">{order[0].Date.split('-')[2].slice(0,2)} {monthdate(order[0].Date.split('-')[1])} {order[0].Date.split('-')[0]}</p>
        </div>
        <div className="ItemContainer">
            {order.map(item => (
                <OrderItemTile item={item}/>
            ))}
        </div>
        <Footer />
        </>
    )
}

export default ViewProduct