// Stock Selection
var stockElement = document.getElementById("stock-dropdown");
var checkStockDropdown = stockElement.options[stockElement.selectedIndex].value;
console.log(checkStockDropdown);

stockElement.addEventListener("change", (e) => {
    var changeStockValue = e.target.value;
    console.log(changeStockValue);
});

// Crypto Selection
var cryptoElement = document.getElementById("crypto-dropdown");
var checkCryptoDropdown = cryptoElement.options[cryptoElement.selectedIndex].value;
console.log(checkCryptoDropdown);

cryptoElement.addEventListener("change", (e) => {
    var changeCryptoValue = e.target.value;
    console.log(changeCryptoValue);
});
