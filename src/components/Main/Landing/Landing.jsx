import React, {Component} from 'react'
import Hero from './Hero/Hero'
import {connect} from 'react-redux'
import FooterLogo from '../../../assets/CardDrop-Logo2-850px.png'

class Landing extends Component {

    next = () => {
        if (this.props.cust_id) {
            this.props.history.push('/tree')
        } else {
            this.props.history.push('/register')
        }
    }

    render(){
        return(
            <div className="landing">
                <Hero />
                <div className="landing-main">
                    <div className="what-is-carddrop">
                        <p>Don't rush to buy a birthday card again. CardDrop is a yearly birthday card subscription so you can be prepared for every birthday, every year.</p>
                    </div>
                    <div className="three-steps">
                        <h4>It's simple:</h4>
                        <div className="three-steps-steps">
                            <div className="step-one">
                                <h4>1.</h4>
                                <p>Build your friend + family tree.</p>
                            </div>
                            <div className="step-two">
                                <h4>2.</h4>
                                <p>Select a card for each tree member.</p>
                            </div>
                            <div className="step-three">
                                <h4>3.</h4>
                                <p>Get your drop sent every year.</p>
                            </div>
                        </div>
                    </div>
                    <div className="full-color-section-rush">
                        <h3>Rush No More</h3>
                        <div className="full-color-section-text">
                            <i className="fas fa-envelope fa-3x"></i>
                            <p>With CardDrop, you don't have to rush to the store last minute to get a birthday card. It's already there in the box, selected by you. We'll even send you a reminder email to fill it out ahead of time.</p>
                        </div>
                    </div>
                    <div className="left-info-section">
                        <div className="left-info-section-left">
                            <i className="fas fa-tree fa-10x"></i>
                        </div>
                        <div className="left-info-section-right">
                            <h3>Tree</h3>
                            <p>Build your tree of family and friends with our simple tree builder. All you need is a name and a delivery method. You can even note relationship and birthday for extra features.</p>
                        </div>
                    </div>
                    <div className="right-info-section">
                        <div className="right-info-section-right">
                            <h3>Card Select</h3>
                            <p>After you build your tree, you can pick the perfect card for each person. Picking for Mom? Picking for a Coworker? We'll show you cards tailored towards their relationship to you, and cards that will work for anybody.</p>
                        </div>
                        <div className="right-info-section-left">
                            <i className="fas fa-stream fa-10x"></i>
                        </div>
                    </div>
                    <div className="left-info-section">
                        <div className="left-info-section-left">
                            <i className="fas fa-calendar-day fa-10x"></i>
                        </div>
                        <div className="left-info-section-right">
                            <h3>Yearly Drop</h3>
                            <p>When you've made your choices, you can choose a yearly subscription. We'll ship your box to you every year. Rest assured you have the right cards for everybody, sent to you every year.</p>
                        </div>
                    </div>
                    <div className="full-color-section-mail">
                        <h3>Long Distance Friend? No problem.</h3>
                        <div className="full-color-section-text">
                            <i className="fas fa-globe fa-3x"></i>
                            <p>In your tree, you can select that your card will need to be mailed. We'll automatically offer you stamps, and remind you to fill out and mail the card on time.</p>
                        </div>
                    </div>
                    <div className="full-color-section-get-started">
                        <h3>Get Started</h3>
                        <div className="full-color-section-text">
                            <p>Ready to get started? It's easy. Just click the button below.</p>
                            <button onClick={this.next}>Get Started</button>
                        </div>
                    </div>
                    <div className="footer">
                        <img src={FooterLogo} alt="The Card Drop Logo"/>
                        <p>Contact Us: <a href="info@thecarddrop.com">info@thecarddrop.com</a></p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {cust_id} = reduxState
    return {cust_id}
}

export default connect(mapStateToProps)(Landing)