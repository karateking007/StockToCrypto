// Stock Selection
var stockElement = document.getElementById("stock-dropdown");
var checkStockDropdown = stockElement.options[stockElement.selectedIndex].value;

// Crypto Selection
var cryptoElement = document.getElementById("crypto-dropdown");
var checkCryptoDropdown = cryptoElement.options[cryptoElement.selectedIndex].value;

// Default values
changeStockValue = checkStockDropdown;
changeCryptoValue = checkCryptoDropdown;

stockElement.addEventListener("change", (e) => {
    clearChart();
    changeStockValue = e.target.value;
    fetchData();
});

cryptoElement.addEventListener("change", (e) => {
    clearChart();
    changeCryptoValue = e.target.value;
    fetchData();
});
