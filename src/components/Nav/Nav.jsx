import React, {Component} from 'react'
import axios from 'axios'
import {setUserId, clearState, getTree, getSelectedCards} from '../../ducks/reducer'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Logo from '../../assets/CardDrop-Logo1-625px.png'

class Nav extends Component {
    state = {
        email: '',
        password: '',
        showLogin: false
    }

/*     componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyPress)
    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyPress)
    }
 */
    handleKeyPress = (e) => {
        if (e.keyCode === 13){
            // alert('Enter was pressed')
            this.login()
        }
    }

    login = async () => {
        const {email, password} = this.state
        let res = await axios.post('/auth/login', {email, password})
        if (!res.data.cust_id) return alert(res.data.message)
        await this.props.setUserId(res.data)
        await this.props.getTree(res.data.cust_id)
        await this.props.getSelectedCards(res.data.cust_id)
    }

    logout = async () => {
        this.props.history.push('/')
        this.setState({
            showLogin: false
        })
        await axios.post('/auth/logout')
        this.props.clearState()
    }

    userProfile = () => {
        this.props.history.push('/profile')
    }

    home = () => {
        this.props.history.push('/')
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
                    <img alt="Card Drop Company Logo. A box of envelopes against orange. The words 'Card Drop' in black to the right." src={Logo}/>
                    <button onClick={this.home}>Home</button>
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
                        <><button onClick={this.logout}>Logout</button> <button onClick={this.userProfile}>My Profile</button></> :
                        <>
                        <button onClick={this.toggleLogin}>Login</button>
                            {this.state.showLogin ?
                                <div>
                                    <input autoFocus onChange={e => this.handleChange(e, 'email')} type="text" placeholder="Email"/>
                                    <input onChange={e => this.handleChange(e, 'password')} onKeyDown={(e) => this.handleKeyPress(e)} type="password" placeholder="Password"/>
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

export default connect(mapStateToProps, {setUserId, clearState, getTree, getSelectedCards})(withRouter(Nav))