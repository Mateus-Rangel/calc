const elements = {
  display: document.getElementById("display"),
  resultDisplay: document.getElementById("resultDisplay"),
  clr: document.getElementById("clr"),
  add: document.getElementById("add"),
  minus: document.getElementById("minus"),
  multiplication: document.getElementById("multiplication"),
  division: document.getElementById("division"),
  equal: document.getElementById("equal"),
  point: document.getElementById("point"),
};

for (let i = 0; i < 10; i++) {
  elements[i] = document.getElementById(i);
}

console.log(elements);

export { elements };