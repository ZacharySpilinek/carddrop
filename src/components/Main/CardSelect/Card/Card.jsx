import React from 'react'
import {connect} from 'react-redux'
import {cardSelected} from '../../../../ducks/reducer'

class Card extends React.Component{
    state = {
        ind: null,
        tagColor: '#7A7A7A',
        tagName: '',
        img: this.props.img_out,
        selectedCardClass: "card-item"
    }

    componentDidMount = () => {
        let ind = this.props.selected_cards.findIndex(el => el.tree_rel_id === +this.props.tree_rel_id)
        if (ind === -1) return
        this.setState({
            ind: ind
        })
        if (this.props.card_relationship === 'neutral'){
            this.setState({
                tagName: 'ANYONE'
            })
        } else {
            this.setState({
                tagColor: 'lightcoral',
                tagName: this.props.card_relationship
            })
        }
        if (this.props.selected_cards[ind].card_id === this.props.card_id){
            this.setState({
                selectedCardClass: "card-item selected"
            })
        }
    }

    componentDidUpdate = (prevProps) => {
        let ind = this.props.selected_cards.findIndex(el => el.tree_rel_id === +this.props.tree_rel_id)
        if (prevProps.selected_cards[ind] !== this.props.selected_cards[ind]){
            if (this.props.selected_cards[ind].card_id === this.props.card_id){
                this.setState({
                    selectedCardClass: "card-item selected"
                })
            } else {
                this.setState({
                    selectedCardClass: "card-item"
                })
            }
        }
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

    toggleImage = () => {
        if (this.state.img === this.props.img_out){
            this.setState({
                img: this.props.img_in
            })
        } else {
            this.setState({
                img: this.props.img_out
            })
        }
    }

    render(){
        return(
            <div className="card">
                    <div className={this.state.selectedCardClass}>
                        <div className="card-item-main">
                            {this.state.ind === null ? 
                            <label className="radio">
                                <input onClick={() => this.cardSelect()}
                                    type="radio"
                                    name="same"
                                    />
                                <span></span>
                            </label>
                            :
                            <label className="radio">
                                <input onClick={() => this.cardSelect()}
                                    type="radio"
                                    name="same"
                                    checked={this.props.selected_cards[this.state.ind].card_id === this.props.card_id}                     
                                    />
                                <span></span>
                            </label>
                            }
                                <div className="card-img-out" style={{backgroundImage: `url(${this.state.img})`}} onClick={() => this.cardSelect()} alt={this.props.relationship} src={this.props.img_out}></div>
                                <span className="tag" style={{backgroundColor: this.state.tagColor, textTransform: 'uppercase'}}>{this.state.tagName}</span>
                        </div>
                        <div className="card-item-info">
                            <span>${this.props.price / 100}</span>
                            <button onClick={this.toggleImage}>INSIDE</button>
                        </div>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {selected_cards} = reduxState
    return {selected_cards}
}

export default connect(mapStateToProps, {cardSelected})(Card)