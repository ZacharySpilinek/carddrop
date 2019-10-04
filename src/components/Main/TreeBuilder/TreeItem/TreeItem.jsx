import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteTree, handleTreeChange, deleteSelectedCard} from '../../../../ducks/reducer'

class TreeItem extends Component {
    delete = () => {
        let selectedCardIndex = this.props.selected_cards.findIndex(el => el.tree_rel_id === this.props.tree_rel_id)
        if (selectedCardIndex === -1){
            this.props.deleteTree(this.props.cust_id, this.props.tree_rel_id)
        } else {
            this.props.deleteSelectedCard(selectedCardIndex)
            this.props.deleteTree(this.props.cust_id, this.props.tree_rel_id)
        }
        // this.props.deleteTree(this.props.cust_id, this.props.tree_rel_id)
        // this.props.deleteSelectedCard(this.props.cust_id, this.props.tree_rel_id, this.props.selected_cards)
    }
    render(){
        return(
            <div className="tree-item">
                <h3>{this.props.rel_name}</h3>
                <input onChange={(e) => this.props.handleTreeChange(e.target.value, 'rel_name', this.props.tree_rel_id)} value={this.props.rel_name} placeholder={this.props.rel_name}/>
                <select onChange={(e) => this.props.handleTreeChange(e.target.value, 'rel_relationship', this.props.tree_rel_id)} value={this.props.tree[this.props.tree_rel_id].rel_relationship}>
                        <option key={0} value="neutral">- Relationship -</option>
                    {this.props.categories.map((el, i) => (
                        <option key={i + 1} value={el}>{el}</option>
                    ))}
                </select>
                <div>
                    In-Person<input onChange={(e) => this.props.handleTreeChange(e.target.value, 'rel_delivery', this.props.tree_rel_id)} type="radio" name={`delivery ${this.props.tree_rel_id}`} value="in-person" defaultChecked={this.props.tree[this.props.tree_rel_id].rel_delivery === "in-person"}/>
                    Mail<input onChange={(e) => this.props.handleTreeChange(e.target.value, 'rel_delivery', this.props.tree_rel_id)} type="radio" name={`delivery ${this.props.tree_rel_id}`} value="mail"  defaultChecked={this.props.tree[this.props.tree_rel_id].rel_delivery === "mail"}/>
                </div>
                    <select onChange={(e) => this.props.handleTreeChange(parseInt(e.target.value, 10), 'rel_bday_mo', this.props.tree_rel_id)} value={this.props.tree[this.props.tree_rel_id].rel_bday_mo} name="DOBMonth">
                        <option>- Month -</option>
                        <option value="1">January</option>
                        <option value="2">Febuary</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                    <select onChange={(e) => this.props.handleTreeChange(parseInt(e.target.value, 10), 'rel_bday_day', this.props.tree_rel_id)} value={this.props.tree[this.props.tree_rel_id].rel_bday_day} name="DOBDAY">
                        <option>- Day -</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="0">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                    </select>
                    <button onClick={() => this.delete()}>Delete</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {categories, tree, cust_id, selected_cards} = reduxState
    return {categories, tree, cust_id, selected_cards}
}

export default connect(mapStateToProps, {deleteTree, handleTreeChange, deleteSelectedCard})(TreeItem)