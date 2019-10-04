import React from 'react'
import {connect} from 'react-redux'
import {cardSelected} from '../../../../ducks/reducer'

class Card extends React.Component{
    state = {
        ind: null
    }

    componentDidMount = () => {
        let ind = this.props.selected_cards.findIndex(el => el.tree_rel_id === +this.props.tree_rel_id)
        if (ind === -1) return
        this.setState({
            ind: ind
        })
    }

    cardSelect = () => {
        this.props.cardSelected(
            this.props.card_id,
            +this.props.tree_rel_id,
            this.props.price,
            this.props.img_out,
            this.props.card_relationship
        )
    }

    render(){
        return(
            <div className="card">
                {this.state.ind === null ?
                <>
                    <input onClick={() => this.cardSelect()}
                        type="radio"
                        name="same"
                        />
                    <img onClick={() => this.cardSelect()} width="200px" alt={this.props.relationship} height="auto" src={this.props.img_out}/>
                </>
                :
                <>
                    <input onClick={() => this.cardSelect()}
                        type="radio"
                        name="same"
                        defaultChecked={this.props.selected_cards[this.state.ind].card_id === this.props.card_id}                     
                        />
                    <img onClick={() => this.cardSelect()} width="200px" alt={this.props.relationship} height="auto" src={this.props.img_out}/>
                </>
                }
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {selected_cards} = reduxState
    return {selected_cards}
}

export default connect(mapStateToProps, {cardSelected})(Card)