import React, {Component} from 'react'
import {getTree} from '../../../ducks/reducer'
import {connect} from 'react-redux'
import TreeItem from './TreeItem/TreeItem'

class TreeBuilder extends Component {
    state = {
        canGoNext: false
    }

    componentDidMount = () => {
        this.getTree()
        this.props.getCategory()
    }

    getTree = () => {
        this.props.getTree(this.props.cust_id)
    }

    render(){
        let treeList = this.props.tree.map((el, index) => {
            return (
                <>
                    <TreeItem
                        key={index}
                        tree_rel_id={index}
                        rel_name={el.rel_name}
                        rel_relationship={el.rel_relationship}
                        rel_bday={el.rel_bday}
                        rel_delivery={el.rel_delivery}/>
                </>
            )
        })
        return(
            <div className="TreeBuilder">
                {this.props.treeLoading ? 
                <h1>Loading</h1> 
                :
                <div>
                    This is TreeBuilder.
                    <div className="tree-list">
                        {treeList}
                    </div>
                    <input placeholder="Name"/>
                    <input placeholder="Relationship"/>
                    <select name="DOBMonth">
                        <option>- Month -</option>
                        <option value="01">January</option>
                        <option value="02">Febuary</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                    <select name="DOBDAY">
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
                    <div>
                        In-Peron<input type="radio" name="delivery" value="in-peron"/>
                        Mail<input type="radio" name="delivery" value="mail"/>
                    </div>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {cust_id, treeLoading, tree} = reduxState
    return {cust_id, treeLoading, tree}
}

export default connect(mapStateToProps, {getTree})(TreeBuilder)