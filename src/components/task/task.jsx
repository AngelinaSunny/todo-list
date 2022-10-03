import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

export default class Task extends Component {
  static defaultProps = {
    updateInterval: 1000,
    text: 'Enter your task',
    minutes: '25',
    seconds: '00',
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
    minutes: PropTypes.string,
    seconds: PropTypes.string,
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
      minutes: this.props.minutes,
      seconds: this.props.seconds,
      timer: null,
    };

    this.onWorkTimer = this.onWorkTimer.bind(this);
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

  onWorkTimer(e) {
    clearInterval(this.state.timer);
    // eslint-disable-next-line prefer-const
    let timer = setInterval(() => {
      const { seconds, minutes } = this.state;
      // eslint-disable-next-line prefer-const
      if (e.target.name === 'start') {
        const changeSeconds = seconds - 1;
        if (seconds === 0 && minutes === 0) {
          clearInterval(timer);
        } else if (seconds <= 0 && minutes > 0) {
          this.setState({
            seconds: 59,
            minutes: minutes - 1,
          });
        } else {
          this.setState({
            seconds: changeSeconds,
          });
        }
      } else if (e.target.name === 'pause') {
        clearInterval(timer);
      }
    }, 1000);
    return this.setState({
      timer,
    });
  }

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
          <input
            className="toggle"
            type="checkbox"
            checked={itemClassName === 'completed'}
            onChange={onToggleCompleted}
          />
          <label>
            <span className="title"> {text} </span>
            <span className="description">
              <button className="icon icon-play" type="button" name="start" onClick={this.onWorkTimer} />
              <button className="icon icon-pause" type="button" name="pause" onClick={this.onWorkTimer} />
              <span className="text-time">
                {this.state.minutes}:{this.state.seconds}
              </span>
            </span>
            <span className="description"> {textTime} </span>
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
