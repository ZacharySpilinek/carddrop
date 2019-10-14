import React from 'react'
/* global Snipcart:false */


class SnipcartCheckout extends React.Component {
    componentDidMount = () => {
        // Snipcart.subscribe('cart.closed', function(){
        //     window.location.redirect = ('http://localhost:3000/#/cart')
        // })
        // Snipcart.subscribe('order.completed', function() {
        //     console.log('order completed')
        //     window.location.replace('http://localhost:3000/#/checkout')
        // })
    }
    componentDidUpdate = (prevProps) => {
        if (this.props.location.pathname === '/cart!/' && !prevProps.location.pathname.includes('orders')){
            this.props.history.push('/cart')
        } else if (prevProps.location.pathname.includes('orders')){
            this.props.history.push('/checkout')
        }
    }
    render() {
        return(
            <></>
        )
    }
}

export default SnipcartCheckout