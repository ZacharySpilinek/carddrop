import React, {Component} from 'react'
import {setUserId, getTree} from '../../../ducks/reducer'
import {connect} from 'react-redux'
import axios from 'axios'

class Register extends Component {
    state = {
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password2: '',
        showLogin: false,
        loading: false
    }

    componentDidMount = () => {
        if (this.props.location.pathname.includes('login') || this.props.location.pathname.includes('login-nav')){
            this.setState({
                showLogin: true
            })
        }
    }

    componentDidUpdate = () => {
        if (this.props.location.pathname.includes('login-nav') && !this.state.showLogin){
            this.setState({
                showLogin: true
            })
        } else if (this.props.location.pathname.includes('register') && !this.props.location.pathname.includes('login') && this.state.showLogin){
            this.setState({
                showLogin: false
            })
        }
    }

    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }

    register = async (e) => {
        e.preventDefault()
        let {email, password, first_name, last_name} = this.state
        if (!email.includes('@') || password.length < 6 || this.state.password2 < 6) return
        let newUser = {email, password, first_name, last_name}
        if (this.state.password !== this.state.password2) return alert("Passwords don't match.")
        this.setState({
            loading: true
        })
        let returnNewUser = await axios.post('/auth/register', newUser)
        this.setState({
            loading: false
        })
        if (!returnNewUser.data.cust_id) return alert(returnNewUser.data.message)
        this.props.setUserId(returnNewUser.data)
        this.props.history.push('/tree')
    }

    login = async (e) => {
        e.preventDefault()
        let {email, password} = this.state
        this.setState({
            loading: true
        })
        let res = await axios.post('/auth/login', {email, password})
        this.setState({
            loading: false
        })
        if (!res.data.cust_id) return alert(res.data.message)
        await this.props.setUserId(res.data)
        await this.props.getTree(res.data.cust_id)
        this.props.history.push('/tree')
    }

    toggleLogin = () => {
        this.setState(prevState => ({
            showLogin: !prevState.showLogin
        }))
    }

    goToLogin = () => {
        this.props.history.push('/register/login-nav')
    }

    goToSignup = () => {
        this.props.history.push('/register')
    }

    render(){
        return(
            <>
            {this.state.loading ? 
                <div className="loading">
                    <i className="loading-icon fas fa-spinner"></i>
                </div>
                :
                <></>
            }
            <div className="register">
                {!this.state.showLogin ? 
                    <div>
                        <h2>Signup To Start Your Tree!</h2>
                        <p>Building your tree is totally free</p>
                            <form>
                                <input onChange={e => this.handleChange(e, 'email')} placeholder="Email" type="email"/>
                                <input onChange={e => this.handleChange(e, 'first_name')} placeholder="First Name"/>
                                <input onChange={e => this.handleChange(e, 'last_name')} placeholder="Last Name"/>
                                <input onChange={e => this.handleChange(e, 'password')} minLength="6" placeholder="Create a password" type="password"/>
                                <input onChange={e => this.handleChange(e, 'password2')} minLength="6" placeholder="Re-type your password" type="password"/>
                                <button onClick={this.register}>Register</button>
                            </form>
                    </div>
                    :
                    <div>
                        <h2>Welcome back! Sign in here.</h2>
                            <form>
                                <input onChange={e => this.handleChange(e, 'email')} placeholder="Email" type="text"/>
                                <input onChange={e => this.handleChange(e, 'password')} placeholder="Password" type="password"/>
                                <button onClick={e => this.login(e)}>Login</button>
                            </form>
                    </div>}
                {!this.state.showLogin ? 
                    <span onClick={this.goToLogin}>Or, sign in instead</span>
                :
                    <span onClick={this.goToSignup}>Or, sign up here</span>}
            </div>
            </>
        )
    }
}

export default connect(null, {setUserId, getTree})(Register)