import React from "react";
import { useState, useEffect, useContext } from "react";
import {getExchangeRate} from '../../../Controller/currency'
import {CurrencyContext} from './curencyHelper'



export function CurrencyProvider({children}) {
    const [currency, setCurrency] = useState({code: 'CNY', symbol:'¥', label:'Yuan'});
    const [exchangeRates, setExchangeRates] = useState([])

    useEffect(() => {
        const getCurrency = async () => {
            try {
                const exchangerateData = await getExchangeRate()
                setExchangeRates(exchangerateData)
            } catch (error) {
                console.log(error)
            }
        }
        getCurrency()
    }, [])

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, exchangeRates }}>
            {children}
        </CurrencyContext.Provider>
    )
}

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
};