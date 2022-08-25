import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

export default class Task extends Component {
  static defaultProps = {
    updateInterval: 1000,
    text: 'Enter your task',
    completed: false,
    editing: false,
    id: 999,
    editingItem: () => {},
    onDeleted: () => console.log('функция удаления не передана'),
    onToggleCompleted: () => console.log('функция выполнения задачи не передана'),
    onToggleEditing: () => console.log('функция редактирования задачи не передана'),
  };

  static propTypes = {
    text: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onToggleEditing: PropTypes.func,
    editingItem: PropTypes.func,
    id: PropTypes.number,
    updateInterval: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      textNew: this.props.text,
      dateCreate: new Date(),
      currentTime: '',
    };
  }

  componentDidMount() {
    const { updateInterval } = this.props;
    this.timeUpdate = setInterval(() => {
      const dateNow = this.state.dateCreate;
      const textTimeDistance = formatDistanceToNow(new Date(dateNow), { includeSeconds: true });
      this.setState({
        currentTime: textTimeDistance,
      });
    }, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.timeUpdate);
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editingItem(this.props.id, this.state.textNew);
  };

  render() {
    const { text, completed, editing, onDeleted, onToggleCompleted, onToggleEditing } = this.props;
    const textTime = `created ${this.state.currentTime} ago`;

    let itemClassName = null;

    if (completed) {
      itemClassName = 'completed';
    }
    if (editing) {
      itemClassName = 'editing';
    }

    return (
      <li className={itemClassName}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleCompleted} />
          <label>
            <span className="description"> {text} </span> <span className="created"> {textTime} </span>{' '}
          </label>{' '}
          <button className="icon icon-edit" type="button" onClick={onToggleEditing} />{' '}
          <button className="icon icon-destroy" type="button" onClick={onDeleted} />
        </div>{' '}
        {editing && (
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              className="edit"
              defaultValue={text}
              onChange={(e) => {
                this.setState({
                  textNew: e.target.value,
                });
              }}
            />{' '}
          </form>
        )}
      </li>
    );
  }
}
