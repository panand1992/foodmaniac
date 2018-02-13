import React from 'react';
import {Link} from 'react-router-dom';
import MobileSideNav from './mobileSideNav.jsx';

class Header extends React.Component {

	constructor(props) {
      	super(props);

        this.state = {
            showSideMenu : false
        };

        this.showMobileNav = this.showMobileNav.bind(this);
        this.hideMobileNav = this.hideMobileNav.bind(this);
   	};

    showMobileNav() {
        this.setState({showSideMenu : true});
    };

    hideMobileNav() {
        this.setState({showSideMenu : false});
    };

   	render() {
      	return (
         	<div>
                <header>
                    <div class='container'>
                        <div class='row'>
                            <div class='mobileNavBtn' onClick={this.showMobileNav}>
                                <span></span>
                            </div>
                            <div class="logo">
                                <Link to={'/'}>Foodmaniac</Link>
                            </div>
                            <div class="navmenu">
                                <ul>
                                    <li>
                                        <Link to={'/'}>Home</Link>
                                    </li>
                                    <li>
                                        <Link to={'/about'}>About</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                   </div>
                </header>
                <MobileSideNav hideMobileNav={this.hideMobileNav} showSideMenu={this.state.showSideMenu} />
            </div>	
      	);
   }
}
export default Header;