import React, { Component } from 'react';
import Clarifai from 'clarifai';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    
    // inside of our state object, we set our API keys in order to get data from the APIs
    this.state = {
      clarifaiKey: 'b152ab226db545d7ae11f33a8756cda5',
      mashapeKey: '8T7epZZomNmshvkB0xHh8YgIgUhnp1mbZ8RjsnqijKFCpgCBCc',
    }
  }

  componentDidMount() {

    /* Use Clarifai to grab image details */
    this.getImageDetails().then((imageDetails) => {

      /* Find all the terms inside image details */
      console.log('Image details from Clarifai', imageDetails);

      /* After, querying for words associated with an image, query those top 5 terms for songs */
      this.getMusicTerms();
    });
  }

  getImageDetails() {

      //images we are going to send to the api to get terms for
      var images = [
        'http://miriadna.com/desctopwalls/images/max/Wet-sand.jpg'
      ];

      //instantiate a new Clarifai app passing in your api key.
      const app = new Clarifai.App({ apiKey: this.state.clarifaiKey});

      // predict the contents of an image by passing in a url
      return new Promise((res,rej) => {
        app.models.predict(Clarifai.GENERAL_MODEL, images)
        .then((response) => {
            res(response);
        })
        .catch(err => rej(err));
      });
  }

  getMusicTerms() {
    //using the image terms, make a query
    var query = 'food';
    
      axios({
        method: 'get',
        url: 'https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/track.search?f_has_lyrics=1&page=1&page_size=5&q_track='+ query +'&s_track_rating=desc',
        headers: {
          'X-Mashape-Key' : `${this.state.mashapeKey}`,
          'accept' : 'application/json'
        }
      }).then((res) => {
        console.log('Terms from Music Match API', res);
      }).catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Image to Music Converter</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
export default App;
