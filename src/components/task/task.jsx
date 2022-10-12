import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

const Task = ({
  text,
  minutes,
  seconds,
  completed,
  editing,
  id,
  editingItem,
  onDeleted,
  onToggleCompleted,
  onToggleEditing,
}) => {
  Task.defaultProps = {
    text: 'Enter your task',
    minutes: '2',
    seconds: '10',
    completed: false,
    editing: false,
    id: 999,
    editingItem: () => {},
    onDeleted: () => console.log('функция удаления не передана'),
    onToggleCompleted: () => console.log('функция выполнения задачи не передана'),
    onToggleEditing: () => console.log('функция редактирования задачи не передана'),
  };

  Task.propTypes = {
    text: PropTypes.string,
    minutes: PropTypes.string,
    seconds: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onToggleEditing: PropTypes.func,
    editingItem: PropTypes.func,
    id: PropTypes.number,
  };

  const [taskData, setTaskData] = useState({
    dateCreate: new Date(),
    currentTime: '',
  });
  const [textNew, setTextNew] = useState(text);
  const [min, setMin] = useState(minutes);
  const [sec, setSec] = useState(seconds);
  const [startTimer, setStartTimer] = useState(false);

  const textTime = `created ${taskData.currentTime} ago`;

  let itemClassName = null;

  if (completed) {
    itemClassName = 'completed';
  }
  if (editing) {
    itemClassName = 'editing';
  }

  useEffect(() => {
    setInterval(() => {
      const dateNow = taskData.dateCreate;
      const textTimeDistance = formatDistanceToNow(new Date(dateNow), { includeSeconds: true });
      setTaskData({
        ...taskData,
        currentTime: textTimeDistance,
      });
    }, 1000);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(textNew);
    editingItem(id, textNew);
  };

  useEffect(() => {
    let timer = setInterval(() => {
      if (startTimer) {
        if (sec > 0) {
          setSec((s) => s - 1);
        } else if (sec === 0 && min > 0) {
          setMin((m) => m - 1);
          setSec(59);
        } else if (sec === 0 && min === 0) {
          clearInterval(timer);
          setStartTimer(false);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [startTimer, sec, min]);

  const onWorkTimer = (e) => {
    if (e.target.name === 'start' && itemClassName !== 'completed') {
      setStartTimer(true);
    } else if (e.target.name === 'pause') {
      setStartTimer(false);
    } else if (e.target.name === 'check') {
      setStartTimer(false);
    }
  };

  return (
    <li className={itemClassName}>
      <div className="view">
        <input
          name="check"
          className="toggle"
          type="checkbox"
          checked={itemClassName === 'completed'}
          onChange={(e) => {
            onToggleCompleted();
            onWorkTimer(e);
          }}
        />
        <label>
          <span className="title"> {text} </span>
          <span className="description">
            <button className="icon icon-play" type="button" name="start" onClick={onWorkTimer} />
            <button className="icon icon-pause" type="button" name="pause" onClick={onWorkTimer} />
            <span className="text-time">
              {min}:{sec}
            </span>
          </span>
          <span className="description"> {textTime} </span>
        </label>{' '}
        <button className="icon icon-edit" type="button" onClick={onToggleEditing} />
        <button className="icon icon-destroy" type="button" onClick={onDeleted} />
      </div>{' '}
      {editing && (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="edit"
            defaultValue={text}
            onChange={(e) => {
              setTextNew(e.target.value);
            }}
          />
        </form>
      )}
    </li>
  );
};

export default Task;
