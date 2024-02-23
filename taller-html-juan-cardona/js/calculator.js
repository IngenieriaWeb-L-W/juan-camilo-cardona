let operation = "";
let partialResult = -1;
let hasErrorOperators = false;
let hasDoublePoint = false;
const operationsList = [];

// Immediately Invoked Function Expression for the page's loader
((d, w) => {
  //Simple loader (Without 'Under construction')

  w.addEventListener("load", () => {
    let savedOperations = JSON.parse(localStorage.getItem("historyItems"));
    if (!savedOperations || !(savedOperations instanceof Array)) {
      localStorage.setItem("historyItems", "[]");
      savedOperations = [];
    }
    if (savedOperations.length > 0) {
      operationsList.push(...savedOperations);
    }
    if (operationsList.length > 0) {
      operationsList.forEach((historyItem) => {
        appendHistoryItem(historyItem);
      });
      document
        .querySelector(".history-empty__container")
        .classList.add("hidden");
      document.querySelector(".clean-history__btn").classList.remove("hidden");
    } else {
      document
        .querySelector(".history-empty__container")
        .classList.remove("hidden");
      document.querySelector(".clean-history__btn").classList.add("hidden");
    }
  });
})(document, window);

const appendHistoryItem = (historyItem) => {
  const { operation, result } = historyItem;
  operationsList.push({ operation, result });
  const $li = document.createElement("li");
  localStorage.setItem("historyItems", JSON.stringify(operationsList));
  console.log({ APPENDING: historyItem });
  history - items;
  document.querySelector(".clean-history__btn").classList.add("hidden");

  document.querySelectorAll(".history-items > li").forEach((element) => {
    element.remove();
  });
  localStorage.setItem("historyItems", "[]");
  operationsList.length = 0;
};

const handleKeyPressed = (key) => {
  const partialOperation = `${operation}${key}`;
  if (partialOperation.includes("..")) {
    hasDoublePoint = true;
    document.getElementById("error-alert__title").textContent = "Error";
    document.getElementById("error-alert__message").textContent =
      "No puedes tener dos puntos seguidos";
    return;
  } else {
    hasDoublePoint = false;
  }

  operation += key;
  document.getElementById("current-operation").value = operation;
};

const handleOperationPressed = (key) => {
  if (key === "=") {
    return calculateResult();
  }
  const partialOperation = `${operation.trim()} ${key}`;
  if (startsWithOperator(partialOperation)) {
    document.getElementById("error-alert__title").textContent = "Error";
    document.getElementById("error-alert__message").textContent =
      "No puedes iniciar con un operador";
    console.log("SIIII");
    console.log({ key });
    return;
  } else {
    console.log("NOOO");
    document.getElementById("error-alert__title").textContent = "";
    document.getElementById("error-alert__message").textContent = "";
  }

  if (hasInvalidOperators(partialOperation)) {
    document.getElementById("error-alert__title").textContent = "Error";
    document.getElementById("error-alert__message").textContent =
      "No puede haber dos operadores seguidos";
    hasErrorOperators = true;
    return;
  }

  operation += ` ${key} `;

  document.getElementById("current-operation").value = operation;
};

const calculateResult = () => {
  try {
    const result = eval(operation);
    document.getElementById("result").value = result;
    appendHistoryItem({ operation, result });
  } catch (error) {}
};

const hasInvalidOperators = (partialOperation) => {
  // ++, --, **, //, 1+*, 1+/, 1-*, 1-/, 1**1, 1//1
  console.log({ partialOperation });
  const operators = ["+", "-", "*", "/"];
  for (let i = 0; i < operators.length; i++) {
    for (let j = 0; j < operators.length; j++) {
      const combination = `${operators[i]} ${operators[j]}`;
      const reverseCombination = `${operators[j]} ${operators[i]}`;
      if (
        partialOperation.includes(combination) ||
        partialOperation.includes(reverseCombination)
      ) {
        return true;
      }
    }
  }
  return false;
};

const startsWithOperator = (partialOperation) => {
  const firstChar = partialOperation.trim()[0];
  console.log({ firstChar });
  return (
    firstChar === "+" ||
    firstChar === "-" ||
    firstChar === "*" ||
    firstChar === "/"
  );
};

const handleClearInput = () => {
  operation = "";
  partialResult = -1;
  hasErrorOperators = false;

  hasDoublePoint = false;
  document.getElementById("current-operation").value = "";
  document.getElementById("result").value = "";
};

const handleRemoveOperations = () => {
  document
    .querySelector(".history-empty__container")
    .classList.remove("hidden");
  document.querySelector(".clean-history__btn").classList.add("hidden");

  document.querySelectorAll(".history-items > li").forEach((element) => {
    element.remove();
  });
  localStorage.setItem("historyItems", "[]");
  operationsList.length = 0;
};
