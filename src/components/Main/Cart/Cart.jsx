import React, {Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
    previous = () => {
        this.props.history.push(`/cards/${this.props.tree[this.props.tree.length - 1].tree_rel_id}`)
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.selected_cards !== this.props.selected_cards) {
            this.mappedCart()
        }
    }

    mappedCart = () => {
        if (this.props.selected_cards){
            let mapArr = []
            this.props.selected_cards.forEach(el => {
                let index = this.props.tree.findIndex(treeItem => treeItem.tree_rel_id === el.tree_rel_id)
                mapArr.push({
                    ...el,
                    rel_name: this.props.tree[index].rel_name,
                    rel_delivery: this.props.tree[index].rel_delivery
                })
            })
            return mapArr.map(el => {
                return (
                    <div key={el.tree_rel_id}>
                        <h4>{el.rel_name}</h4>
                        <img width="200px" alt={el.rel_name} src={el.img_out}/>
                        <p>${el.price}</p>
                        <p>{el.rel_delivery}</p>
                    </div>
                )
            })
        }
    }

    render(){
        return(
            <div className="Cart">
                This is Cart.
                {this.mappedCart()}
                <button onClick={() => this.previous()}>Previous</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {tree, selected_cards} = reduxState
    return {tree, selected_cards}
}

export default connect(mapStateToProps)(Cart)