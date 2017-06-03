let value = 0;
let negatives = new Array();

class Calculator {
  constructor () {

  }

  set(newValue) {
    value = newValue;
  }

  setNegative(value) {
    negatives.push(value);
  }

  clearNegative() {
    negatives = [];
  }

  getNegative() {
    return negatives;
  }

  get() {
    return value;
  }

  add (numbers) {
    this.clearNegative();
    let separator = this.getSeparator(numbers);
    numbers = this.validation(numbers);
    const nums = numbers
      .split(separator);

    for (let i = 0; i < nums.length; i++) {
      if (this.isNegative(nums[i])) {
        this.setNegative(nums[i]);
      }
    }

    if (this.getNegative().length != 0) {
       throw new Error('Отрицательные числа недопустимы. ' + this.getNegative().join(' '));
    }

    let sum = nums
      .map(this.toNumber)
      .reduce(this.sum, 0);

    this.set(sum);
    return this.get();

  }

  isNegative(value) {
    if (value.indexOf('-') != -1) {
      return true;
    }
    return false;
  }

  validation(input) {
    const regExp = /\/\/<.*>\n(.*)/;
    if (regExp.test(input)) {
      return input.replace(regExp, '$1');
    }
    return input || '0';
  }

  getSeparator (input) {
    const regExp = /\/\/<(.*)>\n.*/;
    if (regExp.test(input)) {
      return input.replace(regExp, '$1');
    }
    return /[\n,]/;
  }

  toNumber(string) {
    const number = parseInt(string);
    if (isNaN(number)) {
       throw new Error('bad separator');
    }
    if (number > 1000) {
      return 0;
    }
    return number;
  }

  sum(x, y) {
    return x + y;
  }
}

module.exports = Calculator;
