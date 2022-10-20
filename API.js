import API_KEY from "./apikey";

function fetchData() {
    let cryptoSymbol = changeCryptoValue;
    let crypto_API_Call = `https://api.twelvedata.com/time_series?symbol=${cryptoSymbol}&exchange=Binance&interval=${timeInterval}&outputsize=${outputSize}&apikey=${API_KEY}`;

    let stockSymbol = changeStockValue;
    let stock_API_Call = `https://api.twelvedata.com/time_series?symbol=${stockSymbol}&interval=${timeInterval}&outputsize=${outputSize}&apikey=${API_KEY}`;

    let stockResObj = [];
    let cryptoResObj = [];
    const datesObject = { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec" };

    let stockWorkingMonthArr = [], cryptoWorkingMonthArr = [], cryptoWorkingYearArr = [], combinedMonthYear = [];

    let stockWorkingMonthSplitArr = [], cryptoWorkingMonthSplitArr = [], stockDateNums, cryptoDateNums, cryptoDateYear;

    let argsObj = {}, stockDates, cryptoDates;

    fetch(stock_API_Call)
        .then(
            function (response) {
                return response.json();
            }
        )
        .then(function (stockData) {
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
            }

            return fetch(crypto_API_Call)
        })
        .then(
            function (response) {
                return response.json();
            }
        )
        .then(function (cryptoData) {
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
        })
        .then(function (argsObj) {
            graphData(argsObj);
        }
        )
}

fetchData();