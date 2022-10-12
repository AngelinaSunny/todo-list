import PropTypes from 'prop-types';

import './header-app.css';
import NewTaskForm from '../new-task-form';

const HeaderApp = ({ addItem }) => {
  HeaderApp.defaultProps = {
    addItem: () => {},
  };
  HeaderApp.propTypes = {
    addItem: PropTypes.func,
  };

  return (
    <header className="header">
      <h1> todos </h1>
      <NewTaskForm addItem={addItem} />
    </header>
  );
};

export default HeaderApp;
