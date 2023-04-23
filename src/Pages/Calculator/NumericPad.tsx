import React from 'react';

import styles from './Calculator.module.scss';

interface NumericPad_props {
  padClickHandler: (key: string) => void;
}

const NumericPad: React.FC<NumericPad_props> = (props) => {
  const { padClickHandler } = props;

  const buttons = [
    ['CA', '√', '(', ')'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '/'],
    ['0', '.', '=', '*'],
  ];

  return (
    <div className={styles.pad}>
      {buttons.map((row, row_index) => (
        <div className={styles.pad_row} key={row_index}>
          {row.map((btn, btn_index) => (
            <div
              className={styles.pad_btn + `${btn === '=' ? ` ${styles.enter}` : ''}`}
              key={btn_index}
              onClick={() => padClickHandler(btn === '√' ? 'sqrt' : btn)}
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
