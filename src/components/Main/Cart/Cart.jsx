import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem/CartItem'

class Cart extends Component {
    previous = () => {
        this.props.history.push(`/cards/${this.props.tree[this.props.tree.length - 1].tree_rel_id}`)
    }

    componentDidMount = () => {

    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.selected_cards !== this.props.selected_cards) {
            this.mappedCart()
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
                {this.mappedCart()}
                <button onClick={() => this.previous()}>Previous</button>
                <button onClick={() => this.checkoutPage()}>Checkout</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {tree, selected_cards} = reduxState
    return {tree, selected_cards}
}

export default connect(mapStateToProps)(Cart)