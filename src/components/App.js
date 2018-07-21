import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {withRouter} from 'react-router';
import Header from './common/Header';

import Level1 from './pages/Level1';
import Level2 from './pages/Level2';
import Level3 from './pages/Level3';

const Level1Page = withRouter(Level1);
const Level2Page = withRouter(Level2);
const Level3Page = withRouter(Level3);


class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Header/>
                <Route exact path="/level1" render={() => <Level1Page/>}/>
                <Route exact path="/level2" render={() => <Level2Page/>}/>
                <Route exact path="/level3" render={() => <Level3Page/>}/>
            </div>
        </Router>
    );
  }
}

export default App;
