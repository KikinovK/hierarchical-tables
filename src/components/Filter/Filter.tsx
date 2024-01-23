import { ChangeEvent, FC, useState } from 'react';
import { Button, ButtonToolbar, Form, Toast } from 'react-bootstrap';

import { ChangeFilterFunction, field } from '../../type/type';
import ButtonFilter from '../ButtonFilter/ButtonFilter';

import styles from './style.module.css';

interface FilterProps {
  changeFilter: ChangeFilterFunction;
  fieldFilter: field;
  queryFilter: string;
}

const Filter: FC<FilterProps> = ({ changeFilter, fieldFilter, queryFilter }) => {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState(queryFilter || '');

  const handlerClickFilter = () => {
    setShow((prev) => !prev);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    setShow(false);
    if (inputValue) {
      changeFilter({
        fieldFilter,
        queryFilter: inputValue,
      })
    }
  };

  const handleReset = () => {
    setInputValue('');
    setShow(false);
    changeFilter({
      fieldFilter,
      queryFilter: '',
    })

  }

  return (
    <>
      <ButtonFilter onClickFilter={handlerClickFilter} />
      <div className={`${styles.filter__overlay} ${show ? 'd-block' : 'd-none'}`} onClick={() => setShow(false)} ></div>
      <Toast
        className={styles.filter__toast}
        onClose={() => setShow(false)}
        show={show}
      >
        <Toast.Header
          closeButton={false}
        >{`Search ${fieldFilter}`}</Toast.Header>
        <Toast.Body>
          <Form.Control
            type="text"
            size="sm"
            value={inputValue}
            onChange={handleInputChange} />
          <ButtonToolbar className="mt-2 gap-2">
            <Button  onClick={handleSubmit} variant="primary" size="sm">Search</Button>
            <Button onClick={handleReset} variant="secondary" size="sm">Reset</Button>
          </ButtonToolbar>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Filter;
