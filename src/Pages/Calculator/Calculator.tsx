import React, { useRef, useState } from 'react';

import { getCounting } from './Calculator.module';
import styles from './Calculator.module.scss';
import { I_fieldState } from './Calculator.types';
import NumericPad from './NumericPad';

const Calculator: React.FC = () => {
  const [field, setField] = useState<I_fieldState>({ input: '', output: null });
  const [history, setHistory] = useState<Array<string>>([]);

  const inputChangeHandler = (value: string) => {
    const { result, str } = getCounting(value);

    setField({ input: str, output: result });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const getEquals = () => {
    const { str, result } = getCounting(field.input);

    if (result === null || result === 'Infinity' || result === 'NaN') {
      return;
    }

    const eq = `${str} = ${result}`;
    setHistory((prevState) => [...prevState, eq]);
    setField({ input: result, output: null });
  };

  const clearAll = () => {
    setHistory([]);
    setField({ input: '', output: null });
  };

  const padClickHandler = (key: string) => {
    switch (key) {
      case 'CA': {
        clearAll();
        break;
      }
      case 'CH': {
        setHistory([]);
        break;
      }
      case '=': {
        getEquals();
        break;
      }
      case 'sqrt': {
        setField((prevState) => {
          console.log(`type: `, typeof prevState.input);

          const result = getCounting(prevState.input).result;

          let returnedValue = '';

          if (result === null) {
            returnedValue = String(Math.sqrt(Number(prevState.input)));
          }
          if (returnedValue === '') {
            returnedValue = String(Math.sqrt(Number(result)));
          }

          return { input: returnedValue, output: returnedValue };
        });
        break;
      }
      default: {
        if (
          !isNaN(Number(key)) ||
          ['/', '*', '-', '+', '.', '(', ')'].filter((i) => i === key).length > 0
        ) {
          inputChangeHandler(field.input + key);
        }
      }
    }
  };

  const inputKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === '=') {
      padClickHandler('=');
    }
  };

  return (
    <div className={styles.flexHistory}>
      <div className={styles.calculator}>
        <h1 className={styles.calculator_title}>Calculator</h1>

        <label className={styles.label}>
          <input
            ref={inputRef}
            className={styles.label_input}
            type="text"
            value={field.input}
            onChange={(e) => inputChangeHandler(e.target.value)}
            onKeyDown={inputKeyDownHandler}
          />
          <span className={styles.label_output}>
            {field.input.length < 2
              ? ''
              : field.output === null
              ? 'wrong expression'
              : `= ${field.output}`}
          </span>
        </label>

        <NumericPad padClickHandler={padClickHandler} />
      </div>

      <div className={styles.history}>
        <h1 className={styles.history_title}>History</h1>
        <button className={styles.history_clear} onClick={() => padClickHandler('CH')}>
          clear history
        </button>
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
