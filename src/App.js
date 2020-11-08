import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js';

import HomePage from './components/homepage';
import MessageBoard from './components/messageboard';


class App extends Component {

render() {


  return (
    <Router>
      <div id="topLevel">

        <Route path="/" exact component={HomePage} />
        <Route path="/:id" component={MessageBoard} />
      </div>
    </Router>
  );
  
}
}




export default App;
