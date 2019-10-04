import React from 'react'
import {connect} from 'react-redux'
import {cardSelected} from '../../../../ducks/reducer'

class Card extends React.Component{
    render(){
        return(
            <div className="card">
                <input onClick={() => this.props.cardSelected(
                    this.props.card_id,
                    this.props.tree_rel_id,
                    this.props.price,
                    this.props.img_out,
                    this.props.card_relationship
                    )}
                    type="radio"
                    selected={true}
                    name="same"/>
                <img width="200px" alt={this.props.relationship} height="auto" src={this.props.img_out}/>
            </div>
        )
    }
}

export default connect(null, {cardSelected})(Card)