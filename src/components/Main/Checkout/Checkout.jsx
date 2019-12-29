import React, {Component} from 'react'
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
/* global Snipcart:false */
// import Snipcart from 'https://cdn.snipcart.com/scripts/2.0/snipcart.js'

class Checkout extends Component {
    state = {
        confetti: true
    }
    goBackToCart = () => {
        this.props.history.push('/cart')
    }
    componentDidMount = () => {
        // Snipcart.subscribe('cart.closed', function() {
        //     console.log('it works!')
        //     window.location.replace('/#/cart/')
        // })
        Snipcart.subscribe('cart.closed', function(){
            window.location.replace('http://thecarddrop.com/#/checkout')
        })
        setTimeout(() => {
            this.setState({
                confetti: false
            })
        }, 5000)
    }

    stopConfetti = () => {
        this.setState({
            confetti: false
        })
    }
    componentDidUpdate = (prevProps) => {
        if (prevProps.location.pathname.includes('/cart!/orders')){
            console.log('you bought the cards!')
        }
        // console.log(this.props.location.pathname)
    }
    render(){
        return(
            <div className="checkout">
                {this.state.confetti ? 
                    <Confetti run={this.state.confetti}/>
                :
                    <></>
                }
                <h1>Thank you so much!</h1>
                <p>We've received your order and will begin to process it. Keep an eye on your email for the invoice. We will also email you when your Drop has shipped.</p>
                <br />
                <p>Your order means the world to us. Please spread the word and help others make connections worth keeping!</p>
                <br />
                <p>-<i>Zach and Jes</i></p>
            </div>
        )
    }
}

export default Checkout