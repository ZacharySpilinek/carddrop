import React, {Component} from 'react'
import axios from 'axios'
import {setUserId} from '../../ducks/reducer'
import {connect} from 'react-redux'

class Nav extends Component {
    state = {
        email: '',
        password: '',
        // password2: '',
        showLogin: false
    }

    componentDidMount = () => {
        console.log(this.props)
        if (this.props.cust_id && this.props.email){
            console.log('it works!')
        }
    }

    login = async () => {
        const {email, password} = this.state
        let res = await axios.post('/auth/login', {email, password})
        if (!res.data.cust_id) return alert(res.data.message)
        this.props.setUserId(res.data)
    }

    toggleLogin = () => {
        this.setState(prevState => ({
            showLogin: !prevState.showLogin
        }))
    }

    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }

    render(){
        return(
            <>
                <nav>
                    <h3>Logo</h3>
                    <button onClick={this.toggleLogin}>Login</button>
                        {this.state.showLogin ?
                            <div>
                                <input onChange={e => this.handleChange(e, 'email')} type="text" placeholder="Email"/>
                                <input onChange={e => this.handleChange(e, 'password')} type="password" placeholder="Password"/>
                                <button onClick={this.login}>Login</button>
                            </div>
                         : 
                         <></>
                         }
                    <button>Logout</button>
                </nav>
            </>
        )
    }
}

const mapStateToProps = reduxState => {
    const {cust_id} = reduxState
    return {cust_id}
}

export default connect(mapStateToProps, {setUserId})(Nav)