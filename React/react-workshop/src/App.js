import React, { Component } from 'react';
import './stylus/styles.css';
import { Link } from 'react-router';
import Logbar from './components/logbar';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    console.log(this.props);
    const { dispatch, isAuthenticated, errorMessage } = this.props;
    return (
      <div className="App">
        <div className="App-intro">
          <Logbar
            isAuthenticated={isAuthenticated}
            errorMessage={errorMessage}
            dispatch={dispatch}
          />
          <Link to="/test">Test</Link> | 
          <Link to="/">Home Link</Link>
          { isAuthenticated &&
            <div>
              {this.props.children}
            </div>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  //const { quotes, auth } = state
  const { authentication } = state
  //const { quote, authenticated } = quotes
  const { isAuthenticated, errorMessage } = authentication

  return {
   // quote,
    //isSecretQuote: authenticated,
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App);
