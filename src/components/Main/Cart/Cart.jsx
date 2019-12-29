import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem/CartItem'
import {deleteAllStamps, getStamps, deleteStamp, addStamps, addStamp} from '../../../ducks/reducer'
import axios from 'axios'
// /* global Snipcart:false */

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
            if (el.bought !== true) {
                total = el.price + total
            }
        })
        total = total / 100
        this.setState({
            totalPriceBox: total
        })
        // if (this.props.stamps === 0 && prevProps.location.pathname !== '/stamps') {
        //     this.props.getStamps()
        // }
        this.props.getStamps()
        // Snipcart.subscribe('order.completed', function(){
        //     console.log('it did the thing')
        //     window.location.replace('http://localhost:3000/#/checkout')
        // })
    }

    componentDidUpdate = (prevProps) => {
        // console.log(this.props.selected_cards)
        if (prevProps.selected_cards !== this.props.selected_cards) {
            this.mappedCart()
        }
        if (this.props.selected_cards.length !== 0 && this.props.selected_cards.length !== prevProps.selected_cards.length){
            let total = 0
            this.props.selected_cards.forEach(el => {
                if (el.bought !== true) {
                    total = el.price + total
                }
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
                if (el.bought !== true) {
                    mapArr.push({
                        ...el,
                        rel_name: this.props.tree[i].rel_name,
                        rel_relationship: this.props.tree[i].rel_relationship,
                        rel_delivery: this.props.tree[i].rel_delivery
                    })
                }
            })

            if (mapArr.length !== 0) {
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
            } else {
                return "No Cards Selected!"
            }
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
        console.log(this.props.stamps)
        return(
            <div className="cart">
                {this.props.selectedCardLoading === true ?
                <div className="loading">
                    <i className="loading-icon fas fa-spinner"></i>
                </div>
                : 
                <>
                <h2>Your Cart</h2>
                <button className="back-to-cards" onClick={() => this.previous()}>{'< Back To Cards'}</button>

                <hr />
                {this.mappedCart()}
                {/* <button onClick={() => this.checkoutPage()}>Checkout</button> */}
                {/* <button onClick={this.testRequest}>Crazy Test Button</button> */}
                <div className="stamps-section">
                    {!this.state.editStamps ?  
                    <div className="stamps-section-stamps">
                        <p>Stamps:</p>
                        <p>{this.props.stamps} <span>($0.55/ea)</span></p>
                        <button onClick={this.editStamps}>Edit</button>
                    </div>
                    :
                    <div className="stamps-section-stamps-expanded">
                        <p>Stamps: </p>
                        <button onClick={this.minusStamp}>-</button>
                        <p>{this.props.stamps}</p>
                        <button onClick={this.addStamp}>+</button>
                        <button className="stamp-save" onClick={this.saveStamps}>Save</button>
                    </div>
                    }
                </div>
                <hr />
                <div className="total">
                    <p>Subtotal: ${((this.state.totalPriceBox * 100) + (this.props.stamps * 55)) / 100}</p>
                </div>
                <div className="checkout-buttons">
                    <button 
                        className="snipcart-add-item checkout-yearly-subscription"
                        data-item-name={`CardDrop Yearly Drop (${this.props.selected_cards.filter(el => el.bought !== true).length} Cards + ${this.props.stamps} Stamps)`}
                        data-item-id={`carddrop-yearly-drop-${this.props.selected_cards.filter(el => el.bought !== true).length}c-${this.props.stamps}s-${this.props.cust_id}`}
                        data-item-url={`https://thecarddrop.com/api/checkout/yearly-drop/${this.state.totalPriceBox}/${this.props.selected_cards.filter(el => el.bought !== true).length}/${this.props.stamps}/${this.props.cust_id}`}
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
                </>
                }
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {tree, selected_cards, cust_id, stamps, selectedCardLoading} = reduxState
    return {tree, selected_cards, cust_id, stamps, selectedCardLoading}
}

export default connect(mapStateToProps, {deleteAllStamps, getStamps, deleteStamp, addStamps, addStamp})(Cart)