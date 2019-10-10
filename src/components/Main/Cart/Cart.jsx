import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem/CartItem'
import {deleteAllStamps} from '../../../ducks/reducer'

class Cart extends Component {
    state = {
        totalPriceBox: 0
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
    }

    checkoutPage = () => {
        this.props.history.push('/checkout')
    }

    mappedCart = () => {
        if (this.props.selected_cards){
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

    render(){
        return(
            <div className="cart">
                <h2>Your Cart</h2>
                <h2>{this.state.totalPriceBox}</h2>
                {this.mappedCart()}
                <button onClick={() => this.previous()}>Previous</button>
                {/* <button onClick={() => this.checkoutPage()}>Checkout</button> */}
                <button 
                    className="snipcart-add-item"
                    data-item-name={`CardDrop Yearly Drop (${this.props.selected_cards.length} Cards + ${this.props.stamps} Stamps)`}
                    data-item-id={`carddrop-yearly-drop-${this.props.selected_cards.length}c-${this.props.stamps}s`}
                    data-item-url={`https://thecarddrop.com/api/checkout/yearly-drop/${this.state.totalPriceBox}/${this.props.selected_cards.length}/${this.props.stamps}`}
                    data-item-price={`${this.state.totalPriceBox + ((this.props.stamps * 55) / 100)}`}
                    data-item-payment-interval="Year"
                    >
                    Checkout Yearly Subscription
                </button>
                <p>Stamps: {this.props.stamps}</p>
                <button onClick={() => this.props.history.push('/stamps')}>Add Stamps</button>
                <button onClick={this.props.deleteAllStamps}>Delete All Stamps</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {tree, selected_cards, cust_id, stamps} = reduxState
    return {tree, selected_cards, cust_id, stamps}
}

export default connect(mapStateToProps, {deleteAllStamps})(Cart)