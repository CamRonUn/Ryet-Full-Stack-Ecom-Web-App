import {baseURL} from './config'

export const indexCatagory = async (catagory) => {
    try {
        const catResponse = await fetch(`${baseURL}/catagories/name/${encodeURIComponent(catagory)}`);
        const catData = await catResponse.json()
        return catData
    } catch (err) {
        throw (err)
    }
};

export const indexCatProducts = async (id) => {
    try {
        const response = await fetch(`${baseURL}/catagories/product/${id}`);
        const data = await response.json()
        return data
    } catch (err) {
        throw (err)
    }
};

export const indexAllProducts = async () => {
    try {
        const response = await fetch(`${baseURL}/product`)
        const data = await response.json()
        return data
    } catch(err) {
        throw (err)
    }
}

export const indexSearchProducts = async (searchterm) => {
    try {
        let searchtermSanatised = searchterm.trim();
        const response = await fetch(`${baseURL}/product/search/${encodeURIComponent(searchtermSanatised)}`);
        const data = await response.json();
        return data
    } catch(err) {
        throw (err)
    }
} 

