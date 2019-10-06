import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleUserChange, saveUserChange} from '../../../ducks/reducer'

class User extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        toggleEdit: false
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.first_name !== this.props.first_name || prevProps.last_name !== this.props.last_name || prevProps.email !== this.props.email){
            // console.log(prevProps.first_name)
            console.log(this.props.first_name)
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
            <div className="User">
                This is User.
                User Info:
                <button onClick={this.toggleEdit}>Edit</button>
                {!this.state.toggleEdit ? 
                    <>
                        <h3>{this.props.first_name}</h3>
                        <h3>{this.props.last_name}</h3>
                        <h4>{this.props.email}</h4>
                    </>
                :
                    <>
                        <input onChange={e => this.handleChange(e, 'firstName')} placeholder="First Name" defaultValue={this.props.first_name} type="text"/>
                        <input onChange={e => this.handleChange(e, 'lastName')} placeholder="Last Name" defaultValue={this.props.last_name} type="text"/>
                        <input onChange={e => this.handleChange(e, 'email')} placeholder="Email" defaultValue={this.props.email} type="text"/>
                        <button onClick={this.saveChange}>Save Changes</button>
                        <button onClick={this.cancel}>Cancel</button>
                    </>
                }
                
                My Tree:
                <button onClick={this.editTree}>Edit Tree</button>
                    {treeMap}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {tree, first_name, last_name, email, cust_id} = reduxState
    return {tree, first_name, last_name, email, cust_id}
}

export default connect(mapStateToProps, {handleUserChange, saveUserChange})(User)