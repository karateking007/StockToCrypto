function fetchData() {
    const API_KEY = '8b1960cf9c5847b490b9de4499de24c0';

    let cryptoSymbol = changeCryptoValue;
    let crypto_API_Call = `https://api.twelvedata.com/time_series?symbol=${cryptoSymbol}&exchange=Binance&interval=1month&outputsize=12&apikey=${API_KEY}`;

    let stockSymbol = changeStockValue;
    let stock_API_Call = `https://api.twelvedata.com/time_series?symbol=${stockSymbol}&exchange=NYSE&interval=1month&outputsize=12&apikey=${API_KEY}`;

    let stockResObj = [];
    let cryptoResObj = [];
    const datesObject = { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec", };

    var stockWorkingMonthArr = [];
    var cryptoWorkingMonthArr = [];

    var stockWorkingMonthSplitArr = [];
    var cryptoWorkingMonthSplitArr = [];
    var stockDateNums;
    var cryptoDateNums;

    var argsObj = {};

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

            const seriesDates = stockResObj.map(dates => dates.datetime);
            var stockClosingPrice = stockResObj.map(stockClosePrice => stockClosePrice.close);

            for (let i = 0; i < seriesDates.length; i++) {
                stockWorkingMonthSplitArr = seriesDates[i].split("");
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

            const seriesDates = cryptoResObj.map(dates => dates.datetime);
            var cryptoClosingPrice = cryptoResObj.map(cryptoClosePrice => cryptoClosePrice.close);

            for (let i = 0; i < seriesDates.length; i++) {
                cryptoWorkingMonthSplitArr = seriesDates[i].split("");
                cryptoDateNums = cryptoWorkingMonthSplitArr[5].concat(cryptoWorkingMonthSplitArr[6]);
                cryptoWorkingMonthArr.push(datesObject[cryptoDateNums]);
            }

            cryptoWorkingMonthArr = cryptoWorkingMonthArr.reverse();
            cryptoClosingPrice = cryptoClosingPrice.reverse();

            argsObj.cryptoGraphTimeline = cryptoWorkingMonthArr;
            argsObj.cryptoGraphPrice = cryptoClosingPrice;

            return argsObj;
        })
        .then(function (argsObj) {
            graphData(argsObj);
        }
        )
        .catch((err) => {
            console.error(err);
        }
        )
}




fetchData();

