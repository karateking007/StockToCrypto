// Stock Selection
let stockElement = document.getElementById("stock-dropdown");
let checkStockDropdown = stockElement.options[stockElement.selectedIndex].value;

// Crypto Selection
let cryptoElement = document.getElementById("crypto-dropdown");
let checkCryptoDropdown = cryptoElement.options[cryptoElement.selectedIndex].value;

// Interval Selection
let intervalElement = document.getElementById("interval-dropdown");
let checkIntervalDropdown = intervalElement.options[intervalElement.selectedIndex].value;

// Default values
changeStockValue = checkStockDropdown;
changeCryptoValue = checkCryptoDropdown;
let timeInterval = '1month', outputSize = 12;

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
        case 'one':
            timeInterval = '1month';
            outputSize = 12;
            break;
        case 'two':
            timeInterval = '1month';
            outputSize = 24;
            break;
        case 'three':
            timeInterval = '1month';
            outputSize = 36;
            break;
    }
    fetchData();
});