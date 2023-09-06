import React from 'react';
import './sidebar-component.styles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faNewspaper, faBell, faGear, faChartLine, faSignOut } from '@fortawesome/free-solid-svg-icons';


import navImage from '../../assets/user.png';

const SideBar = (props) => {
    const user = props.user;
    const lastName = user && user.data.fullName.split(' ').pop();

    const onLogout = props.onLogout;

    return (
        <div className={`sidebar ${props.sidebarOpen ? 'sidebar-open' : ''}`}>
            {user ? (
                <div>
                    <div className='side-nav'>
                        <img src={navImage} alt='user-pic' id='nav-pic'/>
                        <div>
                            <span>CRIME FORECASTING AND ANALYSIS</span>
                            <p>Welcome, <b>{lastName}</b></p>
                        </div>
                    </div>
                    <div className='nav-input'>
                        <input type='search' className='nav-search-input'/>
                        <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                    </div>
                    <div className='nav-menu'>
                        <p style={{color: '#997BD1', fontWeight: 'bold'}}>Menu</p>
                        <div>
                            <FontAwesomeIcon icon={faHome} className='nav-icon'/> <span>Home</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faNewspaper} className='nav-icon'/> <span>News Reports</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faChartLine} className='nav-icon'/> <span>Context Analysis</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faBell} className='nav-icon'/> <span>Notifications</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faGear} className='nav-icon'/> <span>Settings</span>
                        </div>
                    </div>
                    <button id='btn-bottom' onClick={onLogout} title='Log out'><FontAwesomeIcon className='sign-out' icon={faSignOut}/> Logout</button>
                </div>
            ) : (
                <p>Loading user...</p>
            )}
        </div>
    );
};

export default SideBar;