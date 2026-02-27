import React, { useState } from "react";
import "./ProductImage.css"

function ProductImage({item}) {
    let images = [item.image]
    console.log(item.otherimages)
    if (item.otherimages){
        if (item.otherimages.split(",").length >= 1) {
            images = [item.image, ...item.otherimages.split(",")]
        }
    } else {
        images = [item.image]
    }
    const [activeImage, setActiveImage] = useState(images[0])

    return (
<div className="product-gallery-container">
            {/* 1. The Large Main Image */}
            <div className="main-image-wrapper">
                <img 
                    src={activeImage} 
                    alt="Product focus" 
                    className="main-product-img" 
                />
            </div>

            {/* 2. The Clickable Thumbnail Row */}
            <div className="thumbnail-row">
                {images.map((img, index) => (
                    <div 
                        key={index} 
                        className={`thumbnail-item ${activeImage === img ? 'active-border' : ''}`}
                        onClick={() => setActiveImage(img)}
                    >
                        <img src={img} alt={`View ${index}`} />
                    </div>
                ))}
            </div>
        </div>
    )

}

export default ProductImage