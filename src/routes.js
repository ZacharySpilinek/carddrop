import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './components/Main/Landing/Landing'
import Register from './components/Main/Register/Register'
import TreeBuilder from './components/Main/TreeBuilder/TreeBuilder'
import CardSelect from './components/Main/CardSelect/CardSelect'
import Cart from './components/Main/Cart/Cart'
import Checkout from './components/Main/Checkout/Checkout'
import User from './components/Main/User/User'
import Stamps from './components/Main/Stamps/Stamps'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/register' component={Register}/>
        <Route path='/register/login' component={Register}/>
        <Route path='/tree' component={TreeBuilder}/>
        <Route path='/cards/:tree_rel_id' component={CardSelect}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/checkout' component={Checkout}/>
        <Route path='/profile' component={User}/>
        <Route ptah='/stamps' component={Stamps}/>
    </Switch> 
)