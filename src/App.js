import React, { Component } from 'react';
import Logo from './scripts/components/Logo';
import DisplayBoards from './scripts/components/DisplayBoards';
import DisplayLists from './scripts/components/DisplayLists';
import ClearLocalStorage from './scripts/components/ClearLocalStorage';
import {connect} from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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

App = DragDropContext(HTML5Backend)(App);
App = connect(mapStateToProps)(App);

export default App;
