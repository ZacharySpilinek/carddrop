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
        showLogin: false,
        dropdownClass: 'dropdown hide'
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
        this.setState({
            dropdownClass: 'dropdown hide'
        })
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

    dropDownTrigger = () => {
        if (this.state.dropdownClass.includes('hide')){
            this.setState({
                dropdownClass: 'dropdown'
            })
        } else {
            this.setState({
                dropdownClass: 'dropdown hide'
            })
        }
    }

    mobileLogin = () => {
        this.setState({
            dropdownClass: 'dropdown hide'
        })
        this.props.history.push('/register/login')
    }

    render(){
        return(
            <>
            <header>
                <img onClick={this.home} alt="Card Drop Company Logo. A box of envelopes against orange. The words 'Card Drop' in black to the right." src={Logo}/>
                <nav>
                    <i onClick={this.dropDownTrigger} className="fas fa-bars fa-2x"></i>
                    <div className="menu">
                        <button onClick={this.home}>Home</button>
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
                    </div>
                </nav>
                <div id="dropdown" className={this.state.dropdownClass}>
                    <div className="container">
                        <h2 onClick={this.dropDownTrigger}>X</h2>
                        <h1 onClick={() => this.home()}>Home</h1>
                        <h1 onClick={() => this.mobileLogin()}>Login</h1>
                        <h1>Profile</h1>
                        <h1>Tree Builder</h1>
                        <h1>Card Selector</h1>
                        <h1>Cart</h1>
                    </div>
                </div>
            </header>
            </>
        )
    }
}

const mapStateToProps = reduxState => {
    const {cust_id} = reduxState
    return {cust_id}
}

export default connect(mapStateToProps, {setUserId, clearState, getTree, getSelectedCards})(withRouter(Nav))