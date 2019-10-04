import React from 'react'
import {connect} from 'react-redux'
import {cardSelected} from '../../../../ducks/reducer'

class Card extends React.Component{
    state = {
        selected: false
    }

    handleSelection = () => {
        this.setState(prevState => ({
            selected: !prevState.selected
        }))
    }

    componentDidMount = () => {
        if (this.props.selected_cards[+this.props.tree_rel_id].card_id === this.props.card_id){
            this.setState({
                selected: true
            })
        }
    }

    render(){
        return(
            <div className="card">
                {!this.props.selected_cards[+this.props.tree_rel_id] ?
                <>
                    <input onClick={() => this.props.cardSelected(
                        this.props.card_id,
                        +this.props.tree_rel_id,
                        this.props.price,
                        this.props.img_out,
                        this.props.card_relationship
                        )}
                        type="radio"
                        name="same"
                        />
                    <img width="200px" alt={this.props.relationship} height="auto" src={this.props.img_out}/>
                </>
                :
                <>
                    <input onClick={() => this.props.cardSelected(
                        this.props.card_id,
                        +this.props.tree_rel_id,
                        this.props.price,
                        this.props.img_out,
                        this.props.card_relationship
                        )}
                        type="radio"
                        name="same"
                        // defaultChecked={this.props.selected_cards[+this.props.tree_rel_id].card_id === this.props.card_id}
                        defaultChecked={this.state.selected}                        
                        />
                    <img onClick={() => this.handleSelection()} width="200px" alt={this.props.relationship} height="auto" src={this.props.img_out}/>
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