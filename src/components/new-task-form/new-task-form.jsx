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
      minutes: '',
      seconds: '',
    };
  }

  onHandleChange = (e) => {
    if (e.target.name === 'seconds' && e.target.value >= 60) {
      e.target.value = '';
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onAddItem = () => {
    const { text, minutes, seconds } = this.state;

    if (text.trim().length && minutes.trim().length && seconds.trim().length) {
      this.props.addItem(text, minutes, seconds);

      this.setState({
        text: '',
        minutes: '',
        seconds: '',
      });
    }
  };

  render() {
    return (
      <form className="new-todo-form">
        <input
          className="new-todo"
          name="text"
          type="text"
          placeholder="Task"
          onChange={this.onHandleChange}
          value={this.state.text}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              this.onAddItem();
            }
          }}
        />
        <input
          className="new-todo-form__timer"
          name="minutes"
          type="number"
          maxLength={3}
          placeholder="Min"
          onChange={this.onHandleChange}
          value={this.state.minutes}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              this.onAddItem();
            }
          }}
        />
        <input
          className="new-todo-form__timer"
          name="seconds"
          type="number"
          maxLength={2}
          placeholder="Sec"
          onChange={this.onHandleChange}
          value={this.state.seconds}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              this.onAddItem();
            }
          }}
        />
      </form>
    );
  }
}
