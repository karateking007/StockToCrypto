function fetchData() {
    const API_KEY = '8b1960cf9c5847b490b9de4499de24c0';
    let stockSymbol = 'GSPC';
    let API_Call = `https://api.twelvedata.com/time_series?symbol=${stockSymbol}&exchange=NYSE&interval=1month&outputsize=12&apikey=${API_KEY}`;
    let resObj = [];
    const datesObject = { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec", };
    var workingMonthArr = [];
    var workingMonth = "";
    var workingMonthSplitArr = [];
    var dateNums;
    var argsObj = {};

    fetch(API_Call)
        .then(
            function (response) {
                return response.json();
            }
        )
        .then(function (data) {
            console.log(data);
            for (let key in data['values']) {
                resObj.push(data['values'][key]);
            }
            console.log("resObj");
            console.log(resObj);

            const seriesDates = resObj.map(dates => dates.datetime);
            var closingPrice = resObj.map(closePrice => closePrice.close);

            for (let i = 0; i < seriesDates.length; i++) {
                workingMonthSplitArr = seriesDates[i].split("");
                dateNums = workingMonthSplitArr[5].concat(workingMonthSplitArr[6]);
                workingMonthArr.push(datesObject[dateNums]);
            }

            workingMonthArr = workingMonthArr.reverse();
            closingPrice = closingPrice.reverse();

            console.log(workingMonthArr);
            console.log(closingPrice);

            argsObj = {
                graphTimeline: workingMonthArr,
                graphPrice: closingPrice
            }

            return argsObj;
        })
        .then(function (argsObj) {
            graphData(argsObj);
        }

        );
}




fetchData();

