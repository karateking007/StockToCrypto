function fetchData() {
    const API_KEY = '3WYAZ3VMWSWBZ3GC';
    let stockSymbol = 'VTI';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stockSymbol}&apikey=${API_KEY}`;

    fetch(API_Call)
        .then(
            function (response) {
                return response.json();
            }
        )
        .then(function (data) {
            console.log(data);
        })
}

fetchData();