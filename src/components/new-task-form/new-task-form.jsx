import { useState } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

const NewTaskForm = ({ addItem }) => {
  NewTaskForm.defaultProps = {
    addItem: () => {},
  };

  NewTaskForm.propTypes = {
    addItem: PropTypes.func,
  };
  const defaultData = {
    text: '',
    minutes: '',
    seconds: '',
  };
  const [data, setData] = useState(defaultData);

  const onHandleChange = (e) => {
    if (e.target.name === 'seconds' && e.target.value >= 60) {
      e.target.value = '';
    }
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onAddItem = () => {
    const { text, minutes, seconds } = data;

    if (text.trim().length && minutes.trim().length && seconds.trim().length) {
      addItem(text, minutes, seconds);
      setData(defaultData);
    }
  };

  return (
    <form className="new-todo-form">
      <input
        className="new-todo"
        name="text"
        type="text"
        placeholder="Task"
        onChange={onHandleChange}
        value={data.text}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onAddItem();
          }
        }}
      />
      <input
        className="new-todo-form__timer"
        name="minutes"
        type="number"
        maxLength={3}
        placeholder="Min"
        onChange={onHandleChange}
        value={data.minutes}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onAddItem();
          }
        }}
      />
      <input
        className="new-todo-form__timer"
        name="seconds"
        type="number"
        maxLength={2}
        placeholder="Sec"
        onChange={onHandleChange}
        value={data.seconds}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onAddItem();
          }
        }}
      />
    </form>
  );
};

export default NewTaskForm;
