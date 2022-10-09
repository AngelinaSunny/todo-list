import React from 'react';
import PropTypes from 'prop-types';
import './task-filter.css';

const Filters = ({ filter, onFilterChange }) => {
  Filters.defaultProps = {
    filter: 'all',
    onFilterChange: () => {},
  };

  Filters.propTypes = {
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
  };

  const AllButtons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const buttons = AllButtons.map(({ name, label }) => {
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
};

export default Filters;
