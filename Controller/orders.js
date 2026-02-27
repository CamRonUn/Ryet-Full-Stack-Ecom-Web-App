import {baseURL} from './config'

export const indexTop3 = async (id) => {
    try {
        const response = await fetch(`${baseURL}/top3productPhotos/${id}`)
        const data = await response.json()
        return data 
    } catch (err) {
        console.error(err)
    }
}

export const indexOrderPrice = async (id) => {
    try {
        const response = await fetch(`${baseURL}/orderstotalprice/${id}`, {
            credentials: 'include'
        })
        const data = await response.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

export const indexOrder = async (id) => {
    try {
        const response = await fetch(`${baseURL}/viewOrder/${id}`, {
            credentials: "include"
        });
        const data = await response.json()
        return data
    } catch (err) {
        console.error(err)
    }
}