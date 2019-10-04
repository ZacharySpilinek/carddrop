import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import Card from './Card/Card'
import {cardSelected, saveSelectedCard} from '../../../ducks/reducer'

class CardSelect extends Component {
    state = {
        cards: [],
        test: <h1>asdfasdf</h1>
    }

    componentDidMount = () => {
        this.getCardsByCategory()
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props){
            this.getCardsByCategory()
        }
    }

    componentWillUnmount = () => {
        this.props.saveSelectedCard(this.props.cust_id, this.props.selected_cards[this.props.match.params.tree_rel_id])
    }

    getCardsByCategory = async () => {
        console.log(this.props.tree[this.props.match.params.tree_rel_id].rel_relationship)
        let result = await axios.get(`/api/cards/category?category=${this.props.tree[this.props.match.params.tree_rel_id].rel_relationship}`)
        this.setState({
            cards: result.data
        })
    }

    testFn = () => {
        return (
            <>
            <p>Poopity Woop</p>
            <h2>Scoopity Poop</h2>
            <p>Poopity woop poop</p>
            </>
        )
    }

    next = () => {
        // console.log(this.props.selected_cards[this.props.match.params.tree_rel_id])
        // console.log(this.props.match.params.tree_rel_id)
        this.props.saveSelectedCard(this.props.cust_id, this.props.selected_cards[this.props.match.params.tree_rel_id])
        this.props.history.push(`/cards/${this.props.tree[+this.props.match.params.tree_rel_id + 1].tree_rel_id}`)
    }

    previous = () => {
        if (this.props.tree[+this.props.match.params.tree_rel_id - 1]) {
            this.props.saveSelectedCard(this.props.cust_id, this.props.selected_cards[this.props.match.params.tree_rel_id])
            this.props.history.push(`/cards/${this.props.tree[+this.props.match.params.tree_rel_id - 1].tree_rel_id}`)
        } else {
            this.props.history.push(`/tree`)
        }
    }

    render(){
        // let {tree_rel_id} = this.props.match.params
        // let {tree} = this.props
        let list = this.state.cards.map(el => (
            <Card
                key={el.card_id + this.props.match.params.tree_rel_id + this.props.tree[this.props.match.params.tree_rel_id].rel_name}
                card_relationship={el.relationship}
                img_out={el.img_out}
                tree_rel_id={this.props.match.params.tree_rel_id}
                price={el.price}
                card_id={el.card_id}
            />
        ))
        return(
            <div className="cardselect">
                This is CardSelect.
                {this.props.selectedCardLoading === true ? <h1>Loading...</h1>
                : 
                <>
                {this.state.test}
                {this.testFn()}
                <h2>Select card for: {this.props.tree[this.props.match.params.tree_rel_id].rel_name}</h2>
                {list}
                <button onClick={() => this.previous()}>Previous</button>
                <button onClick={() => this.next()} disabled={!this.props.tree[+this.props.match.params.tree_rel_id + 1]}>Next</button>
                </>
                 }
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {cust_id, tree, selected_cards, selectedCardLoading} = reduxState
    return {cust_id, tree, selected_cards, selectedCardLoading}
}

export default connect(mapStateToProps, {cardSelected, saveSelectedCard})(CardSelect)