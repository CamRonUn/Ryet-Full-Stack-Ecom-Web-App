import './productTile.css'
import { useState } from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function ProductTile({ item }) {

    const Navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='ProductTile' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => Navigate(`/Product/${item['Product ID']}`)}>
            <div className="ProductTileImg">
                <img src={item.image2} alt="Product Image" className='secondPicTileCat'/>
                <img src={item.Image} alt="Product Image" className={isHovered ? 'hiddenCatImage' : 'primaryCatImage'}/>
            </div>
            <div className='ProductTileInfo'>
                <p className='ProductTileTitle'>{item['Product Name']}</p>
                <p className='ProductTilePrice'>${item.Price} AUD</p>
            </div>
        </div>
    )
}

export default ProductTile
