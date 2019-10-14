import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteTree, handleTreeChange, deleteSelectedCard, deleteStamp, saveTree} from '../../../../ducks/reducer'
// import Select from 'react-select'

class TreeItem extends Component {
    state = {
        showMore: false,
        knowBirth: "dontknow"/* ,
        list: [
            { value:'chocolate', label: 'Chocolate'},
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
        ],
        selectedOption: null, */
    }

    componentDidMount = () => {
        if (this.props.tree[this.props.tree_rel_id_index].rel_bday_mo && this.props.tree[this.props.tree_rel_id_index].rel_bday_day) {
            this.setState({
                knowBirth: "know"
            })
        }
        if (!this.props.tree[this.props.tree_rel_id_index].rel_name){
            this.setState({
                showMore: true
            })
        }
    }

    delete = () => {
        let selectedCardIndex = this.props.selected_cards.findIndex(el => el.tree_rel_id === this.props.tree_rel_id)
        if (selectedCardIndex === -1){
            this.props.deleteStamp()
            this.props.deleteTree(this.props.cust_id, this.props.tree_rel_id, this.props.tree)
        } else {
            this.props.deleteStamp()
            this.props.deleteSelectedCard(selectedCardIndex)
            this.props.deleteTree(this.props.cust_id, this.props.tree_rel_id, this.props.tree)
        }
        // this.props.deleteTree(this.props.cust_id, this.props.tree_rel_id)
        // this.props.deleteSelectedCard(this.props.cust_id, this.props.tree_rel_id, this.props.selected_cards)
    }

    knowBirth = (e) => {
        if (e.target.value === "dontknow"){
            this.setState({
                knowBirth: "dontknow"
            })
            this.props.handleTreeChange(null, 'rel_bday_mo', this.props.tree_rel_id)
            this.props.handleTreeChange(null, 'rel_bday_day', this.props.tree_rel_id)
        } else {
            this.setState({
                knowBirth: "know"
            })
        }
    }

    toggleView = async () => {
        this.setState({
            showMore: !this.state.showMore
        })
        await this.props.saveTree(this.props.cust_id, this.props.tree)
    }

    render(){
        return(
            <>
            {!this.props.tree[this.props.tree_rel_id_index] ? <></> :
                !this.state.showMore ?
                <div className="tree-item-mobile-small">
                    <div className="tree-item-mobile-small-top">
                        <h4>{this.props.rel_name}</h4>
                        <h4>{this.props.rel_relationship === "neutral" ? "No Relation" : this.props.rel_relationship}</h4>
                        <div className="tree-item-mobile-small-top-right">
                            <p>{this.props.tree[this.props.tree_rel_id_index].rel_bday_mo}/{this.props.tree[this.props.tree_rel_id_index].rel_bday_day}</p>
                            <p>{this.props.tree[this.props.tree_rel_id_index].rel_delivery}</p>
                        </div>
                    </div>
                    <i onClick={this.toggleView} className="fas fa-chevron-down"></i>
                </div>
                : 
                <div className="tree-item-mobile">
                    <div className="tree-item-mobile-container">
                        <div className="tree-item-top">
                            <p>Their Name:</p>
                            <input autoFocus={this.props.rel_name === ""} onChange={(e) => this.props.handleTreeChange(e.target.value, 'rel_name', this.props.tree_rel_id)} value={this.props.rel_name} placeholder={this.props.rel_name || "Name"}/>
                        </div>
                        <div className="tree-item-middle1">
                            <p>They were born on:</p>
                            <div className="tree-item-middle1-top">
                                <label className="radio">
                                    <input onChange={e => this.knowBirth(e)} value="dontknow" name={`born ${this.props.tree_rel_id}`} type="radio" checked={this.state.knowBirth === "dontknow"}/>
                                    <span>Don't Know</span>
                                </label>
                                <label className="radio">
                                    <input onChange={e => this.knowBirth(e)} value="know" name={`born ${this.props.tree_rel_id}`} type="radio" checked={this.state.knowBirth === "know"}/>
                                    <span>I Know:</span>
                                </label>
                            </div>
                            <div className="tree-item-middle1-bottom">
                                <select onChange={(e) => this.props.handleTreeChange(parseInt(e.target.value, 10), 'rel_bday_mo', this.props.tree_rel_id)} value={!this.props.tree[this.props.tree_rel_id_index].rel_bday_mo ? "null" : this.props.tree[this.props.tree_rel_id_index].rel_bday_mo} name="DOBMonth" disabled={this.state.knowBirth === "dontknow"}>
                                        <option value="null">Month</option>
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
                                    <select onChange={(e) => this.props.handleTreeChange(parseInt(e.target.value, 10), 'rel_bday_day', this.props.tree_rel_id)} value={!this.props.tree[this.props.tree_rel_id_index].rel_bday_day ? "null" : this.props.tree[this.props.tree_rel_id_index].rel_bday_day} name="DOBDAY" disabled={this.state.knowBirth === "dontknow"}>
                                        <option value="null">Day</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
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
                            </div>
                        </div>
                        <div className="tree-item-middle2">
                            <p>They are my:</p>
                            <select onChange={(e) => this.props.handleTreeChange(e.target.value, 'rel_relationship', this.props.tree_rel_id)} value={this.props.tree[this.props.tree_rel_id_index].rel_relationship}>
                                    <option key={0} value="neutral">No Selection</option>
                                {this.props.categories.filter((el) => el !== 'neutral').map((el, i) => (
                                    <option key={i + 1} value={el}>{el}</option>
                                    ))}
                            </select> 
                            {/* <Select 
                            // className="react-select-container"
                            value={his.props.tree[this.props.tree_rel_id_index].rel_relationship}
                            className="react-select-container"
                            onChange={this.handleChange}
                            options={this.props.categories.map(el => (
                                {value: el, label: el}
                            ))}
                            theme={theme => ({
                                ...theme,
                                borderRadius: 5,
                                colors: {
                                    ...theme.colors,
                                    primary: 'orange'
                                }
                            })}
                        /> */}
                        </div>
                        <div className="tree-item-bottom">
                            <p>I will give their card:</p>
                                <div>
                                    <label className="radio">
                                        <input onChange={(e) => this.props.handleTreeChange(e.target.value, 'rel_delivery', this.props.tree_rel_id)} type="radio" name={`delivery ${this.props.tree_rel_id}`} value="in-person" checked={this.props.tree[this.props.tree_rel_id_index].rel_delivery === "in-person"}/>
                                        <span>In-Person</span>
                                    </label>
                                    <label className="radio">
                                        <input onChange={(e) => this.props.handleTreeChange(e.target.value, 'rel_delivery', this.props.tree_rel_id)} type="radio" name={`delivery ${this.props.tree_rel_id}`} value="mail" checked={this.props.tree[this.props.tree_rel_id_index].rel_delivery === "mail"}/>
                                        <span>By Mail</span>
                                    </label>
                                </div>
                        </div>
                        {/* <Select 
                            // className="react-select-container"
                            value={this.state.selectedOption}
                            className="react-select-container"
                            onChange={this.handleChange}
                            options={this.state.list}
                            theme={theme => ({
                                ...theme,
                                borderRadius: 5,
                                colors: {
                                    ...theme.colors,
                                    primary: 'orange'
                                }
                            })}
                        /> */}
                    </div>
                    <i onClick={this.toggleView} className="fas fa-chevron-up"></i>
                    <i onClick={() => this.delete()} className="far fa-times-circle"></i>
                </div>
        }
            <i className="fas fa-ellipsis-v"></i>
            </>
        )
    }
}

const mapStateToProps = reduxState => {
    const {categories, tree, cust_id, selected_cards, treeLoading} = reduxState
    return {categories, tree, cust_id, selected_cards, treeLoading}
}

export default connect(mapStateToProps, {deleteTree, handleTreeChange, deleteSelectedCard, deleteStamp, saveTree})(TreeItem)