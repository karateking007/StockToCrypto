function fetchData() {
    const API_KEY = '3WYAZ3VMWSWBZ3GC';
    let stockSymbol = 'GSPC';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stockSymbol}&apikey=${API_KEY}`;
    let monthSeries = [];
    let counter = 0;

    fetch(API_Call)
        .then(
            function (response) {
                return response.json();
            }
        )
        .then(function (data) {
            console.log(data);
            for (let key in data['Monthly Time Series']) {
                monthSeries.push(data['Monthly Time Series'][key][open]);
                counter += 1;
                if (counter >= 12) {
                    break;
                }
            }
            console.log(monthSeries);
        })


}

fetchData();

