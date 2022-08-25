import React from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    addItem: () => {},
  };

  static propTypes = {
    addItem: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  onTextChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  onAddItem = (e) => {
    e.preventDefault();
    if (this.state.text.trim().length) {
      this.props.addItem(this.state.text);
    }
    this.setState({
      text: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onAddItem}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onTextChange}
          value={this.state.text}
        />{' '}
      </form>
    );
  }
}
