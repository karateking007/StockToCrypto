function fetchData() {
    const API_KEY = '8b1960cf9c5847b490b9de4499de24c0';
    let stockSymbol = 'GSPC';
    let API_Call = `https://api.twelvedata.com/time_series?symbol=${stockSymbol}&exchange=NYSE&interval=1month&outputsize=12&apikey=${API_KEY}`;
    let monthSeries = [];

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
        })
}

fetchData();

