import React from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import {addStamps} from '../../../ducks/reducer'

class Stamps extends React.Component{
    state = {
        mailCount: 0,
        list: [
            {value:'chocolate', label: 'Chocolate'},
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
        ],
        selectedOption: null
    }

    handleChange = selectedOption => {
        this.setState({
            selectedOption: selectedOption
        }, () => {
            console.log(`Option selected:`, this.state.selectedOption)
        })
    }

    componentDidMount = () => {
        let mailCount = 0
        this.props.tree.forEach(el => {
            if (el.rel_delivery === "mail"){
                mailCount = 1 + mailCount
            }
        })
        this.setState({
            mailCount: mailCount
        })
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.tree.length !== 0 && this.props.tree.length !== prevProps.tree.length){
            let mailCount = 0
            this.props.tree.forEach(el => {
                if (el.rel_delivery === "mail"){
                    mailCount = 1 + mailCount
                }
            })
            this.setState({
                mailCount: mailCount
            })
        }
    }

    noStamps = () => {
        this.props.history.push('/cart')
    }

    yesStamps = () => {
        this.props.addStamps(this.state.mailCount)
        this.props.history.push('/cart')
    }

    render(){
        console.log(this.props.tree)
        return(
            <div className="Stamps">
                <h1>We noticed you have {this.state.mailCount} cards set to be delivered by mail. Would you like to add {this.state.mailCount} stamps to your cart for ${this.state.mailCount * 0.55}? They never expire and can go to any US state.</h1>
                <h2>You can edit your stamps in checkout.</h2>
                <button onClick={this.yesStamps}>Yes, please!</button> {/* IMPORTANT: this needs to add the right quantity of stamps to their cart. It must also NOT pull up the cart. Then it will send them to the cart page. */}
                <button onClick={this.noStamps}>No, thank you</button>
                <Select 
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
                />
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {tree} = reduxState
    return {tree}
}

export default connect(mapStateToProps, {addStamps})(Stamps)