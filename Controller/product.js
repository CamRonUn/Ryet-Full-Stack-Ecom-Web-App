import {baseURL} from './config'

export const indexProduct = async (id) => {
    try {
        const numberRegenx = /^[0-9]+$/
        if (!numberRegenx.test(id)) {
            return false
        }
        const response = await fetch(`${baseURL}/product/${id}`)
        const data = await response.json()
        return data
    } catch (err) {
        throw (err)
    }
}

export const indexProdsCat = async (id) => {
    try {
        const Response = await fetch(`${baseURL}/productcatagory/${id}`)
        const data = await Response.json()
        return data
    } catch (err) {
        throw (err)
    }
}

export const indexCatsTop10 = async (id) => {
    try {
        const Response = await fetch(`${baseURL}/catagories/top10/${id}`)
        const data = await Response.json()
        return data
    } catch (err) {
        throw (err)
    }   
}

