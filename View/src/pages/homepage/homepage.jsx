import React from "react";
import './homepage.css';
import first_vid from '../../assets/homepage/grok-video-5b9e947f-ba51-49ca-b94b-ca47a596cdfc.mp4'
import Footer from "../footer";
import HomeCards from "./homecards";
import Reviews from "./reviews";

function HomePage() {
    return (
        <>
            <div className="firstScreen">
                <div className="video_container">
                    <video className="first_vid" src={first_vid} autoPlay loop muted playsInline/>
                </div>
                <div className="Maincontent">
                    <h1>RYET</h1>
                    <p>Revolutionizing Cycling Performance</p>
                    <button>Find Speed</button>
                </div>
            </div>
            <div className="secondScreen">  
                <HomeCards/>
            </div>
            <div className="thirdScreen">
                <div className="slogan">
                    <h2>Unleash Your Potential with RYET</h2>
                    <p>Experience the perfect blend of cutting-edge technology, superior craftsmanship, and unparalleled performance. RYET is your ultimate destination for high-quality bike components that elevate your cycling experience to new heights.</p>
                </div>
                <div className="reviews">
                    <Reviews/>
                </div>
                <button className="finalButton">Shop Now</button>
            </div>
            <Footer/>
        </>
    )
}

export default HomePage