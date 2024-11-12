// import API_KEY from "./apikey.js";

function fetchData() {
    var cryptoSymbol = changeCryptoValue;
    var crypto_API_Call = `https://api.twelvedata.com/time_series?symbol=${cryptoSymbol}&exchange=Binance&interval=${timeInterval}&outputsize=${outputSize}&apikey=8b1960cf9c5847b490b9de4499de24c0`;
    var stockSymbol = changeStockValue;
    var stock_API_Call = `https://api.twelvedata.com/time_series?symbol=${stockSymbol}&interval=${timeInterval}&outputsize=${outputSize}&apikey=8b1960cf9c5847b490b9de4499de24c0`;
    var stockResObj = [], cryptoResObj = [];
    const datesObject = { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec" };
    var stockWorkingMonthArr = [], cryptoWorkingMonthArr = [], cryptoWorkingYearArr = [], combinedMonthYear = [];
    var stockWorkingMonthSplitArr = [], cryptoWorkingMonthSplitArr = [], stockDateNums, cryptoDateNums, cryptoDateYear;
    var argsObj = {}, stockDates, cryptoDates;

    fetch(stock_API_Call)
        .then(function (response) {
            if (!response.ok) { // Check if the response was successful
                throw new Error("Error: too many requests or API issue. Please refresh / try again later.");
            }
            return response.json();
        })
        .then(function (stockData) {
            if (stockData.values) { // Check if data contains 'values'
                for (let key in stockData['values']) {
                    stockResObj.push(stockData['values'][key]);
                }

                stockDates = stockResObj.map(dates => dates.datetime);
                var stockClosingPrice = stockResObj.map(stockClosePrice => stockClosePrice.close);

                for (let i = 0; i < stockDates.length; i++) {
                    stockWorkingMonthSplitArr = stockDates[i].split("");
                    stockDateNums = stockWorkingMonthSplitArr[5].concat(stockWorkingMonthSplitArr[6]);
                    stockWorkingMonthArr.push(datesObject[stockDateNums]);
                }

                stockWorkingMonthArr = stockWorkingMonthArr.reverse();
                stockClosingPrice = stockClosingPrice.reverse();

                argsObj = {
                    stockGraphTimeline: stockWorkingMonthArr,
                    stockGraphPrice: stockClosingPrice
                };

                return fetch(crypto_API_Call);
            } else {
                throw new Error("Data format issue: 'values' not found.");
            }
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Error: too many requests or API issue. Please refresh / try again later.");
            }
            return response.json();
        })
        .then(function (cryptoData) {
            if (cryptoData.values) { // Check if data contains 'values'
                for (let key in cryptoData['values']) {
                    cryptoResObj.push(cryptoData['values'][key]);
                }

                cryptoDates = cryptoResObj.map(dates => dates.datetime);

                var cryptoClosingPrice = cryptoResObj.map(cryptoClosePrice => cryptoClosePrice.close);

                for (let i = 0; i < cryptoDates.length; i++) {
                    cryptoWorkingMonthSplitArr = cryptoDates[i].split("");
                    cryptoDateNums = cryptoWorkingMonthSplitArr[5].concat(cryptoWorkingMonthSplitArr[6]);
                    cryptoDateYear = cryptoWorkingMonthSplitArr[2].concat(cryptoWorkingMonthSplitArr[3]);
                    cryptoWorkingYearArr.push(cryptoDateYear);
                    cryptoWorkingMonthArr.push(datesObject[cryptoDateNums]);
                }

                cryptoWorkingYearArr = cryptoWorkingYearArr.reverse();
                cryptoWorkingMonthArr = cryptoWorkingMonthArr.reverse();
                cryptoClosingPrice = cryptoClosingPrice.reverse();

                for (let i = 0; i < cryptoWorkingMonthArr.length; i++) {
                    combinedMonthYear.push(cryptoWorkingMonthArr[i].concat(" \'").concat(cryptoWorkingYearArr[i]));
                }

                argsObj.cryptoGraphTimeline = combinedMonthYear;
                argsObj.cryptoGraphPrice = cryptoClosingPrice;

                return argsObj;
            } else {
                throw new Error("Data format issue: 'values' not found.");
            }
        })
        .then(function (argsObj) {
            graphData(argsObj);
        })
        .catch(function (error) {
            alert(error.message);
        });
}

fetchData();
// export default fetchData();