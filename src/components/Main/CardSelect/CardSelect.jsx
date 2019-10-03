import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

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
        // saveSelectedCard()
        // console.log(this.props.tree[+this.props.match.params.tree_rel_id + 1].tree_rel_id)
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
            <p key={el.card_id}>{el.card_id}</p>
        ))
        console.log(this.state.cards)
        return(
            <div className="cardselect">
                This is CardSelect.
                The current id is: {this.props.match.params.tree_rel_id}
                <h2>Buying cards for: {tree[tree_rel_id].rel_name}</h2>
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

export default connect(mapStateToProps)(CardSelect)