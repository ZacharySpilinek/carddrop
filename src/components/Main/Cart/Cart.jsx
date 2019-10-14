import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem/CartItem'
import {deleteAllStamps, getStamps, deleteStamp, addStamps, addStamp} from '../../../ducks/reducer'
import axios from 'axios'

class Cart extends Component {
    state = {
        totalPriceBox: 0,
        editStamps: false
    }

    previous = () => {
        this.props.history.push(`/cards/${this.props.tree[this.props.tree.length - 1].tree_rel_id}`)
    }

    componentDidMount = () => {
        let total = 0
        this.props.selected_cards.forEach(el => {
            total = el.price + total
        })
        total = total / 100
        this.setState({
            totalPriceBox: total
        })
        // if (this.props.stamps === 0 && prevProps.location.pathname !== '/stamps') {
        //     this.props.getStamps()
        // }
        this.props.getStamps()
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.selected_cards !== this.props.selected_cards) {
            this.mappedCart()
        }
        if (this.props.selected_cards.length !== 0 && this.props.selected_cards.length !== prevProps.selected_cards.length){
            let total = 0
            this.props.selected_cards.forEach(el => {
                total = el.price + total
            })
            total = total / 100
            this.setState({
                totalPriceBox: total
            })
        }
        if (this.props.stamps === 0 && prevProps.location.pathname !== '/stamps') {
            this.props.getStamps()
        }
    }

    checkoutPage = () => {
        this.props.history.push('/checkout')
    }

    mappedCart = () => {
        if (this.props.selected_cards.length >= 1 && this.props.tree.length >= 1){
            let mapArr = []
            this.props.selected_cards.forEach((el, i) => {
                mapArr.push({
                    ...el,
                    rel_name: this.props.tree[i].rel_name,
                    rel_relationship: this.props.tree[i].rel_relationship,
                    rel_delivery: this.props.tree[i].rel_delivery
                })
            })

            return mapArr.map(el => {
                return (
                    <CartItem
                        key={el.tree_rel_id}
                        rel_name={el.rel_name}
                        rel_delivery={el.rel_delivery}
                        img_out={el.img_out}
                        price={el.price}
                        card_id={el.card_id}
                        relationship={el.rel_relationship}
                        tree_rel_id={el.tree_rel_id}
                    />
                )
            })
        }
    }

    getAllOrders = async() => {
        await axios.get('/api/snipcart/allorders').then(res => 
            console.log(res.data))
    }

    editStamps = () => {
        this.setState({
            editStamps: !this.state.editStamps
        })
    }

    saveStamps = async () => {
        await this.props.addStamps(this.props.stamps)
        this.editStamps()
    }

    minusStamp = async () => {
        await this.props.deleteStamp()
    }

    addStamp = async () => {
        await this.props.addStamp()
    }

    render(){
        return(
            <div className="cart">
                <h2>Your Cart</h2>
                {this.mappedCart()}
                <button onClick={() => this.previous()}>Previous</button>
                {/* <button onClick={() => this.checkoutPage()}>Checkout</button> */}
                {/* <button onClick={this.testRequest}>Crazy Test Button</button> */}
                <div className="total">
                    <div className="stamps-section">
                        {!this.state.editStamps ?  
                        <>
                            <p>Stamps:</p>
                            <p>{this.props.stamps} ($0.55/ea)</p>
                            <button onClick={this.editStamps}>Edit</button>
                        </>
                        :
                        <>
                            <p>Stamps: </p>
                            <p onClick={this.minusStamp}>-</p>
                            <p>{this.props.stamps}</p>
                            <p onClick={this.addStamp}>+</p>
                            <button onClick={this.saveStamps}>Save</button>
                        </>
                        }
                    </div>
                    <p>Subtotal: ${this.state.totalPriceBox + ((this.props.stamps * 55) / 100)}</p>
                </div>
                <div className="checkout-buttons">
                    <button 
                        className="snipcart-add-item checkout-yearly-subscription"
                        data-item-name={`CardDrop Yearly Drop (${this.props.selected_cards.length} Cards + ${this.props.stamps} Stamps)`}
                        data-item-id={`carddrop-yearly-drop-${this.props.selected_cards.length}c-${this.props.stamps}s-${this.props.cust_id}`}
                        data-item-url={`https://thecarddrop.com/api/checkout/yearly-drop/${this.state.totalPriceBox}/${this.props.selected_cards.length}/${this.props.stamps}/${this.props.cust_id}`}
                        data-item-price={`${this.state.totalPriceBox + ((this.props.stamps * 55) / 100)}`}
                        data-item-payment-interval="Year"
                        >
                        Checkout (Yearly Subscription)
                    </button>
                    <button 
                        className="snipcart-add-item checkout-one-box"
                        data-item-name={`CardDrop Yearly Drop (${this.props.selected_cards.length} Cards + ${this.props.stamps} Stamps)`}
                        data-item-id={`carddrop-yearly-drop-${this.props.selected_cards.length}c-${this.props.stamps}s-${this.props.cust_id}`}
                        data-item-url={`https://thecarddrop.com/api/checkout/yearly-drop/${this.state.totalPriceBox}/${this.props.selected_cards.length}/${this.props.stamps}/${this.props.cust_id}`}
                        data-item-price={`${this.state.totalPriceBox + ((this.props.stamps * 55) / 100)}`}
                        data-item-payment-interval="Year"
                        >
                        Checkout (Just One Box)
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {tree, selected_cards, cust_id, stamps} = reduxState
    return {tree, selected_cards, cust_id, stamps}
}

export default connect(mapStateToProps, {deleteAllStamps, getStamps, deleteStamp, addStamps, addStamp})(Cart)