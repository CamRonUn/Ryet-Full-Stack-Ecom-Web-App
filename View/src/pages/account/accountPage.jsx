import React from "react";
import {getCurrentUser} from '../../../../Controller/users'
import { useState, useEffect } from "react";
import Footer from "../footer";

function Accountpage() {
       const [mainUserData, setmainUserData] = useState([])
       const [loading, setloading] = useState(true)

        useEffect(() => {
            const loadUser = async () => {
                setloading(true);
                try {
                    const data = await (getCurrentUser())
                    setmainUserData(data)
                } catch (err) {
                    console.error(err)
                } finally {
                    setloading(false)
                }
            }
                loadUser()
            
            },[]) 

            console.log(mainUserData)

            if (loading) {
                return (
                    <div>

                    </div>
                )
            }
            return (
                <>
                <div className="AccountPage">
                    <div className="Welcome Title">
                        <h1>Welcome {mainUserData.first_name}</h1>
                    </div>
                    <div className="Orders">

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