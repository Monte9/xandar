import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Info.css';

export default class Info extends Component {
  render() {
    return (
      <div>
        <div className={styles.backButton}>
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className={styles.container}>
          <h1>Xandar</h1>
          <h3>Xandar is an experimental project built using electron
          + react + redux + webpack + clarifai API.</h3>
          <h4>Developed by Monte Thakkar</h4>
        </div>
      </div>
    );
  }
}
