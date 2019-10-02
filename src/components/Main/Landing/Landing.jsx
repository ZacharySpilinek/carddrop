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
                This is Landing.
                <button onClick={this.next}>Get Started</button>
                <Hero />
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {cust_id} = reduxState
    return {cust_id}
}

export default connect(mapStateToProps)(Landing)