import React from "react";
import './reviews.css';
import star from '../assets/5star.png'
import cam from '../assets/homepage/reviewPFP/186.jpg'
import Alice from '../assets/homepage/reviewPFP/DSC08559-ve-velke-velikosti.webp'
import logan from '../assets/homepage/reviewPFP/images(2).jpeg'
import chloe from '../assets/homepage/reviewPFP/images(3).jpeg'
import joe from '../assets/homepage/reviewPFP/Joe-title.jpg'
import bob from '../assets/homepage/reviewPFP/selfie-8.webp'

function Reviews() {
    return (
        <div className="wrapperReviews">
            <div className="Reviewcards">
                <div className="reviewCard">
                    <div className="reviewName">
                        <img src={cam} alt="Profile Pic"/>
                        <p>Cameron Taylor</p>
                    </div>
                    <div className="reviewDescription">
                        <p>I recently picked up a few components from Ryet (specifically their 3D-printed saddle and integrated carbon cockpit), and I have to say, I am genuinely impressed. In an industry where "lightweight" usually means "bank-breaking," Ryet is a breath of fresh air.</p>
                    </div>
                    <div className="Stars">
                        <img src={star} alt="star"/>
                    </div>
                </div>
                <div className="reviewCard">
                    <div className="reviewName">
                        <img src={Alice} alt="Profile Pic"/>
                        <p>Alice Lee</p>
                    </div>
                    <div className="reviewDescription">
                        <p>I was skeptical about the weight claims, but my Ryet carbon saddle actually came in a few grams under the advertised weight. It looks stunning on my road bike and the build quality is indistinguishable from brands triple the price. If you want to shave grams without the 'carbon tax,' this is it.</p>
                    </div>
                    <div className="Stars">
                        <img src={star} alt="star"/>
                    </div>
                </div>
                <div className="reviewCard">
                     <div className="reviewName">
                        <img src={logan} alt="Profile Pic"/>
                        <p>Logan Hanckel</p>
                    </div>
                    <div className="reviewDescription">
                        <p>I took a chance on the Ryet Ultimate carbon wheels (1050g weight class) and they are incredible. The acceleration is night and day compared to my old alloy set. They feel stiff and responsive on 15% gradients, and the carbon spokes haven't needed a single trueing after 1,000km. If you’re a climber, these are the best bang-for-your-buck upgrades out there.</p>
                    </div>
                    <div className="Stars">
                        <img src={star} alt="star"/>
                    </div>                   
                </div>
                <div className="reviewCard">
                    <div className="reviewName">
                        <img src={chloe} alt="Profile Pic"/>
                        <p>Chloe Cooper</p>
                    </div>
                    <div className="reviewDescription">
                        <p>"I built a custom wheelset using Ryet’s 6-pawl Boost hubs, and the engagement is nearly instant. There’s almost no 'dead spot' when starting a technical climb or sprinting out of a corner. Plus, the acoustic profile is perfect—it has that premium 'angry bee' buzz without being obnoxiously loud. Truly professional quality at an entry-level price.</p>
                    </div>
                    <div className="Stars">
                        <img src={star} alt="star"/>
                    </div>                    
                </div>
                <div className="reviewCard">
                     <div className="reviewName">
                        <img src={joe} alt="Profile Pic"/>
                        <p>Joe Knowl</p>
                    </div>
                    <div className="reviewDescription">
                        <p>The Ryet Aether carbon crankset is a work of art. At under 300g for the arms, I was worried about flex, but they feel rock solid under load. The 29mm DUB-compatible spindle made installation on my SRAM setup seamless. It’s rare to find a crankset this light that doesn't cost as much as a whole bike.</p>
                    </div>
                    <div className="Stars">
                        <img src={star} alt="star"/>
                    </div>                   
                </div>
                <div className="reviewCard">
                    <div className="reviewName">
                        <img src={bob} alt="Profile Pic"/>
                        <p>Bob Small</p>
                    </div>
                    <div className="reviewDescription">
                        <p>I’ve been using the Ryet SPD-compatible dual-platform pedals for my gravel bike. The clip-in mechanism is crisp and adjustable, but having the flat side for technical sections where I need to dab a foot is a lifesaver. The sealed bearings have held up through a very muddy winter season without any grinding or play</p>
                    </div>
                    <div className="Stars">
                        <img src={star} alt="star"/>
                    </div>                    
                </div>
            </div>
            <div aria-hidden className="Reviewcards">
                 <div className="reviewCard">
                    <div className="reviewName">
                        <img src={cam} alt="Profile Pic"/>
                        <p>Cameron Taylor</p>
                    </div>
                    <div className="reviewDescription">
                        <p>I recently picked up a few components from Ryet (specifically their 3D-printed saddle and integrated carbon cockpit), and I have to say, I am genuinely impressed. In an industry where "lightweight" usually means "bank-breaking," Ryet is a breath of fresh air.</p>
                    </div>
                    <div className="Stars">
                        <img src={star} alt="star"/>
                    </div>
                </div>
                <div className="reviewCard">
                    <div className="reviewName">
                        <img src={Alice} alt="Profile Pic"/>
                        <p>Alice Lee</p>
                    </div>
                    <div className="reviewDescription">
                        <p>I was skeptical about the weight claims, but my Ryet carbon saddle actually came in a few grams under the advertised weight. It looks stunning on my road bike and the build quality is indistinguishable from brands triple the price. If you want to shave grams without the 'carbon tax,' this is it.</p>
                    </div>
                    <div className="Stars">
                        <img src={star} alt="star"/>
                    </div>
                </div>
                <div className="reviewCard">
                     <div className="reviewName">
                        <img src={logan} alt="Profile Pic"/>
                        <p>Logan Hanckel</p>
                    </div>
                    <div className="reviewDescription">
                        <p>I took a chance on the Ryet Ultimate carbon wheels (1050g weight class) and they are incredible. The acceleration is night and day compared to my old alloy set. They feel stiff and responsive on 15% gradients, and the carbon spokes haven't needed a single trueing after 1,000km. If you’re a climber, these are the best bang-for-your-buck upgrades out there.</p>
                    </div>
                    <div className="Stars">
                        <img src={star} alt="star"/>
                    </div>                   
                </div>
                <div className="reviewCard">
                    <div className="reviewName">
                        <img src={chloe} alt="Profile Pic"/>
                        <p>Chloe Cooper</p>
                    </div>
                    <div className="reviewDescription">
                        <p>"I built a custom wheelset using Ryet’s 6-pawl Boost hubs, and the engagement is nearly instant. There’s almost no 'dead spot' when starting a technical climb or sprinting out of a corner. Plus, the acoustic profile is perfect—it has that premium 'angry bee' buzz without being obnoxiously loud. Truly professional quality at an entry-level price.</p>
                    </div>
                    <div className="Stars">
                        <img src={star} alt="star"/>
                    </div>                    
                </div>
                <div className="reviewCard">
                     <div className="reviewName">
                        <img src={joe} alt="Profile Pic"/>
                        <p>Joe Knowl</p>
                    </div>
                    <div className="reviewDescription">
                        <p>The Ryet Aether carbon crankset is a work of art. At under 300g for the arms, I was worried about flex, but they feel rock solid under load. The 29mm DUB-compatible spindle made installation on my SRAM setup seamless. It’s rare to find a crankset this light that doesn't cost as much as a whole bike.</p>
                    </div>
                    <div className="Stars">
                        <img src={star} alt="star"/>
                    </div>                   
                </div>
                <div className="reviewCard">
                    <div className="reviewName">
                        <img src={bob} alt="Profile Pic"/>
                        <p>Bob Small</p>
                    </div>
                    <div className="reviewDescription">
                        <p>I’ve been using the Ryet SPD-compatible dual-platform pedals for my gravel bike. The clip-in mechanism is crisp and adjustable, but having the flat side for technical sections where I need to dab a foot is a lifesaver. The sealed bearings have held up through a very muddy winter season without any grinding or play</p>
                    </div>
                    <div className="Stars">
                        <img src={star} alt="star"/>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default Reviews