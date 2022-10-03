import React, { Component } from 'react';

import HeaderApp from '../header-app';
import MainApp from '../main-app/main-app';

import './app.css';

export default class App extends Component {
  maxId = 100;

  constructor(props) {
    super(props);

    this.state = {
      statusItem: [this.createTodoItem('Task1'), this.createTodoItem('Task2'), this.createTodoItem('Task3')],
      filter: 'all',
    };
  }

  onFilterChange = (filter) => {
    this.setState({
      filter,
    });
  };

  onToggleEditing = (id) => {
    this.toggleProperty(id, 'editing');
  };

  onToggleCompleted = (id) => {
    this.toggleProperty(id, 'completed');
  };

  addItem = (text, minutes, seconds) => {
    const newItem = this.createTodoItem(text, minutes, seconds);
    this.setState(({ statusItem }) => {
      const newArr = [...statusItem, newItem];
      return {
        statusItem: newArr,
      };
    });
  };

  editingItem = (id, text) => {
    this.setState(({ statusItem }) => {
      const newArr = statusItem.map((el, i) => {
        if (el.id === id) {
          el.text = text;
          el.editing = !statusItem[i].editing;
        }
        return el;
      });
      return {
        statusItem: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ statusItem }) => ({
      statusItem: statusItem.filter((item) => item.id !== id),
    }));
  };

  toggleProperty = (id, propName) => {
    this.setState(({ statusItem }) => {
      const newArr = statusItem.map((el, i) => {
        if (el.id === id) {
          el[propName] = !statusItem[i][propName];
        }
        return el;
      });
      return {
        statusItem: newArr,
      };
    });
  };

  filterItems = (items, filter) => {
    switch (filter) {
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

  clearCompleted = () => {
    this.setState(({ statusItem }) => ({
      statusItem: statusItem.filter((el) => !el.completed),
    }));
  };

  createTodoItem(text, minutes, seconds) {
    return {
      text,
      minutes,
      seconds,
      active: true,
      completed: false,
      editing: false,
      id: this.maxId++,
    };
  }

  render() {
    const leftItem = this.state.statusItem.filter((el) => !el.completed).length;
    const { statusItem, filter } = this.state;
    const visibleItems = this.filterItems(statusItem, filter);

    return (
      <section className="todoapp">
        <HeaderApp addItem={this.addItem} />{' '}
        <MainApp
          status={visibleItems}
          onDeleted={this.deleteItem}
          onToggleCompleted={this.onToggleCompleted}
          onToggleEditing={this.onToggleEditing}
          editingItem={this.editingItem}
          leftItem={leftItem}
          clearCompleted={this.clearCompleted}
          filter={filter}
          onFilterChange={this.onFilterChange}
        />{' '}
      </section>
    );
  }
}
