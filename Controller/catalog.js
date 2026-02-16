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
