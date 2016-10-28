// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Counter.css';

class Counter extends Component {
  static propTypes = {
    increment: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired
  };

  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return (
      <div>
        <div className={styles.backButton}>
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className={`image ${styles.counter}`}>
          <img src="./images/kitten.jpg" width="500" height="500" />
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn} onClick={increment}>
            Process
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
