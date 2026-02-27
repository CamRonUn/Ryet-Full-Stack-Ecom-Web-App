import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../footer";
import {indexProduct, indexProdsCat, indexCatsTop10} from '../../../../Controller/product'
import './product.css'
import {checklogin} from "../../../../Controller/users"
import {useCurrency} from '../../util/currencyContext'
import {addProductToCart} from "../../../../Controller/cart"
import RecommendedTile from "./productRecomendTile"
import './productReccommendedSection.css'
import ProductImage from "./ProductImage";


function ProductPage() {
    const { productID } = useParams()
    const [productInfo, setproductInfo ] = useState([])
    const [, setproductCat ] = useState([])
    const [catItmes, seletcatItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const {exchangeRates, currency} = useCurrency()

    useEffect(() => {
        setLoading(true)
        const loaddata = async() => {
        try {
                const productResponse = await indexProduct(productID)
                const productData = productResponse[0]
                const prodcatData = await indexProdsCat(productData.id)
                const catsTop10Data = await indexCatsTop10(prodcatData[0].catagory_id) 
                const isloggedInData = await checklogin()
                setIsLoggedIn(isloggedInData.user)
                setproductInfo(productData)
                setproductCat(prodcatData[0])
                seletcatItems(catsTop10Data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }}
        loaddata()
    }, [productID])

    if (loading) {
        return (
            <></>
        )
    }

    console.log(productInfo)
    return (
        <>
            <div className="ProductPage">
                <div className="ProductPhoto Section">
                    <ProductImage item={productInfo} />
                </div>
                <div className="RightSide">
                    <div className="InformationSection">
                        <h1>{productInfo.name}</h1>
                        <p className="Price"> Price: {exchangeRates ? currency.code === 'CNY' ? `${currency.symbol}${Math.round(productInfo.price * 100) /100}` : `${currency.symbol}${Math.round(productInfo.price * exchangeRates.cny[currency.code.toLowerCase()] * 100) / 100}` : `${productInfo.price}` } </p>
                        <p className="description">{productInfo.description}</p>
                    </div>
                    <div className="PurchuseOptions">
                        <button className="BuyNow">Buy Now</button>
                        <button className={isLoggedIn ? "addToCart" : ""} onClick={() => {addProductToCart(productInfo.id)}}>{isLoggedIn ? "Add To Cart" : ""}</button>
                    </div>
                </div>
            </div>
            <div className="RecomendedProducts">
                <div className="RecommendedTitle">
                    <h3>Items You Might Like</h3>
                </div>
                <div className="RecomendedImagesScroll">
                    {catItmes.map(item => (
                        <RecommendedTile item={item} key={item.id} currentId={productID}/>
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default ProductPage