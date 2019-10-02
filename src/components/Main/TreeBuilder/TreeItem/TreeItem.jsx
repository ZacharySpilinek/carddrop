import React, {Component} from 'react'

class TreeItem extends Component {
    state = {
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
    }

    render(){
        return(
            <div className="TreeItem">
                <h3>{this.props.rel_name}</h3>
                <p>{this.props.rel_relationship}</p>
                <p>{this.props.rel_bday}</p>
                <p>{this.props.rel_delivery}</p>
                <input placeholder="Name"/>
                    <input placeholder="Relationship"/>
                    <select onChange={e => this.selectChange(e, 'month')} value={this.state.month} name="DOBMonth">
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
                    <select onChange={e => this.selectChange(e, 'day')} value={this.state.day} name="DOBDAY">
                        <option>- Day -</option>
                            <option value="01">1</option>
                            <option value="02">2</option>
                            <option value="03">3</option>
                            <option value="04">4</option>
                            <option value="05">5</option>
                            <option value="06">6</option>
                            <option value="07">7</option>
                            <option value="08">8</option>
                            <option value="09">9</option>
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
        )
    }
}

export default TreeItem