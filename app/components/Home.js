import { remote } from 'electron';

import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

export default class Home extends Component {
  openDialog() {
    console.log("Open file selector here");
  }

  //<h3><a onClick={this.openDialog}>Upload</a> an image of a cat or a dog.</h3>

  render() {
    return (
      <div className={styles.container}>
        <Link to="/info"><h1>Xandar</h1></Link>
        <h3>Upload an image of a cat or a dog.</h3>
        <h3><Link to="/counter">Let's go</Link></h3>
      </div>
    );
  }
}
