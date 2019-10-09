import React, {Component} from 'react'

class Checkout extends Component {

    render(){
        return(
            <div className="Checkout">
                This is Checkout.
                <button
                    class="snipcart-add-item"
                    data-item-id="2"
                    data-item-name="Bacon"
                    data-item-price="3.00"
                    data-item-weight="20"
                    data-item-url="http://myapp.com/products/bacon"
                    data-item-description="Some fresh bacon">
                    Buy bacon
                </button>
            </div>
        )
    }
}

export default Checkout