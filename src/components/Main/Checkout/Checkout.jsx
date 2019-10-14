import React, {Component} from 'react'
/* global Snipcart:false */
// import Snipcart from 'https://cdn.snipcart.com/scripts/2.0/snipcart.js'

class Checkout extends Component {
    goBackToCart = () => {
        this.props.history.push('/cart')
    }
    componentDidMount = () => {
        // Snipcart.subscribe('cart.closed', function() {
        //     console.log('it works!')
        //     window.location.replace('/#/cart/')
        // })
        Snipcart.subscribe('cart.closed', function(){
            window.location.replace('http://localhost:3000/#/checkout')
        })
    }
    // componentDidUpdate = (prevProps) => {
    //     if (!prevProps.location.pathname.includes('/cart!/orders')){
    //         this.props.history.push('/cart')
    //     }
    //     console.log(this.props.location.pathname)
    // }
    render(){
        return(
            <div className="Checkout">
                <h1>Thank you so much!</h1>
                <p>We've received your order and will begin to process it. Keep an eye on your email for the invoice. We will also email you when your Drop has shipped.</p>
                <p>Your order means the world to us. Please spread the word and help others make connections worth keeping!</p>
                <p>-Zach and Jes</p>
            </div>
        )
    }
}

export default Checkout