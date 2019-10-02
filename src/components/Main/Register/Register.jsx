import React, {Component} from 'react'
import {setUserId} from '../../../ducks/reducer'
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

    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }

    register = async () => {
        let {email, password, first_name, last_name} = this.state
        let newUser = {email, password, first_name, last_name}
        if (this.state.password !== this.state.password2) return alert("Passwords don't match.")
        this.setState({
            loading: true
        })
        let returnNewUser = await axios.post('/auth/register', newUser)
        this.setState({
            loading: false
        })
        console.log(returnNewUser.data)
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
        this.props.history.push('/tree')
    }

    toggleLogin = () => {
        this.setState(prevState => ({
            showLogin: !prevState.showLogin
        }))
    }

    render(){
        return(
            <div className="Register">
                {!this.state.showLogin ? 
                    <div>
                        <h2>Signup To Build Your Tree!</h2>
                            <form>
                                <input onChange={e => this.handleChange(e, 'email')} placeholder="email" type="text"/>
                                <input onChange={e => this.handleChange(e, 'first_name')} placeholder="First Name"/>
                                <input onChange={e => this.handleChange(e, 'last_name')} placeholder="Last Name"/>
                                <input onChange={e => this.handleChange(e, 'password')} placeholder="create a password" type="password"/>
                                <input onChange={e => this.handleChange(e, 'password2')} placeholder="re-type your password" type="password"/>
                                <button onClick={this.register}>Register</button>
                            </form>
                    </div>
                    :
                    <div>
                        <h2>Sign In</h2>
                            <form>
                                <input onChange={e => this.handleChange(e, 'email')} type="text"/>
                                <input onChange={e => this.handleChange(e, 'password')} type="password"/>
                                <button onClick={e => this.login(e)}>Login</button>
                            </form>
                    </div>}
                <button onClick={this.toggleLogin}>Toggle</button>
                {this.state.loading ? <h1>Loading</h1> : <></>}
            </div>
        )
    }
}

export default connect(null, {setUserId})(Register)