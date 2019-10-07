import React from 'react'
import {connect} from 'react-redux'

class Stamps extends React.Component{
    state = {
        mailCount: 0
    }

    componentDidMount = () => {
        let mailCount = 0
        this.props.tree.forEach(el => {
            if (el.rel_delivery === "mail"){
                mailCount = 1 + mailCount
            }
        })
        this.setState({
            mailCount: mailCount
        })
    }

    noStamps = () => {
        this.props.history.push('/cart')
    }

    yesStamps = () => {
        this.props.history.push('/cart')
    }

    render(){
        return(
            <div className="Stamps">
                <h1>We noticed you have {this.state.mailCount} cards set to be delivered by mail. Would you like to add {this.state.mailCount} stamps to your cart for ${this.state.mailCount * 0.48}? They never expire and can go to any state.</h1>
                <h2>You can edit your stamps in checkout.</h2>
                <button onClick={this.noStamps}>Yes, please!</button> {/* IMPORTANT: this needs to add the right quantity of stamps to their cart. It must also NOT pull up the cart. Then it will send them to the cart page. */}
                <button onClick={this.yesStamps}>No, thank you</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {tree} = reduxState
    return {tree}
}

export default connect(mapStateToProps)(Stamps)