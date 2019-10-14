import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav'
import {getUser, getTree, getSelectedCards} from './ducks/reducer'
import {connect} from 'react-redux'
import axios from 'axios'
import routes from './routes'
import {withRouter} from 'react-router-dom'
import './main.scss'

class App extends React.Component {

  componentDidMount = async () => {
    let res = await axios.get('/user')
    if (res.data.cust_id){
      this.props.getUser(res.data)
      this.props.getTree(res.data.cust_id)
      this.props.getSelectedCards(res.data.cust_id)
    } else if (this.props.location.pathname.includes('/tree') || this.props.location.pathname.includes('/cards') || this.props.location.pathname.includes('/cart') || this.props.location.pathname.includes('/checkout')) {
      this.props.history.push('/')
    }
    // console.log('app loaded')
  }

  componentDidUpdate = async (prevProps) => {
    // console.log(this.props.location.pathname)
    // console.log(this.props.cust_id)
    if (this.props.location.pathname !== prevProps.location.pathname && !this.props.cust_id) {
      let res = await axios.get('/user')
      if (res.data.cust_id){
        this.props.getUser(res.data)
        this.props.getTree(res.data.cust_id)
        this.props.getSelectedCards(res.data.cust_id)
      }
    }
  }

  render(){
    return (
      <div className="App">
        <Nav />
        <div className="app-container">
          {routes}
        </div>
        <p>Copyright ©CardDrop LLC, 2019</p>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const {cust_id} = reduxState
  return {cust_id}
}

export default connect(mapStateToProps, {getUser, getTree, getSelectedCards})(withRouter(App));
