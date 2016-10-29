import { remote } from 'electron';

import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Counter.css';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: './images/kitten.jpg',
    };

    this.openDialog = this.openDialog.bind(this);
  }

  processImage() {
    console.log('Use claifai API and process image here');
  }

  openDialog() {
    const path = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
      properties:
        ['openFile', 'openDirectory'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }]
    });

    if (path[0]) {
      const imagePath = path[0];

      this.setState({
        imagePath,
      });
    }

    // const fs = require('fs');
    // fs.readFile(path[0], (err, data) => {
    //   if (err) throw err;
    //   console.log(data);
    // });
  }

  render() {
    return (
      <div>
        <div className={styles.backButton}>
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className={styles.container}>
          <img src={this.state.imagePath} className={styles.image} />
          <button className={styles.btn} onClick={this.openDialog}>
            Upload
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
