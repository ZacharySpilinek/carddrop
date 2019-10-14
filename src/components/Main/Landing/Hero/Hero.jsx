import React, {Component} from 'react'
import Hero1 from '../../../../assets/landing_envelope.jpg'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

class Hero extends Component {
    state = {
        heroImg: Hero1
    }

    next = () => {
        if (this.props.cust_id) {
            this.props.history.push('/tree')
        } else {
            this.props.history.push('/register')
        }
    }

    render(){
        return(
            <div id="Hero" className="Hero">
                <div className="hero1" style={{backgroundImage:`url(${this.state.heroImg})`}}>
                    <h2>Connections Worth Keeping</h2>
                    <button onClick={this.next}>Get Started</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {cust_id} = reduxState
    return {cust_id}
}

export default connect(mapStateToProps)(withRouter(Hero))