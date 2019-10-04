import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import Card from './Card/Card'
import {cardSelected} from '../../../ducks/reducer'

class CardSelect extends Component {
    state = {
        cards: []
    }

    componentDidMount = () => {
        this.getCardsByCategory()
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props){
            this.getCardsByCategory()
        }
    }

    getCardsByCategory = async () => {
        let result = await axios.get(`/api/cards/category?category=${this.props.tree[this.props.match.params.tree_rel_id].rel_relationship}`)
        this.setState({
            cards: result.data
        })
    }

    next = () => {
        this.props.history.push(`/cards/${this.props.tree[+this.props.match.params.tree_rel_id + 1].tree_rel_id}`)
    }

    previous = () => {
        if (this.props.tree[+this.props.match.params.tree_rel_id - 1]) {
            this.props.history.push(`/cards/${this.props.tree[+this.props.match.params.tree_rel_id - 1].tree_rel_id}`)
        } else {
            this.props.history.push(`/tree`)
        }
    }

    render(){
        let {tree_rel_id} = this.props.match.params
        let {tree} = this.props
        let list = this.state.cards.map(el => (
            <Card
                key={el.card_id + this.props.match.params.tree_rel_id + this.props.tree[this.props.match.params.tree_rel_id].rel_name}
                card_relationship={el.relationship}
                img_out={el.img_out}
                tree_rel_id={tree_rel_id}
                price={el.price}
                card_id={el.card_id}
            />
        ))
        return(
            <div className="cardselect">
                This is CardSelect.
                <h2>Select card for: {tree[tree_rel_id].rel_name}</h2>
                {list}
                <button onClick={() => this.previous()}>Previous</button>
                <button onClick={() => this.next()} disabled={!tree[+tree_rel_id + 1]}>Next</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {cust_id, tree} = reduxState
    return {cust_id, tree}
}

export default connect(mapStateToProps, {cardSelected})(CardSelect)