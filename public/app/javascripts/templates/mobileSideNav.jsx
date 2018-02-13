import React from 'react';
import {Link} from 'react-router-dom';

class MobileSideNav extends React.Component {

   	render() {
      	return (
            <div id="sideNavMenu" className={this.props.showSideMenu ? 'showMenu' : ''}>
                <div class="closeMenuBtn">
                    <a href="javascript:void(0)" onClick={this.props.hideMobileNav}>x</a>
                </div>
                <ul>
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link to={'/about'}>About</Link>
                    </li>
                </ul>
            </div>
      	);
   }
}
export default MobileSideNav;