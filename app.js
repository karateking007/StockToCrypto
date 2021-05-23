// Stock Selection
var stockElement = document.getElementById("stock-dropdown");
var checkStockDropdown = stockElement.options[stockElement.selectedIndex].value;

// Crypto Selection
var cryptoElement = document.getElementById("crypto-dropdown");
var checkCryptoDropdown = cryptoElement.options[cryptoElement.selectedIndex].value;

// Interval Selection
var intervalElement = document.getElementById("interval-dropdown");
var checkIntervalDropdown = intervalElement.options[intervalElement.selectedIndex].value;

// Default values
changeStockValue = checkStockDropdown;
changeCryptoValue = checkCryptoDropdown;
var timeInterval = '1h';
var outputSize = 24;

// Listen for stock dropdown
stockElement.addEventListener("change", (e) => {
    clearChart();
    changeStockValue = e.target.value;
    fetchData();
});

// Listen for crypto dropdown
cryptoElement.addEventListener("change", (e) => {
    clearChart();
    changeCryptoValue = e.target.value;
    fetchData();
});

// Listen for interval change
intervalElement.addEventListener("change", (e) => {
    clearChart();
    switch (e.target.value) {
        case 'day':
            timeInterval = '1h';
            outputSize = 24;
            break;
        case 'week':
            timeInterval = '1day';
            outputSize = 7;
            break;
        case 'month':
            timeInterval = '1day';
            outputSize = 31;
            break;
        case 'year':
            timeInterval = '1day';
            outputSize = 366;
            break;
    }
    fetchData();
});