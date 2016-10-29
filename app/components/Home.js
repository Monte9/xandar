// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Link to="/info"><h1>Xandar</h1></Link>
        <h3><Link to="/counter">Upload</Link> an image of a cat or a dog.</h3>
      </div>
    );
  }
}
