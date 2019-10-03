import React, {Component} from 'react'
import {connect} from 'react-redux'

class TreeItem extends Component {
    /* state = {
        month: '',
        day: ''
    }

    componentDidMount = () => {
        let date = this.props.rel_bday
        let date2 = date.substr(5)
        let date3 = date2.substring(0, 5)
        let date4 = date3.split('-')
        this.setState({
            month: date4[0],
            day: date4[1]
        })
    }

    selectChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    } */

    render(){
        return(
            <div className="tree-item">
                <h3>{this.props.rel_name}</h3>
                <select defaultValue={this.props.tree[this.props.tree_rel_id].rel_relationship}>
                        <option key={0} value="">- Relationship -</option>
                    {this.props.categories.map((el, i) => (
                        <option key={i + 1} value={el}>{el}</option>
                    ))}
                </select>
                <div>
                    In-Peron<input type="radio" name={`delivery ${this.props.tree_rel_id}`} value="in-peron" defaultChecked={this.props.tree[this.props.tree_rel_id].rel_delivery === "in-person"}/>
                    Mail<input type="radio" name={`delivery ${this.props.tree_rel_id}`} value="mail"  defaultChecked={this.props.tree[this.props.tree_rel_id].rel_delivery === "mail"}/>
                </div>
                    <select /* onChange={e => this.selectChange(e, 'month')} */ defaultValue={this.props.tree[this.props.tree_rel_id].rel_bday_mo} name="DOBMonth">
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
                    <select /* onChange={e => this.selectChange(e, 'day')} */ defaultValue={this.props.tree[this.props.tree_rel_id].rel_bday_day} name="DOBDAY">
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
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {categories, tree} = reduxState
    return {categories, tree}
}

export default connect(mapStateToProps)(TreeItem)