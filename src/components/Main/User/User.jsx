import React, {Component} from 'react'
import {connect} from 'react-redux'

class User extends Component {

    editTree = () => {
        this.props.history.push('/tree')
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
        console.log(this.props.tree)
        return(
            <div className="User">
                This is User.
                My Tree:
                <button onClick={this.editTree}>Edit Tree</button>
                    {treeMap}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {tree} = reduxState
    return {tree}
}

export default connect(mapStateToProps)(User)