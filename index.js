const currencyFirstEl = document.getElementById("currency-first");
const worthFirstEl = document.getElementById("worth-first");
const currencySecondEl = document.getElementById("currency-second");
const worthSecondEl = document.getElementById("worth-second");
const exchangeRateEl = document.getElementById("exchange-rate");
const swapButton = document.getElementById("swap-button");

// Fetch available currencies and populate dropdowns
function populateCurrencyOptions() {
    fetch(`https://open.er-api.com/v6/latest/USD`)
        .then((res) => res.json())
        .then((data) => {
            const currencies = Object.keys(data.rates);
            currencies.forEach((currency) => {
                const option1 = document.createElement("option");
                const option2 = document.createElement("option");
                option1.value = currency;
                option2.value = currency;
                option1.textContent = currency;
                option2.textContent = currency;
                currencyFirstEl.appendChild(option1);
                currencySecondEl.appendChild(option2);
            });

            // Set default values
            currencyFirstEl.value = "USD";
            currencySecondEl.value = "INR";
            updateRate();
        })
        .catch(() => {
            exchangeRateEl.textContent = "Error fetching currencies.";
        });
}

// Update exchange rate and convert values
function updateRate() {
    const baseCurrency = currencyFirstEl.value;
    const targetCurrency = currencySecondEl.value;

    fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`)
        .then((res) => res.json())
        .then((data) => {
            const rate = data.rates[targetCurrency];
            exchangeRateEl.textContent = `1 ${baseCurrency} = ${rate.toFixed(4)} ${targetCurrency}`;
            worthSecondEl.value = (worthFirstEl.value * rate).toFixed(2);
        })
        .catch(() => {
            exchangeRateEl.textContent = "Error fetching exchange rate.";
        });
}

// Swap the selected currencies
function swapCurrencies() {
    const temp = currencyFirstEl.value;
    currencyFirstEl.value = currencySecondEl.value;
    currencySecondEl.value = temp;
    updateRate();
}

// Event listeners
currencyFirstEl.addEventListener("change", updateRate);
currencySecondEl.addEventListener("change", updateRate);
worthFirstEl.addEventListener("input", updateRate);
swapButton.addEventListener("click", swapCurrencies);

// Populate dropdowns on load
populateCurrencyOptions();