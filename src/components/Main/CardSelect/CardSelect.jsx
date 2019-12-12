import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import Card from './Card/Card'
import {cardSelected, saveSelectedCard, getSelectedCards, addStamps} from '../../../ducks/reducer'
import {withRouter} from 'react-router-dom'

class CardSelect extends Component {
    constructor(){
        super()
        this.myRef = React.createRef()
        this.state = {
            cards: [],
            loading: true
        }
    }
    
    componentDidMount = async () => {
        // await this.props.getSelectedCards
        this.getCardsByCategory()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.match.params.tree_rel_id !== this.props.match.params.tree_rel_id){
            this.getCardsByCategory()
        }
        if (prevProps.match.params.tree_rel_id !== this.props.match.params.tree_rel_id){
            this.scrollToMyRef()
        }
        if (this.state.cards.length === 0 && prevProps.selected_cards[this.props.match.params.tree_rel_id] !== this.props.selected_cards[this.props.match.params.tree_rel_id]){
            this.getCardsByCategory()
        }
    }

    scrollToMyRef = () => window.scrollTo(0, 0)

    /* componentWillUnmount = () => {
        this.props.saveSelectedCard(this.props.cust_id, this.props.selected_cards[this.props.match.params.tree_rel_id])
    } */

    getCardsByCategory = async (ind) => {
        this.setState({
            loading: true
        })
        if (this.props.tree[this.props.match.params.tree_rel_id]){
            let result = await axios.get(`/api/cards/category?category=${this.props.tree[this.props.match.params.tree_rel_id].rel_relationship}`)
            this.setState({
                cards: result.data
            })
        }
        this.setState({
            loading: false
        })
    }

    mapCards = () => {
        return this.state.cards.map(el => (
            <Card
                key={el.card_id + this.props.match.params.tree_rel_id + this.props.tree[this.props.match.params.tree_rel_id].rel_name}
                card_relationship={el.relationship}
                img_out={el.img_out}
                img_in={el.img_in}
                tree_rel_id={this.props.match.params.tree_rel_id}
                price={el.price}
                card_id={el.card_id}
            />
        ))
    }

    next = () => {
        // problem with below code. If someone deletes a card in cart and comes back to the person in question, this will send the correct cust_id, BUT the second arg is null (the card is gone, hence nothing to grab)
        if (!this.props.tree[+this.props.match.params.tree_rel_id + 1]) {
            this.props.saveSelectedCard(this.props.cust_id, this.props.selected_cards[+this.props.match.params.tree_rel_id], +this.props.match.params.tree_rel_id)
            this.props.history.push(`/stamps`)
        } else {
            this.props.saveSelectedCard(this.props.cust_id, this.props.selected_cards[+this.props.match.params.tree_rel_id], +this.props.match.params.tree_rel_id)
            this.props.history.push(`/cards/${this.props.tree[+this.props.match.params.tree_rel_id + 1].tree_rel_id}`)
        }
        this.setState({
            loading: true
        })
    }

    previous = () => {
        if (this.props.tree[+this.props.match.params.tree_rel_id - 1]) {
            this.props.saveSelectedCard(this.props.cust_id, this.props.selected_cards[+this.props.match.params.tree_rel_id], +this.props.match.params.tree_rel_id)
            this.props.history.push(`/cards/${this.props.tree[+this.props.match.params.tree_rel_id - 1].tree_rel_id}`)
        } else {
            this.props.saveSelectedCard(this.props.cust_id, this.props.selected_cards[+this.props.match.params.tree_rel_id], +this.props.match.params.tree_rel_id)
            this.props.history.push(`/tree`)
        }
        this.setState({
            loading: true
        })
    }

    finish = () => {
        this.props.saveSelectedCard(this.props.cust_id, this.props.selected_cards[+this.props.match.params.tree_rel_id], +this.props.match.params.tree_rel_id)
        let anyMail = this.props.tree.findIndex(el => el.rel_delivery === "mail")
        console.log(anyMail)
        if (anyMail === -1) {
            this.props.addStamps(0)
            this.props.history.push('/cart')
        } else {
            this.props.history.push(`/stamps`)
        }
    }

    render(){
        return(
            <div className="cardselect">
                {this.props.selectedCardLoading === true || !this.props.tree || this.state.loading ?
                <div className="loading">
                    <i className="loading-icon fas fa-spinner"></i>
                </div>
                : 
                <>
                <div className="cardselect-name">
                    <h3>Select card for:</h3><h2>{this.props.tree[+this.props.match.params.tree_rel_id].rel_name}</h2>
                </div>
                <div className="cardselect-map">
                    {this.mapCards()}
                </div>
                <div className="cardselect-buttons">
                    <button onClick={() => this.previous()}>Previous</button>
                    {!this.props.tree[+this.props.match.params.tree_rel_id + 1] ?
                    <button className="finish" onClick={() => this.finish()}>Finish</button> :
                    <button onClick={() => this.next()}>Next</button>}
                </div>
                </>
                 }
            </div>
        )
    }  
}

const mapStateToProps = reduxState => {
    const {cust_id, tree, selected_cards, selectedCardLoading, treeLoading} = reduxState
    return {cust_id, tree, selected_cards, selectedCardLoading, treeLoading}
}

export default connect(mapStateToProps, {cardSelected, saveSelectedCard, getSelectedCards, addStamps})(withRouter(CardSelect))