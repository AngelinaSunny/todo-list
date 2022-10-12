import { useState, useEffect } from 'react';

import HeaderApp from '../header-app';
import MainApp from '../main-app/main-app';

import './app.css';

const App = () => {
  const startData = [
    { text: 'Task1', minutes: '20', seconds: '10', active: true, completed: false, editing: false, id: 97 },
    { text: 'Task2', minutes: '15', seconds: '15', active: true, completed: false, editing: false, id: 98 },
    { text: 'Task3', minutes: '2', seconds: '30', active: true, completed: false, editing: false, id: 99 },
  ];
  const [maxId, setMaxId] = useState(100);
  const [filter, setFilter] = useState('all');
  const [isChange, setChange] = useState(false);
  const [statusItem, setStatusItem] = useState(startData);

  const createTodoItem = (text, minutes, seconds) => ({
    text,
    minutes,
    seconds,
    active: true,
    completed: false,
    editing: false,
    id: maxId,
  });

  useEffect(() => {
    if (isChange) {
      setMaxId((id) => id + 1);
      setChange(false);
    }
  }, [isChange]);

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
    setMaxId((id) => id + 1);
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
    setStatusItem((s) => s.filter((item) => item.id !== id));
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
    setStatusItem((s) => s.filter((el) => !el.completed));
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
