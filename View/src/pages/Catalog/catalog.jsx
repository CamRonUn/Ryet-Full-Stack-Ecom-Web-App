import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {indexCatagory, indexCatProducts} from '../../../../Controller/catalog'
import ProductTile from './productTile'
import './catalog.css'
import Footer from "../footer";


function Catalog() {
    const { catagoryname } = useParams();
    const [catagory, setCatagory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading ] = useState(true);
    const [sortOption, setSort] = useState('Name');


    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const catagoryData = await indexCatagory(catagoryname)
                const ProductData = await indexCatProducts(catagoryData.id)
                setCatagory(catagoryData)
                setProducts(ProductData)
            } catch (error) {
                console.error("Failed to load catalog:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData()
    }, [ catagoryname])

    const SortedProducts = [...products].sort((a,b) => {
        if (sortOption === 'Lowest-Price') return a.Price - b.Price;
        if(sortOption === 'Highest-Price') return b.Price - a.Price;
        if (sortOption === 'Name') return a['Product Name'].localeCompare(b['Product Name']);
        return 0
    })

    if (loading) {
        return (
            <div className="Loading"></div>
        )
    }

    return (
        <>
        <div className="CatalogTitle">
            <p>{products.length} Items</p>
            <h2>{catagory.name}</h2>
            <div className="catalogFilter">
                <p>Sort By:</p>
                <select onChange={(e) => setSort(e.target.value)} value={sortOption}>
                    <option value='Name'>Name</option>
                    <option value='Lowest-Price'>Lowest Price</option>
                    <option value='Highest-Price'>Highest Price</option>
                </select>
            </div>
        </div>
        <div className="DescriptionCatalog">
            <p>{catagory.description}</p>
        </div>
        <div className="CatalogGrid">
            {SortedProducts.map(product => (
                <ProductTile key={product["product ID"]} item={product} />
            ))}
        </div>
        <Footer/>
        </>
    )
}

export default Catalog