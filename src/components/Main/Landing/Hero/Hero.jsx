import React, {Component} from 'react'
import Hero1 from '../../../../assets/landing_envelope.jpg'
import {withRouter} from 'react-router-dom'

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
        console.log(new Date())
        return(
            <div id="Hero" className="Hero">
                <div className="hero1" style={{backgroundImage:`url(${this.state.heroImg})`}}>
                    <button onClick={this.next}>Get Started</button>
                </div>
            </div>
        )
    }
}

export default withRouter(Hero)