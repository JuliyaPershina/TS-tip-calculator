"use strict";
const elements = {
    bill: document.getElementById('bill'),
    tips: document.querySelectorAll('.tip'),
    customTip: document.getElementById('customTip'),
    numberOFPeople: document.getElementById('people'),
    tipAmount: document.getElementById('tip_amount'),
    total: document.getElementById('total'),
    form: document.querySelector('form'),
};
let selectPercent = 0;
elements.form.addEventListener('submit', function (e) {
    e.preventDefault();
});
function clearActiveTips() {
    elements.tips.forEach((tip) => tip.classList.remove('active'));
}
elements.tips.forEach((tip) => {
    tip.addEventListener('click', (e) => {
        e.preventDefault();
        clearActiveTips();
        elements.customTip.value = '';
        tip.classList.add('active');
        const text = tip.textContent;
        if (text !== null) {
            const percentText = text.replace('%', '');
            selectPercent = parseFloat(percentText);
            calculateAmount();
            if (percentText) {
                selectPercent = parseFloat(percentText);
            }
        }
        calculateAmount();
    });
});
elements.customTip.addEventListener('input', () => {
    clearActiveTips();
    const customValue = Number(elements.customTip.value);
    if (!isNaN(customValue) && customValue >= 0) {
        selectPercent = customValue;
        console.log(`Custom tip used: ${selectPercent}%`);
        if (elements.bill.value !== '' && elements.numberOFPeople.value !== '') {
            calculateAmount();
        }
    }
});
elements.numberOFPeople.addEventListener('input', () => {
    if (selectPercent !== 0 && elements.bill.value !== '') {
        calculateAmount();
    }
});
function calculateAmount() {
    const billValue = parseFloat(elements.bill.value);
    const numberOfPeopleValue = parseInt(elements.numberOFPeople.value);
    const params = {
        billValue,
        numberOfPeopleValue,
        selectPercent,
    };
    console.log('Bill:', params.billValue);
    console.log('People:', params.numberOfPeopleValue);
    console.log('Selected Tip %:', params.selectPercent);
    if (params.billValue < 1 ||
        params.numberOfPeopleValue < 1 ||
        isNaN(params.billValue) ||
        isNaN(params.numberOfPeopleValue)) {
        elements.tipAmount.textContent = '$0.00';
        elements.total.textContent = '$0.00';
        return;
    }
    const tipAmountValue = (params.billValue * params.selectPercent) / 100;
    const totalAmount = (params.billValue + tipAmountValue) / params.numberOfPeopleValue;
    elements.tipAmount.textContent = `&#36${(tipAmountValue / params.numberOfPeopleValue).toFixed(2)}`;
    elements.total.textContent = `&#36${totalAmount.toFixed(2)}`;
}
elements.form.addEventListener('reset', () => {
    clearActiveTips();
    selectPercent = 0;
    elements.bill.value = '';
    elements.numberOFPeople.value = '';
    elements.customTip.value = '';
    elements.tipAmount.textContent = '$0.00';
    elements.total.textContent = '$0.00';
});
//# sourceMappingURL=app.js.map