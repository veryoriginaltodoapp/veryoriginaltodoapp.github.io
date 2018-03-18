import React, { Component } from 'react';
import Logo from './scripts/components/Logo';
import DisplayBoards from './scripts/components/DisplayBoards';
import DisplayLists from './scripts/components/DisplayLists';
import ClearLocalStorage from './scripts/components/ClearLocalStorage';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        <ClearLocalStorage />
        <Logo />
        {this.props.display === 'BOARDS' ? 
          <DisplayBoards /> : 
          <DisplayLists />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    display: state.displaying
  };
}

App = connect(mapStateToProps)(App);

export default App;
