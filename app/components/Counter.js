import { remote } from 'electron';

import React, { Component } from 'react';
import { Link } from 'react-router';
import Clarifai from 'clarifai';
import _ from 'lodash';

import styles from './Counter.css';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: './images/kitten.jpg',
      tagText: 'No tags yet',
      message: 'No image uploaded yet!'
    };

    Clarifai.initialize({
      'clientId': 'lOqUBsqjuy0OAhFFDViEMgrmYS9Ryb2dn1p10E1r',
      'clientSecret': '1yTeax8Esj0FWs29Gj9YGXcN6IqUs_Dt_Wj8Gehu'
    });
    console.log(Clarifai);
    this.openDialog = this.openDialog.bind(this);
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

    Clarifai.getTagsByImageBytes(this.base64_encode(path[0])).then(
    (res) => {
      const zipped = _.zip(res.results[0].result.tag.classes, res.results[0].result.tag.probs);

      let message = '';
      const isDog = this.checkIfDog(zipped);
      const isCat = this.checkIfCat(zipped);

      if(isCat) {
        message = "It's a Cat!";
      } else if (isDog) {
        message = "It's a Dog!";
      } else {
        message = `You can't trick me! It's neither a cat or a dog.. infact my best guess is it's a ${res.results[0].result.tag.classes[0]}`;
      }

      this.setState({
        tagText: res.results[0].result.tag.classes.toString(),
        isCat,
        isDog,
        message,
        keyTag: res.results[0].result.tag.classes[0],
      });
    },
    (error)=>{
      console.log(error);
    });
  }

  // function to encode file data to base64 encoded string
  base64_encode(file) {
    const fs = require('fs');
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
  }

  checkIfCat(array) {
    let count = 0;
    let totalScore = 0;
    let avgScore = 0;

    _.map(array, function(pair) {
      const first = pair[0];
      const second = pair[1];

      if (_.includes(['cat', 'kitten'], first)) {
        totalScore += second;
        count += 1;
      }
    });

    avgScore = (totalScore / count);
    return avgScore > 0.95;
  }

  checkIfDog(array) {
    let count = 0;
    let totalScore = 0;
    let avgScore = 0;

    _.map(array, function(pair) {
      const first = pair[0];
      const second = pair[1];

      if (_.includes(['dog', 'canine', 'puppy'], first)) {
        totalScore += second;
        count += 1;
      }
    });
    avgScore = (totalScore / count);
    return avgScore > 0.95;
  }

  tagText() {
    return <div className={styles.tagtext}><p>{this.state.message}</p></div>
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
        {this.tagText()}
      </div>
    );
  }
}

export default Counter;
