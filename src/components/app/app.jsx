import React, { useState } from 'react';

import HeaderApp from '../header-app';
import MainApp from '../main-app/main-app';

import './app.css';

const App = () => {
  let maxId = 100;
  const createTodoItem = (text, minutes, seconds) => ({
    text,
    minutes,
    seconds,
    active: true,
    completed: false,
    editing: false,
    id: maxId++,
  });

  const [filter, setFilter] = useState('all');
  const [statusItem, setStatusItem] = useState([
    createTodoItem('Task1', '20', '10'),
    createTodoItem('Task2', '5', '25'),
    createTodoItem('Task3', '2', '20'),
  ]);

  const onFilterChange = (fil) => {
    setFilter(fil);
  };

  const toggleProperty = (id, propName) => {
    setStatusItem((s) => {
      const newArr = s.map((el, i) => {
        if (el.id === id) {
          el[propName] = !s[i][propName];
        }
        return el;
      });
      return newArr;
    });
  };

  const onToggleEditing = (id) => {
    toggleProperty(id, 'editing');
  };

  const onToggleCompleted = (id) => {
    toggleProperty(id, 'completed');
  };

  const addItem = (text, minutes, seconds) => {
    const newItem = createTodoItem(text, minutes, seconds);
    setStatusItem((s) => [...s, newItem]);
  };

  const editingItem = (id, text) => {
    setStatusItem((s) => {
      const newArr = s.map((el, i) => {
        if (el.id === id) {
          el.text = text;
          el.editing = !s[i].editing;
        }
        return el;
      });
      return newArr;
    });
  };

  const deleteItem = (id) => {
    setStatusItem((s) => {
      s.filter((item) => item.id !== id);
    });
  };

  const filterItems = (items, fil) => {
    switch (fil) {
      case 'all':
        return items;
      case 'active':
        return items.filter((el) => !el.completed);
      case 'completed':
        return items.filter((el) => el.completed);
      default:
        return items;
    }
  };

  const clearCompleted = () => {
    setStatusItem((s) => {
      s.filter((el) => !el.completed);
    });
  };

  const leftItem = statusItem.filter((el) => !el.completed).length;
  const visibleItems = filterItems(statusItem, filter);

  return (
    <section className="todoapp">
      <HeaderApp addItem={addItem} />{' '}
      <MainApp
        status={visibleItems}
        onDeleted={deleteItem}
        onToggleCompleted={onToggleCompleted}
        onToggleEditing={onToggleEditing}
        editingItem={editingItem}
        leftItem={leftItem}
        clearCompleted={clearCompleted}
        filter={filter}
        onFilterChange={onFilterChange}
      />{' '}
    </section>
  );
};

export default App;
