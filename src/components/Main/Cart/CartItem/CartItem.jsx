import React from 'react'
import {connect} from 'react-redux'
import {deleteSelectedCard, saveSelectedCard} from '../../../../ducks/reducer'

class CartItem extends React.Component{
    deleteItem = () => {
        this.props.deleteSelectedCard(null, this.props.selected_cards, this.props.tree_rel_id)
        this.props.saveSelectedCard(this.props.cust_id, this.props.selected_cards, this.props.tree_rel_id)
    }

    render(){
        return(
            <div key={this.props.tree_rel_id}>
                    <h4>{this.props.rel_name}</h4>
                    <img width="200px" alt={this.props.rel_name} src={this.props.img_out}/>
                    <p>${this.props.price}</p>
                    <p>{this.props.rel_delivery}</p>
                    <button onClick={this.deleteItem}>Delete</button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const {selected_cards, cust_id} = reduxState
    return {selected_cards, cust_id}
}

export default connect(mapStateToProps, {deleteSelectedCard, saveSelectedCard})(CartItem)