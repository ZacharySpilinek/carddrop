import React, {Component} from 'react'
import Hero from './Hero/Hero'
import {connect} from 'react-redux'

class Landing extends Component {

    next = () => {
        if (this.props.cust_id) {
            this.props.history.push('/tree')
        } else {
            this.props.history.push('/register')
        }
    }

    render(){
        return(
            <div className="Landing">
                <Hero />
                <h3>Signed by you. Not a machine.</h3>
                <p>Our cards are sent to you to sign because we believe personal connections aren't made by a robot. They're made when you pick up a pen and take the time to write a note to the ones you care about.</p>
                <button onClick={this.next}>Get Started</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {cust_id} = reduxState
    return {cust_id}
}

export default connect(mapStateToProps)(Landing)