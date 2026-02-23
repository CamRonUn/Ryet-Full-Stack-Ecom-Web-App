import React from "react";
import {getCurrentUser, indexUsersOrders} from '../../../../Controller/users'
import { useState, useEffect } from "react";
import Footer from "../footer";
import accountBanner from '../../assets/account page.jpg'
import './accountpage.css'
import OrderListElement from "./orderListElement";

function Accountpage() {
       const [mainUserData, setmainUserData] = useState([])
       const [loading, setloading] = useState(true)
       const [orders, setOrderes] = useState([])

        useEffect(() => {
            const loadUser = async () => {
                setloading(true);
                try {
                    const data = await (getCurrentUser())
                    const ordersdata = await indexUsersOrders()
                    setmainUserData(data)
                    setOrderes(ordersdata)
                } catch (err) {
                    console.error(err)
                } finally {
                    setloading(false)
                }
            }
                loadUser()
            
            },[]) 

            if (loading) {
                return (
                    <div>

                    </div>
                )
            }

            return (
                <>
                <div className="AccountPage">
                    <div className="WelcomeTitle">
                        <img src={accountBanner} alt="accountBanner" />
                        <div className="accountBannerText">
                             <h1>Welcome {mainUserData.first_name}</h1>
                        </div>
                    </div>
                    <div className="Orders">
                        <h2>Orders</h2>
                        {orders.length > 0 ? orders.map(order => (
                            <OrderListElement key={order.id} order={order} />
                        )) : <p>No Orders</p>}
                    </div>
                    <div className="MightLike"></div>
                    <div className="FeedBack">

                    </div>
                </div>
                <Footer/>
                </>
            )
}

export default Accountpage