import React from 'react';
import PropTypes from 'prop-types';

import TaskList from '../task-list';
import Footer from '../footer';

import './main-app.css';

const MainApp = ({
  status,
  onDeleted,
  onToggleCompleted,
  onToggleEditing,
  editingItem,
  leftItem,
  clearCompleted,
  filter,
  onFilterChange,
}) => {
  MainApp.defaultProps = {
    onDeleted: () => {},
    onToggleCompleted: () => {},
    onToggleEditing: () => {},
    editingItem: () => {},
    leftItem: 0,
    clearCompleted: () => {},
    filter: 'all',
    onFilterChange: () => {},
  };
  MainApp.propTypes = {
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onToggleEditing: PropTypes.func,
    editingItem: PropTypes.func,
    leftItem: PropTypes.number,
    clearCompleted: PropTypes.func,
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
  };
  return (
    <section className="main">
      <TaskList
        status={status}
        onDeleted={onDeleted}
        onToggleCompleted={onToggleCompleted}
        onToggleEditing={onToggleEditing}
        editingItem={editingItem}
      />
      <Footer leftItem={leftItem} clearCompleted={clearCompleted} filter={filter} onFilterChange={onFilterChange} />{' '}
    </section>
  );
};

export default MainApp;
