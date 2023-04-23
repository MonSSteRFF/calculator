import React, { useEffect, useState } from 'react';

import styles from './Calculator.module.scss';
import NumericPad from './Calculator_components/NumericPad';

const checkBtn = (key: string, str: string) => {
  if (
    str === '' ||
    !isNaN(Number(key)) ||
    ['/', '*', '-', '+', '(', ')', '.'].filter((op) => op === key).length > 0
  ) {
    if (key === '(') {
      return str + ')';
    }

    return str;
  }

  return str
    .split('')
    .splice(0, str.length - 1)
    .join('');
};

const Calculator = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [history, setHistory] = useState<Array<string>>([]);

  const inputChangeHandler = (str: string, add: boolean) => {
    const lastChar = str.split('')[str.length - 1] || '';

    if (str === 'Enter') {
      getResult();
      return false;
    }

    if (str === 'CA') {
      clearFields();
      return false;
    }
    if (str === 'CH') {
      clearHistory();
      return false;
    }

    setInput((prevState) => {
      const returnedValue = add ? prevState + str : checkBtn(lastChar, str);

      return returnedValue.replace(/[^-()\d/*+.]/g, '');
    });
  };

  const keyDownEventHandler = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter': {
        e.preventDefault();
        getResult();
        break;
      }
      case 'Delete': {
        e.preventDefault();
        clearFields();
        break;
      }
      case 'Backspace': {
        e.preventDefault();
        setInput((prevState) =>
          prevState
            .split('')
            .splice(0, prevState.length - 1)
            .join(''),
        );
        break;
      }
    }
  };

  const getResult = () => {
    try {
      const result = eval(input);
      if (result === Infinity) {
        return false;
      }
      setInput(result);
      setHistory((prevState) => [...prevState, `${input} = ${result}`]);
    } catch (e) {
      return false;
    }
  };

  const clearFields = () => {
    setInput('');
  };

  const clearHistory = () => {
    setHistory([]);
    clearFields();
  };

  useEffect(() => {
    try {
      const result = eval(input);
      setOutput(result === Infinity ? 'null' : result);
    } catch (e) {
      setOutput('null');
    }
    document.addEventListener('keydown', keyDownEventHandler);

    return () => document.removeEventListener('keydown', keyDownEventHandler);
  }, [input]);

  return (
    <div className={styles.flexHistory}>
      <div className={styles.calculator}>
        <h1 className={styles.calculator_title}>Calculator</h1>

        <label className={styles.label}>
          <input
            className={styles.label_input}
            type="text"
            value={input}
            onChange={(e) => inputChangeHandler(e.target.value, false)}
          />
          <span className={styles.label_output}>
            {output === 'null' ? 'null' : output === input ? '' : output && `= ${output}`}
          </span>
        </label>

        <NumericPad inputChangeHandler={inputChangeHandler} />
      </div>

      <div className={styles.history}>
        <h1>History</h1>
        {history.map((item, index) => (
          <p className={styles.history_item} key={index}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
