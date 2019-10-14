import React, {Component} from 'react'
import {getTree, getCategories, addTreeItem, saveTree, getSelectedCards} from '../../../ducks/reducer'
import {connect} from 'react-redux'
import TreeItem from './TreeItem/TreeItem'

class TreeBuilder extends Component {
    constructor(){
        super()
        this.myRef = React.createRef()
        this.state = {
            canGoNext: false,
            loading: true
        }
    }

    componentDidMount = () => {
        // this.autoSave()
        this.props.getCategories()
    }

    componentDidUpdate = (prevProps) => {
        // this.getTree() // already getting tree in App.js
        // this.props.getSelectedCards(this.props.cust_id) // already getting tree in App.js
    }

    scrollToBottom = () => window.scrollTo({top: this.myRef.current.offsetTop, left: 0, behavior: 'smooth'})

    autoSave = () => {
        let autosave = setInterval(() => {
            if (this.props.tree.length )
            this.props.saveTree(this.props.cust_id, this.props.tree)
            console.log('saved')
        }, 10000)
        setTimeout(() => {clearInterval(autosave); console.log('autosave stopped')}, 300000)
    }

    getTree = () => {
        this.props.getTree(this.props.cust_id)
    }

    next = async () => {
        await this.props.saveTree(this.props.cust_id, this.props.tree)
        this.props.getSelectedCards(this.props.cust_id)
        this.props.history.push(`/cards/${this.props.tree[0].tree_rel_id}`)
    }

    add = async () => {
        await this.props.addTreeItem()
        await this.props.saveTree(this.props.cust_id, this.props.tree)
        this.scrollToBottom()
    }

    render(){
        let treeList = this.props.tree.map((el, index) => {

            return (
                <div key={el.tree_rel_id}>
                    <TreeItem
                        tree_rel_id_index={index}
                        tree_rel_id={el.tree_rel_id}
                        rel_name={el.rel_name}
                        rel_relationship={el.rel_relationship}
                        rel_bday={el.rel_bday}
                        rel_delivery={el.rel_delivery}/>
                </div>
            )
        })
        return(
            <>
            {this.props.treeLoading ? 
                <div className="loading">
                    <i className="loading-icon fas fa-spinner"></i>
                </div>
                :
                <></>
            }
            <div className="tree-builder">
                {this.props.treeLoading ? 
                <></>
                :
                <div>
                    {/* <button onClick={() => this.props.saveTree(this.props.cust_id, this.props.tree)}>Save All, delete later</button> */}
                    <h2>Build Your Tree</h2>
                    <p>Start by listing your connections, the people you want to buy cards for. We're constantly adding relationship categories, so if theirs is not on the list, choose "No Selection". You will still get to choose a card for them.</p>
                    <div className="tree-list">
                        {treeList}
                        {/* <button >Add</button> */}
                        <i ref={this.myRef} onClick={this.add} className="fas fa-plus-circle"></i>
                    </div>
                    <div className="tree-list-next-button">
                        <button disabled={this.props.tree.length === 0} onClick={() => this.next()}>Next</button>
                    </div>
                </div>}
            </div>
            </>
        )
    }
}

const mapStateToProps = reduxState => {
    const {cust_id, treeLoading, tree} = reduxState
    return {cust_id, treeLoading, tree}
}

export default connect(mapStateToProps, {getTree, getCategories, addTreeItem, saveTree, getSelectedCards})(TreeBuilder)