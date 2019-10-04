import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav'
import {getUser, getTree, getSelectedCards} from './ducks/reducer'
import {connect} from 'react-redux'
import axios from 'axios'
import routes from './routes'
import {withRouter} from 'react-router-dom'

class App extends React.Component {

  componentDidMount = async () => {
    let res = await axios.get('/user')
    if (res.data.cust_id){
      await this.props.getUser(res.data)
      await this.props.getTree(res.data.cust_id)
      await this.props.getSelectedCards(res.data.cust_id)
    } else if (this.props.location.pathname !== '/') {
      this.props.history.push('/')
    }
  }

  render(){
    return (
      <div className="App">
        <Nav />
        {routes}
      </div>
    );
  }
}

export default connect(null, {getUser, getTree, getSelectedCards})(withRouter(App));
