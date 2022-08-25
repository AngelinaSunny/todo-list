import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';

import './task-list.css';

const TaskList = ({ status, onDeleted, onToggleCompleted, onToggleEditing, editingItem }) => {
  TaskList.defaultProperty = {
    status: [],
  };

  TaskList.defaultProps = {
    onDeleted: () => {},
    onToggleCompleted: () => {},
    onToggleEditing: () => {},
    editingItem: () => {},
  };
  TaskList.propTypes = {
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onToggleEditing: PropTypes.func,
    editingItem: PropTypes.func,
  };

  const items = status.map((item) => (
    <Task
      key={item.id}
      {...item}
      onDeleted={() => onDeleted(item.id)}
      onToggleCompleted={() => onToggleCompleted(item.id)}
      onToggleEditing={() => onToggleEditing(item.id)}
      editingItem={editingItem}
    />
  ));

  return <ul className="todo-list"> {items} </ul>;
};

export default TaskList;
