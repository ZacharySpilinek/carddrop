import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav'
import {getUser} from './ducks/reducer'
import {connect} from 'react-redux'
import axios from 'axios'

class App extends React.Component {

  componentDidMount = async () => {
    let res = await axios.get('/user')
    if (res.data.cust_id){
      this.props.getUser(res.data)
    }
  }

  render(){
    return (
      <div className="App">
        <Nav />
      </div>
    );
  }
}

export default connect(null, {getUser})(App);
