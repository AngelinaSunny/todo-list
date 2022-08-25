import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './task-filter.css';

export default class Filters extends Component {
  static defaultProps = {
    filter: 'all',
    onFilterChange: () => {},
  };

  static propTypes = {
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
  };

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const activeClass = isActive ? 'selected' : null;
      return (
        <li key={name}>
          <button className={`${activeClass}`} type="button" onClick={() => onFilterChange(name)}>
            {' '}
            {label}{' '}
          </button>{' '}
        </li>
      );
    });

    return <ul className="filters"> {buttons} </ul>;
  }
}
