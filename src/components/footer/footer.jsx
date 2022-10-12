import PropTypes from 'prop-types';

import Filters from '../task-filter';

import './footer.css';

const Footer = ({ leftItem, clearCompleted, filter, onFilterChange }) => {
  const leftText = `${leftItem} items left`;

  Footer.defaultProps = {
    leftItem: 0,
    clearCompleted: () => console.log('функция очищения выполненных задач не передана'),
    filter: 'all',
    onFilterChange: () => console.log('функция  установки фильтра не передана'),
  };

  Footer.propTypes = {
    leftItem: PropTypes.number,
    clearCompleted: PropTypes.func,
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
  };

  return (
    <footer className="footer">
      <span className="todo-count"> {leftText} </span>
      <Filters clearCompleted={clearCompleted} filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" type="button" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
