import React from 'react'
import {connect} from 'react-redux'
import {deleteSelectedCard, saveSelectedCard, deleteStamp} from '../../../../ducks/reducer'
import {withRouter} from 'react-router-dom'

class CartItem extends React.Component{
    deleteItem = () => {
        if (this.props.rel_delivery === "mail"){
            this.props.deleteStamp()
        }
        this.props.deleteSelectedCard(null, this.props.selected_cards, this.props.tree_rel_id)
        this.props.saveSelectedCard(this.props.cust_id, this.props.selected_cards, this.props.tree_rel_id)
    }

    editItem = () => {
        // console.log(selected_cards)
        this.props.history.push(`/cards/${this.props.tree_rel_id}`)
    }

    render(){
        // console.log(this.props.relationship)
        return(
            <div className="cartitem" key={this.props.tree_rel_id}>
                <div className="cartitem-left">
                    {/* <img width="200px" alt={this.props.rel_name} src={this.props.img_out}/> */}
                    <div className="cartitem-left-img" style={{backgroundImage: `url(${this.props.img_out})`}}/>
                </div>
                <div className="cartitem-right">
                    <h4>For: {this.props.rel_name}</h4>
                    <p>{this.props.rel_delivery} - {this.props.relationship}</p>
                    <span>${this.props.price / 100}</span>
                    <div className="cartitem-right-buttons">
                        <button onClick={this.editItem}>Edit</button>
                        <button onClick={this.deleteItem}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const {selected_cards, cust_id} = reduxState
    return {selected_cards, cust_id}
}

export default connect(mapStateToProps, {deleteSelectedCard, saveSelectedCard, deleteStamp})(withRouter(CartItem))