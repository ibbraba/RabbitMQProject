import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [storedValue, setStoredValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setStoredValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (storedValue === null) {
      setStoredValue(inputValue);
    } else if (operation) {
      const result = calculate(storedValue, inputValue, operation);
      setStoredValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    if (operation && storedValue !== null) {
      const inputValue = parseFloat(display);
      const result = calculate(storedValue, inputValue, operation);
      setDisplay(String(result));
      setStoredValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      
      <div className="buttons">
        <button className="function" onClick={clearAll}>C</button>
        
        <button className="digit" onClick={() => inputDigit(7)}>7</button>
        <button className="digit" onClick={() => inputDigit(8)}>8</button>
        <button className="digit" onClick={() => inputDigit(9)}>9</button>
        <button className="operator" onClick={() => performOperation('/')}>/</button>
        
        <button className="digit" onClick={() => inputDigit(4)}>4</button>
        <button className="digit" onClick={() => inputDigit(5)}>5</button>
        <button className="digit" onClick={() => inputDigit(6)}>6</button>
        <button className="operator" onClick={() => performOperation('*')}>x</button>
        
        <button className="digit" onClick={() => inputDigit(1)}>1</button>
        <button className="digit" onClick={() => inputDigit(2)}>2</button>
        <button className="digit" onClick={() => inputDigit(3)}>3</button>
        <button className="operator" onClick={() => performOperation('-')}>-</button>
        
        <button className="digit" onClick={() => inputDigit(0)}>0</button>
        <button className="function" onClick={inputDot}>.</button>
        <button className="operator" onClick={handleEquals}>=</button>
        <button className="operator" onClick={() => performOperation('+')}>+</button>
      </div>
    </div>
  );
};

export default Calculator;