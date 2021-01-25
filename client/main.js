import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Switch, Router, Route} from 'react-router-dom'
import history from './history'
import store from './store.js'
// import '../public/stylesheet.css';
import {
  Home,
  AccessPoll,
  CreatePoll,
  ChartVisualization,
  VoteForm,
  ConfirmPage,
  Nav
} from './components/index'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Nav />
      <Switch>
        <Route path="/access" component={AccessPoll} />
        <Route path="/create" component={CreatePoll} />
        <Route path="/visualpoll/:key" component={ChartVisualization} />
        <Route path="/vote/:key" component={VoteForm} />
        <Route path="/confirm/:key" component={ConfirmPage} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
)
// make sure this is the same as the id of the div in your index.html
