const expect = require('chai').expect;
const Calculator = require('../index');

describe('Calculator', () => {
  var calc;

  before(() => {
    calc = new Calculator();
  });

  it('пустой аргумент - ожидаем 0', () => {
    expect(calc.add()).to.equal(0);
  });
  it('1 - ожидаем 1', () => {
    expect(calc.add('1')).to.equal(1);
  });
  it('1,2 - ожидаем 3', () => {
    expect(calc.add('1,2')).to.equal(3);
  });
  it('1,2,3 - ожидаем 6', () => {
    expect(calc.add('1, 2, 3')).to.equal(6);
  });
  it('1\\n2,3 - ожидаем 6', () => {
    expect(calc.add('1\n2,3')).to.equal(6);
  });
  it('1,\\n - ожидаем ошибку', () => {
    expect(function () {calc.add('1,\n')}).to.throw('bad separator');
  });
  it('//<;>\\n1;2 - ожидаем 3', () => {
    expect(calc.add('//<;>\n1;2')).to.equal(3);
  });
  it('//<;>\\n-1;2 - ожидаем ошибку "Отрицательные числа недопустимы. -1"', () => {
    expect(function () {calc.add('//<;>\n-1;2')}).to.throw('Отрицательные числа недопустимы. -1');
  });
  it('//<;>\\n-1;2;-3 - ожидаем ошибку "Отрицательные числа недопустимы. -1 -3"', () => {
    expect(function () {calc.add('//<;>\n-1;2;-3')}).to.throw('Отрицательные числа недопустимы. -1 -3');
  });
  it('разделитель длины 3', () => {
    expect(calc.add('//<***>\n1***2***3')).to.equal(6);
  });
  it('игнорирование чисел более 1000', () => {
    expect(calc.add('//<***%>\n2***%1001')).to.equal(2);
  });


})
