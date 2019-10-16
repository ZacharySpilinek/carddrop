import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleUserChange, saveUserChange} from '../../../ducks/reducer'
import axios from 'axios'

class User extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        toggleEdit: false
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.first_name !== this.props.first_name || prevProps.last_name !== this.props.last_name || prevProps.email !== this.props.email){
            this.props.saveUserChange(this.props.first_name, this.props.last_name, this.props.email, this.props.cust_id)
        }
    }

    editTree = () => {
        this.props.history.push('/tree')
    }

    toggleEdit = () => {
        this.setState({
            toggleEdit: !this.state.toggleEdit
        })
    }

    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }

    saveChange = () => {
        this.props.handleUserChange(this.state.firstName, this.state.lastName, this.state.email)
        /* setTimeout(() => {
            this.props.saveUserChange(this.props.first_name, this.props.last_name, this.props.email, this.props.cust_id)
        }, 1000) */
        this.setState({
            toggleEdit: false
        })
    }

    cancel = () => {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            toggleEdit: false
        })
    }

    pauseSubscription = async () => {
        axios.post('/api/snipcart/subscription/pause', {sub_id: this.props.sub_id}).then(res => {
            console.log(res)
        })
    }

    getAllOrders = async() => {
        await axios.get('/api/snipcart/allorders').then(res => 
            console.log(res.data))
    }

    render(){
        let treeMap = this.props.tree.map(el => {
            return(
                <div key={el.tree_rel_id}>
                    <h3>{el.rel_name}</h3>
                    <p>{el.rel_relationship}</p>
                    <p>{el.delivery}</p>
                </div>
            )
        })
        return(
            <div className="user">
                <h2>Hello, {this.props.first_name}</h2>
                <div className="user-info">
                    My Info:
                    <button onClick={this.toggleEdit}>Edit</button>
                    {!this.state.toggleEdit ? 
                        <>
                            <div className="user-info-info">
                                <h3>First Name: <span>{this.props.first_name}</span></h3>
                                <h3>Last Name: <span>{this.props.last_name}</span></h3>
                                <h4>Email: <span>{this.props.email}</span></h4>
                            </div>
                        </>
                    :
                        <>
                            <div className="user-info-edit-inputs">
                                <input onChange={e => this.handleChange(e, 'firstName')} placeholder="First Name" defaultValue={this.props.first_name} type="text"/>
                                <input onChange={e => this.handleChange(e, 'lastName')} placeholder="Last Name" defaultValue={this.props.last_name} type="text"/>
                                <input onChange={e => this.handleChange(e, 'email')} placeholder="Email" defaultValue={this.props.email} type="text"/>
                            </div>
                            <button onClick={this.saveChange}>Save Changes</button>
                            <button onClick={this.cancel}>Cancel</button>
                        </>
                    }
                </div>
                <div className="user-tree">
                    My Tree:
                    <button onClick={this.editTree}>Edit Tree</button>
                    <div className="tree-map">
                        {treeMap}
                    </div>
                </div>
                {/* <div className="order-information">
                    Order Information:
                    <p onClick={this.getAllOrders}>View Subscription</p>
                    <p onClick={this.pauseSubscription}>Pause Subscription</p>
                    <p>Cancel Subscription</p>
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {tree, first_name, last_name, email, cust_id, sub_id} = reduxState
    return {tree, first_name, last_name, email, cust_id, sub_id}
}

export default connect(mapStateToProps, {handleUserChange, saveUserChange})(User)