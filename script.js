const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0"; //kullanıcının butona bastığı zaman değişecek kısım burasıdır.
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

// display kısmını update edecek. display.value bilgisine displayValue atar.
function updateDisplay() {
  display.value = displayValue;
}

//butonlara tıklayınca gözükecek:

keys.addEventListener("click", function (e) {
  const element = e.target;
  const value = element.value;

  // ulaşmış olduğumuz elementin buton olup olmadığını kontrol ediyoruz matches ile:
  //eğer buton değilse, return deyip burdan sonraki kodları işletmemek demek. yani sadece butona tıkladığımızda bu eleemnti ekrana yazdırmış oluyoruz.
  if (!element.matches("button")) return;

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(value);
      break;
    case ".":
      inputDecimal();
      break;
    case "clear":
      clear();
      break;
    default:
      inputNumber(element.value);
  }
  updateDisplay();
});

function handleOperator(nextoperator) {
  const value = parseFloat(displayValue); //hesapmakinesine girilen değeri alalım.

  if (operator && waitingForSecondValue) {
    operator = nextoperator;
    return;
  }

  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);

    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstValue = result;
  }

  waitingForSecondValue = true;
  operator = nextoperator;
}

function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }

  return second;
}

function inputNumber(num) {
  if (waitingForSecondValue) {
    displayValue = num;
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num;
  }
}

function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}

function clear() {
  displayValue = "0";
}
