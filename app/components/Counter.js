// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Counter.css';

class Counter extends Component {
  static propTypes = {
    increment: PropTypes.func.isRequired,
  };

  render() {
    const { increment } = this.props;
    return (
      <div>
        <div className={styles.backButton}>
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className={styles.container}>
          <img src="./images/kitten.jpg" className={styles.image} />
          <button className={styles.btn} onClick={increment}>
            Process
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
