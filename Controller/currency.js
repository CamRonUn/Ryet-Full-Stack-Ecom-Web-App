export const getExchangeRate = async () => {
    try {
        const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/cny.json`);
        const data = await response.json();
        return data
    } catch(err) {
        console.err(err)
        console.log("didnt fetch")
    }
} 


