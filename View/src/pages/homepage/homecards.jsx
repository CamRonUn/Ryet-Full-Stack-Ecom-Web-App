import React from "react";
import './homecards.css';
import { Link } from "react-router-dom"; 
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import saddle from '../../assets/homepage/saddle.jpg';
import bikehub from '../../assets/homepage/bikehub.jpg';
import crankset from '../../assets/homepage/crankset.jpg';
import pedals from '../../assets/homepage/pedals.jpg';
import wheels from '../../assets/homepage/wheels.jpg';
import handlebars from '../../assets/homepage/handlebars.jpg';



function HomeCards() {

    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["215%", "-230%"]);

    return (
        <div ref={targetRef} className="track">
        <div className="wrapper">
        <section className="homecards">
            <motion.div style={{ x }} className="Card">
                <div className="PhotoWrapper">
                <div className="photo">
                <img src={bikehub} alt="Bike Hub"/>
                </div>
                <div className="content">
                    <h2>Bike Hubs</h2>
                    <Link to='/catalog/Bike Hubs'>
                        <button className="shop-btn">Shop Now</button>
                    </Link>
                </div>
            </div>
            </motion.div>
            <motion.div style={{ x }} className="Card">
                <div className="PhotoWrapper">
                <div className="photo">
                   <img src={handlebars} alt="Handlebars"/>
                </div>
                <div className="content">
                    <h2>Handlebars</h2>
                    <Link to='/catalog/Handlebars'>
                        <button className="shop-btn">Shop Now</button>
                    </Link>
                </div>
            </div>
            </motion.div>
            <motion.div style={{ x }} className="Card">
                <div className="PhotoWrapper">
                <div className="photo">
                   <img src={saddle} alt="Saddle"/>
                </div>
                <div className="content">
                    <h2>Saddles</h2>
                    <Link to='/catalog/Saddles'>
                        <button className="shop-btn">Shop Now</button>
                    </Link>
                </div>
            </div>
            </motion.div>
            <motion.div style={{ x }} className="Card">
                <div className="PhotoWrapper">
                <div className="photo">
                   <img src={pedals} alt="Pedals"/>
                </div>
                <div className="content">
                    <h2>Pedals</h2>
                    <Link to='/catalog/Pedals'>
                        <button className="shop-btn">Shop Now</button>
                    </Link>
                </div>
            </div>
            </motion.div>
           <motion.div style={{ x }} className="Card">
            <div className="PhotoWrapper">
                <div className="photo">
                   <img src={crankset} alt="Crank Set"/>
                </div>
                <div className="content">
                    <h2>Crank Set</h2>
                    <Link to='/catalog/Crank Sets'>
                        <button className="shop-btn">Shop Now</button>
                    </Link>
                </div>
            </div>
            </motion.div>
            <motion.div style={{ x }} className="Card">
                <div className="PhotoWrapper">
                    <div className="photo">
                        <img src={wheels} alt="Wheels"/>
                    </div>
                    <div className="content">
                        <h2>Wheels</h2>
                        <Link to='/catalog/Wheels'>
                            <button className="shop-btn">Shop Now</button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
        </div>
        </div>
    )
}

export default HomeCards