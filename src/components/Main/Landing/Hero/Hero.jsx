import React, {Component} from 'react'
import Hero1 from '../../../../assets/hero1.jpg'

class Hero extends Component {
    state = {
        heroImg: Hero1
    }
    render(){
        return(
            <div className="Hero">
                This is Hero
                <img alt="Birthday Card, Whisk, and Party Utensils" src={this.state.heroImg}/>
            </div>
        )
    }
}

export default Hero