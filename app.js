
let url = 'https://openexchangerates.org/api/',
    apiKey = 'f63201ce66544654bb0feb9632bcabab',
    currency = 'currencies.json',
    latest = 'latest.json';

// console.log(url + currency + '?app_id=' + apiKey);

window.onload = function() {
    let fromName = document.getElementById('cur-from-name');
    let fromValue = document.getElementById('cur-from-value');
    let toName = document.getElementById('cur-to-name');
    let toValue = document.getElementById('cur-to-value');
    let displayAmount = document.getElementById('display-amt');
    let displayCurrencyFrom = document.getElementById('display-from-currency');
    let displayCurrencyTo = document.getElementById('display-to-currency');
    let convertButton = document.getElementById('cur-convert');
    let refreshButton = document.getElementById('cur-refresh');

    fetch(url + currency + '?app_id=' + apiKey)
        .then(data => data.json())
        .then(obj => {
            let arr = [];
            for (let key in obj) {
                arr.push(`<option value=${key} ${(key === 'IQD') ? 'selected' : ''}>[${key}] ${obj[key]}</option>`);
            }
            let html = arr.join('');
            fromName.innerHTML = html;
            toName.innerHTML = html;
        })
        .catch(err => console.log(err));

    convertButton.addEventListener('click', () => {
        displayAmount.innerHTML = '...';
        displayCurrencyFrom.innerHTML = fromName.value;
        displayCurrencyTo.innerHTML = 'loading';

        fetch(url + latest + '?app_id=' + apiKey)
            .then(data => data.json())
            .then(obj => {
                let x = obj.rates[fromName.value],
                    y = obj.rates[toName.value];
                toValue.value = (fromValue.value * y) / x;

                displayCurrencyTo.innerHTML = toName.value;
                displayAmount.innerHTML = y / x;
            })
            .catch(err => {
                alert('Api Call Was Faliure.');
                console.log('error: ' + err);
                displayAmount.innerHTML = '??';
                displayCurrencyTo.innerHTML = 'Currency';
            });
    });

    refreshButton.addEventListener('click', () => {
        alert('API Has Cache Problem IDK PLZ HELP SO REFRESH DOES NOT WORK :(');
    });
}