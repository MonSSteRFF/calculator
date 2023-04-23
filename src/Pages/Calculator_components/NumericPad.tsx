import React from 'react';

import styles from './NumericPad.module.scss';

interface NumericPad_props {
  inputChangeHandler: (str: string, add: boolean) => void;
}

const NumericPad: React.FC<NumericPad_props> = (props) => {
  const { inputChangeHandler } = props;

  const buttons = [
    ['CA', 'CH', '(', ')'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '/'],
    ['0', '.', 'Enter', '*'],
  ];

  return (
    <div className={styles.pad}>
      {buttons.map((row, row_index) => (
        <div className={styles.pad_row} key={row_index}>
          {row.map((btn, btn_index) => (
            <div
              className={styles.pad_btn + `${btn === 'Enter' ? ` ${styles.enter}` : ''}`}
              key={btn_index}
              onClick={() => inputChangeHandler(btn, true)}
            >
              {btn}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NumericPad;
