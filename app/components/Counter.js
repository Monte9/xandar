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
      tagText: "No tags yet",
    };

    Clarifai.initialize({
      'clientId': 'lOqUBsqjuy0OAhFFDViEMgrmYS9Ryb2dn1p10E1r',
      'clientSecret': '1yTeax8Esj0FWs29Gj9YGXcN6IqUs_Dt_Wj8Gehu'
    });

    console.log(Clarifai);

    this.openDialog = this.openDialog.bind(this);
  }

  processImage() {
    console.log('Use claifai API and process image here');
  }

  // function to encode file data to base64 encoded string
  base64_encode(file) {
    const fs = require('fs');

    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
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
    //
    // fs.readFile(path[0], (err, data) => {
    //   if (err) throw err;
    //   console.log(data);

      Clarifai.getTagsByImageBytes(this.base64_encode(path[0])).then(
      (res) => {
        const zipped = _.zip(res.results[0].result.tag.classes, res.results[0].result.tag.probs);
      //console.log(zipped);

        let isCat = false;
        let isDog = false;

        var c = _.map(zipped, function(pair) {
          var first = pair[0];
          var second = pair[1];

          console.log(_.includes(['cat', 'kitten'], first));

          isCat = _.includes(['cat', 'kitten'], first);

          isDog = _.includes(['dog', 'canine', 'puppy'], first);
        });

        this.setState({
          tagText: res.results[0].result.tag.classes.toString(),
          isCat,
          isDog,
          message: '',
        });
      },
      (error)=>{
        console.log(error);
      });
    // });
  }

  tagText() {
    return <div className={styles.tagtext}><p>{this.state.tagText}</p></div>
  }

  render() {
    console.log(this.state);

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
