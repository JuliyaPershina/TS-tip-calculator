// Інтерфейс DOM-елементів
interface TipCalculatorElements {
  bill: HTMLInputElement;
  tips: NodeListOf<HTMLButtonElement>;
  customTip: HTMLInputElement;
  numberOFPeople: HTMLInputElement;
  tipAmount: HTMLParagraphElement;
  total: HTMLParagraphElement;
  form: HTMLFormElement;
}

// Інтерфейс параметрів для обчислення
interface CalculationParams {}

const elements: TipCalculatorElements = {
  bill: document.getElementById('bill') as HTMLInputElement,
  tips: document.querySelectorAll('.tip'),
  customTip: document.getElementById('customTip') as HTMLInputElement,
  numberOFPeople: document.getElementById('people') as HTMLInputElement,
  tipAmount: document.getElementById('tip_amount') as HTMLParagraphElement,
  total: document.getElementById('total') as HTMLParagraphElement,
  form: document.querySelector('form') as HTMLFormElement,
};

interface CalculationParams {
  billValue: number;
  numberOfPeopleValue: number;
  selectPercent: number;
}

let selectPercent: number = 0;

// Забороняє перезавантаження та клік по першій кнопці
elements.form.addEventListener('submit', function (e: SubmitEvent): void {
  e.preventDefault();
});

// Деактивувати кнопки вибору відсотків чайових
function clearActiveTips(): void {
  elements.tips.forEach((tip) => tip.classList.remove('active'));
}

// відсотки чайових
elements.tips.forEach((tip) => {
  tip.addEventListener('click', (e: MouseEvent): void => {
    e.preventDefault();
    clearActiveTips();
    elements.customTip.value = '';
    tip.classList.add('active');
    const text: string | null = tip.textContent;
    if (text !== null) {
      const percentText: string = text.replace('%', '');
      selectPercent = parseFloat(percentText);
      calculateAmount();
      if (percentText) {
        selectPercent = parseFloat(percentText);
      }
    }
    calculateAmount();
  });
});

// введений custom відсоток
elements.customTip.addEventListener('input', (): void => {
  clearActiveTips();

  const customValue: number = Number(elements.customTip.value);

  if (!isNaN(customValue) && customValue >= 0) {
    selectPercent = customValue;
    console.log(`Custom tip used: ${selectPercent}%`);

    if (elements.bill.value !== '' && elements.numberOFPeople.value !== '') {
      calculateAmount();
    }
  }
});

// кількість людей
elements.numberOFPeople.addEventListener('input', (): void => {
  if (selectPercent !== 0 && elements.bill.value !== '') {
    calculateAmount();
  }
});

//основна функція розрахунку

function calculateAmount(): void {
  const billValue: number = parseFloat(elements.bill.value);
  const numberOfPeopleValue: number = parseInt(elements.numberOFPeople.value);

  const params: CalculationParams = {
    billValue,
    numberOfPeopleValue,
    selectPercent,
  };

  console.log('Bill:', params.billValue);
  console.log('People:', params.numberOfPeopleValue);
  console.log('Selected Tip %:', params.selectPercent);

  if (
    params.billValue < 1 ||
    params.numberOfPeopleValue < 1 ||
    isNaN(params.billValue) ||
    isNaN(params.numberOfPeopleValue)
  ) {
    elements.tipAmount.textContent = '$0.00';
    elements.total.textContent = '$0.00';
    return;
  }

  const tipAmountValue: number =
    (params.billValue * params.selectPercent) / 100;
  const totalAmount: number =
    (params.billValue + tipAmountValue) / params.numberOfPeopleValue;

  elements.tipAmount.textContent = `$${(
    tipAmountValue / params.numberOfPeopleValue
  ).toFixed(2)}`;
  elements.total.textContent = `$${totalAmount.toFixed(2)}`;
}

// скидання форми
elements.form.addEventListener('reset', (): void => {
  clearActiveTips();
  selectPercent = 0;
  elements.bill.value = '';
  elements.numberOFPeople.value = '';
  elements.customTip.value = '';
  elements.tipAmount.textContent = '$0.00';
  elements.total.textContent = '$0.00';
});
