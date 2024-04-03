import { elements } from "./views/interfaceHtml";

class Controller {
  // O setupAll irá inicializar todos os setups automaticamente
  constructor() {
    this.setupAll();
  }

  displayString = ""; // o displayString é o que é mostrado no display
  flagOperation = ""; // flag para o sistema identificar o tipo de operação
  memory = 0; // variável para guardar os valores

  // função para mostrar os digitos e operações através de uma validação
  displayDigits(digit) {
    this.clearResultDisplay();
    if (this.validation(this.displayString, digit)) {
      if (this.displayString == "0" && digit != "0") {
        this.displayString = "";
        console.log("1");
      }
      // if (this.flagOperation != "") {
      //   if(this.displayString.includes('.')) return
      //   this.displayString = "";
      //   console.log("2");
      // }
      this.displayString += digit;
      elements.display.innerHTML = this.displayString;
    }
  }

  // validação para não mostrar zeros desnecessários e número máximo de caracteres
  validation(displayString, digit) {
    let validated = true;
    if (displayString.length >= 10) return (validated = false);
    if (
      (displayString == "0" && displayString + digit == "00") ||
      (displayString == "." && displayString + digit == "..")
    )
      return (validated = false);
    if (
      String(displayString).includes(".") &&
      digit == "." &&
      this.flagOperation == ""
    )
      return (validated = false);
    console.log(validated);
    return validated;
  }

  // inicializar os digitos
  setupDigits(element) {
    const id = element.id;
    const setDigit = () => {
      if (!this.flagOperation == "" && this.displayString.length > 1) {
        this.clearDisplay();
      }
      this.displayDigits(id);
    };
    element.addEventListener("click", () => setDigit());
  }

  setupAllNumberDigits() {
    for (let i = 0; i < 10; i++) {
      this.setupDigits(elements[i]);
    }
  }

  // limpar tela e apaguar memória
  clearDisplay() {
    this.displayString = "";
    elements.display.innerHTML = "";
    this.clearResultDisplay();
  }

  clearResultDisplay() {
    elements.resultDisplay.innerHTML = "";
  }

  // inicializar botão de limpeza
  setupClearButton() {
    elements.clr.addEventListener("click", () => this.clearDisplay());
  }

  // inicializar botões de operação
  setupOperationsButton() {
    elements.add.addEventListener("click", () => this.operation("add"));
    elements.minus.addEventListener("click", () => this.operation("minus"));
    elements.multiplication.addEventListener("click", () =>
      this.operation("multiplication")
    );
    elements.division.addEventListener("click", () =>
      this.operation("division")
    );
    elements.point.addEventListener("click", () => this.displayDigits("."));
  }

  setupEqualButton() {
    elements.equal.addEventListener("click", () =>
      this.equal(this.displayString, this.memory, this.flagOperation)
    );
  }

  operation(flag) {
    if(elements.resultDisplay.innerHTML) {
      console.log(elements.resultDisplay.innerHTML)
      this.registerInMemory(elements.resultDisplay.innerHTML);
    } else {
      this.registerInMemory(this.displayString);
    }
    console.log(this.memory)
    this.clearDisplay();
    switch (flag) {
      case "add":
        this.flagOperation = "add";
        console.log("add");
        break;
      case "minus":
        this.flagOperation = "minus";
        console.log("minus");
        break;
      case "multiplication":
        this.flagOperation = "multiplication";
        console.log("multiplication");
        break;
      case "division":
        this.flagOperation = "division";
        console.log("division");
        break;

      default:
        break;
    }
  }

  registerInMemory(displayDigits) {
    this.memory = parseFloat(displayDigits);
  }

  equal(displayString, memory, typeOfOperation) {
    console.log(displayString)
    console.log(memory)
    console.log(typeOfOperation)
    console.log("equal");
    let result = 0;
    switch (typeOfOperation) {
      case "add":
        result = parseFloat(memory) + parseFloat(displayString);
        break;
      case "minus":
        result = parseFloat(memory) - parseFloat(displayString);
        break;
      case "multiplication":
        result = parseFloat(memory) * parseFloat(displayString);
        break;
      case "division":
        result = parseFloat(memory) / parseFloat(displayString);
        break;

      default:
        break;
    }
    this.registerInMemory(this.displayString)
    this.clearDisplay();
    elements.resultDisplay.innerHTML = result;
    this.flagOperation = "";
    return result;
  }

  setupAll() {
    this.setupClearButton();
    this.setupAllNumberDigits();
    this.setupOperationsButton();
    this.setupEqualButton();
  }
}

export { Controller };
