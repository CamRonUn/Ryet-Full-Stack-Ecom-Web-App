const {getExchangeRate} = require('./currency.js')


getExchangeRate().then(res => {
    console.log(res)
})
