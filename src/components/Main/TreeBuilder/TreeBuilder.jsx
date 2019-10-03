import React, {Component} from 'react'
import {getTree, getCategories, addTreeItem} from '../../../ducks/reducer'
import {connect} from 'react-redux'
import TreeItem from './TreeItem/TreeItem'

class TreeBuilder extends Component {
    state = {
        canGoNext: false
    }

    componentDidMount = () => {
        this.getTree()
        this.props.getCategories()
    }

    getTree = () => {
        this.props.getTree(this.props.cust_id)
    }

    componentWillUnmount = () => {

    }

    render(){
        let treeList = this.props.tree.map((el, index) => {
            return (
                <div key={index}>
                    <TreeItem
                        tree_rel_id={index}
                        rel_name={el.rel_name}
                        rel_relationship={el.rel_relationship}
                        rel_bday={el.rel_bday}
                        rel_delivery={el.rel_delivery}/>
                </div>
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
                    <button onClick={this.props.addTreeItem}>Add</button>
                    <button>Save, delete later</button>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {cust_id, treeLoading, tree} = reduxState
    return {cust_id, treeLoading, tree}
}

export default connect(mapStateToProps, {getTree, getCategories, addTreeItem})(TreeBuilder)