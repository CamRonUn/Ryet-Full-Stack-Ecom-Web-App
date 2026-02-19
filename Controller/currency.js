export const getExchangeRate = async () => {
        try {
        let searchtermSanatised = searchterm.trim();
        const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/tusd.json`);
        const data = await response.json();
        return data
    } catch(err) {
        throw (err)
    }
} 