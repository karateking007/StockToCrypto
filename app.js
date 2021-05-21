// Default values
changeStockValue = 'GSPC';
changeCryptoValue = 'BTC/USD';

// Stock Selection
var stockElement = document.getElementById("stock-dropdown");
var checkStockDropdown = stockElement.options[stockElement.selectedIndex].value;

stockElement.addEventListener("change", (e) => {
    clearChart();
    changeStockValue = e.target.value;
    fetchData();
});

// Crypto Selection
var cryptoElement = document.getElementById("crypto-dropdown");
var checkCryptoDropdown = cryptoElement.options[cryptoElement.selectedIndex].value;

cryptoElement.addEventListener("change", (e) => {
    clearChart();
    changeCryptoValue = e.target.value;
    fetchData();
});
