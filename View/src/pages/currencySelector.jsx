import React from "react";
import { useState } from "react";
import './currency.css'
import {useCurrency} from '../util/currencyContext'

function Currency() {
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const {currency, setCurrency} = useCurrency()


    const currencies = [
        { code: 'USD', symbol: '$', label: 'USD' },
        { code: 'EUR', symbol: '€', label: 'EUR' },
        { code: 'GBP', symbol: '£', label: 'GBP' },
        { code: 'AUD', symbol: 'A$', label: 'AUD' },
        { code: 'CNY', symbol:'¥', label:'Yuan'}
    ];

    return (
        <div className="CurrencySelector" onClick={() => setIsCurrencyOpen(true)} onMouseLeave={() => setIsCurrencyOpen(false)}>
            <button className="CurrencyTrigger">
                {currency.code} <span className="Arrow">↓</span>
            </button>
            
            {isCurrencyOpen && (
                <div className="CurrencyDropdown">
                    {currencies.map((item) => (
                        <div 
                            key={item.code} 
                            className="CurrencyOption"
                            onClick={() => {
                                setCurrency(item);
                                setIsCurrencyOpen(false);
                            }}
                        >
                            <span className="Symbol">{item.symbol}</span> {item.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
);
}

export default Currency