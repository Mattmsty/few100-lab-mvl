import './styles.css';
import { getTipAmount } from './helpers';

function updateAmounts() {
    if (!validateInputs()) return;
    var billAmt = parseFloat(billInputBox.value);
    var tipPercentText = tipSelector.options[tipSelector.selectedIndex].text;
    var tipPercent;
    if (tipPercentText === 'Custom') {
        tipPercent = parseInt(customTipInputBox.value);
    } else {
        tipPercent = parseInt(tipPercentText);
    }

    var tipAmt = getTipAmount(billAmt, tipPercent / 100);
    tipAmountLabel.innerText = "Tip Amount: $" + tipAmt.toFixed(2);
    billTotalLabel.innerText = "Total Bill: $" + (billAmt + tipAmt).toFixed(2);
}

function validateInputs(): boolean {
    if (!/^(\d*\.)?\d+$/.test(billInputBox.value)) {
        showWarningElements("bill");
        return false;
    } else if (!customTipContainer.classList.contains("d-none") && !/^(\d*\.)?\d+$/.test(customTipInputBox.value)) {
        showWarningElements("custom tip");
        return false;
    }
    else {
        alertBox.classList.add("d-none");
        return true;
    }
}

function showWarningElements(warningName: string) {
    alertBox.classList.remove("d-none"); //bootstrap class to hide/show element
    alertBox.innerText = "You must enter a numerical " + warningName + " amount";
    tipAmountLabel.innerText = "Tip Amount: $ ---";
    billTotalLabel.innerText = "Total Bill: $ ---";
}

function toggleCustomTipInput() {
    if (tipSelector.options[tipSelector.selectedIndex].text === "Custom") {
        customTipContainer.classList.remove("d-none");
    } else {
        customTipContainer.classList.add("d-none");
    }
}


var billInputBox = document.getElementById('billInput') as HTMLInputElement;
var tipSelector = document.getElementById('tipSelector') as HTMLSelectElement;
var tipAmountLabel = document.getElementById('tipAmount');
var billTotalLabel = document.getElementById('billTotal');
var customTipInputBox = document.getElementById('customTipInput') as HTMLInputElement;
var customTipContainer = document.getElementById('customTipContainer');
var alertBox = document.getElementById('alertBox');

billInputBox.addEventListener('input', updateAmounts);
tipSelector.addEventListener('change', toggleCustomTipInput);
tipSelector.addEventListener('change', updateAmounts);
customTipInputBox.addEventListener('input', updateAmounts);

