function fetchData() {
    const API_KEY = '8b1960cf9c5847b490b9de4499de24c0';
    let stockSymbol = 'GSPC';
    let API_Call = `https://api.twelvedata.com/time_series?symbol=${stockSymbol}&exchange=NYSE&interval=1month&outputsize=12&apikey=${API_KEY}`;
    let monthSeries = [];
    const datesObject = { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec", };
    var workingMonthArr = [];
    var workingMonth = "";
    var workingMonthSplitArr = [];
    var dateNums;

    fetch(API_Call)
        .then(
            function (response) {
                return response.json();
            }
        )
        .then(function (data) {
            console.log(data);
            for (let key in data['values']) {
                monthSeries.push(data['values'][key]);
            }

            const seriesDates = monthSeries.map(dates => dates.datetime);
            console.log(seriesDates);

            for (let i = 0; i < seriesDates.length; i++) {
                workingMonthSplitArr = seriesDates[i].split("");
                dateNums = workingMonthSplitArr[5].concat(workingMonthSplitArr[6]);
                workingMonthArr.push(datesObject[dateNums]);
            }
            console.log(workingMonthArr);

        })
}

fetchData();

