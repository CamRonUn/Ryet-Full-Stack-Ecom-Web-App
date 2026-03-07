import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {verifyPayment} from "../../../../Controller/cart"


function SuccessPage() {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id');
    const [paymentVerified, setPaymentVerified ] = useState("false")
    const Nav = useNavigate()

    useEffect(() => {
        const getData = async() => {
            setPaymentVerified( await verifyPayment(sessionId))
        }
        console.log("useeffect")
        getData()
    },[sessionId])

    console.log(paymentVerified)
    if (paymentVerified === "true"){
        Nav('/account')
        console.log("worked")
    }

    if (paymentVerified === "support") {
        return(<div>
            <p>error has occured confirming your order please contact support</p>
        </div>)
    }

    return (
        <div>
            <h1>Thank you for your order!</h1>
            <p>We are verifying your payment...</p>
        </div>
    );
}

export default SuccessPage