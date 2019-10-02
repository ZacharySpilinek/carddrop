import React, {Component} from 'react'
import axios from 'axios'
import {setUserId, clearState} from '../../ducks/reducer'
import {connect} from 'react-redux'

class Nav extends Component {
    state = {
        email: '',
        password: '',
        showLogin: false
    }

    login = async () => {
        const {email, password} = this.state
        let res = await axios.post('/auth/login', {email, password})
        if (!res.data.cust_id) return alert(res.data.message)
        this.props.setUserId(res.data)
    }

    logout = async () => {
        this.setState({
            showLogin: false
        })
        await axios.post('/auth/logout')
        this.props.clearState()
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
                    {/* {!this.props.cust_id ? 
                        <button onClick={this.toggleLogin}>Login</button>
                            this.state.showLogin ?
                                <div>
                                    <input onChange={e => this.handleChange(e, 'email')} type="text" placeholder="Email"/>
                                    <input onChange={e => this.handleChange(e, 'password')} type="password" placeholder="Password"/>
                                    <button onClick={this.login}>Login</button>
                                </div>
                            : 
                            <></>
                        : 
                        <button>Logout</button>
                        } */}
                    {this.props.cust_id ? 
                        <button onClick={this.logout}>Logout</button> :
                        <>
                        <button onClick={this.toggleLogin}>Login</button>
                            {this.state.showLogin ?
                                <div>
                                    <input onChange={e => this.handleChange(e, 'email')} type="text" placeholder="Email"/>
                                    <input onChange={e => this.handleChange(e, 'password')} type="password" placeholder="Password"/>
                                    <button onClick={this.login}>Login</button>
                                </div>
                                : <></>}
                        </>
                    }

                </nav>
            </>
        )
    }
}

const mapStateToProps = reduxState => {
    const {cust_id} = reduxState
    return {cust_id}
}

export default connect(mapStateToProps, {setUserId, clearState})(Nav)