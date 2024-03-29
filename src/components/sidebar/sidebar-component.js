import React, {useState, useEffect} from 'react';
import './sidebar-component.styles.css';
import { Link, useLocation } from 'react-router-dom';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faNewspaper, faBell, faGear, faChartLine, faSignOut } from '@fortawesome/free-solid-svg-icons';

import navImage from '../../assets/user.png';


const SideBar = (props) => {
    const [enableAOS, setEnableAOS] = useState(false);
    const location = useLocation();

    const user = props.user;
    const lastName = user && user.data.fullName.split(' ').pop();

    useEffect(() => {
        setEnableAOS(location.pathname === '/dashboard');
    }, [location.pathname]);

    const onLogout = props.onLogout;

    return (
        <div className={`sidebar ${props.sidebarOpen ? 'sidebar-open' : ''}`}>
            {user ? (
                <div>
                    <div className='side-nav' data-aos={enableAOS ? "fade-right" : ""}>
                        <img src={navImage} alt='user-pic' id='nav-pic'/>
                        <div>
                            <span>CRIME FORECASTING AND ANALYSIS</span>
                            <p>Welcome, <b>{lastName}</b></p>
                        </div>
                    </div>
                    <div className='nav-input' data-aos={enableAOS ? "fade-right" : ""}>
                        <input type='search' className='nav-search-input'/>
                        <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                    </div>
                    <div className='nav-menu'>
                        <p data-aos={enableAOS ? "fade-right" : ""} style={{color: '#997BD1', fontWeight: 'bold'}}>Menu</p>
                        <Link to="/dashboard" data-aos={enableAOS ? "fade-in" : ""} data-aos-delay="300">
                            <div className={location.pathname === '/dashboard' ? 'active' : ''}>
                                <FontAwesomeIcon icon={faHome} className='nav-icon'/>
                                <span>Home</span>
                            </div>
                        </Link>
                        <Link to="" data-aos={enableAOS ? "fade-in" : ""} data-aos-delay="600">
                            <div>
                                <FontAwesomeIcon icon={faNewspaper} className='nav-icon'/>
                                <span>News Reports</span>
                            </div>
                        </Link>
                        <Link to="/context-analysis" data-aos={enableAOS ? "fade-in" : ""} data-aos-delay="900">
                            <div className={location.pathname === '/context-analysis' ? 'active' : ''}>
                                <FontAwesomeIcon icon={faChartLine} className='nav-icon'/>
                                <span>Context Analysis</span>
                            </div>
                        </Link>
                        <Link to="" data-aos={enableAOS ? "fade-in" : ""} data-aos-delay="1200">
                            <div>
                                <FontAwesomeIcon icon={faBell} className='nav-icon'/>
                                <span>Notifications</span>
                            </div>
                        </Link>
                        <Link to="" data-aos={enableAOS ? "fade-in" : ""} data-aos-delay="1500">
                            <div>
                                <FontAwesomeIcon icon={faGear} className='nav-icon'/>
                                <span>Settings</span>
                            </div>
                        </Link>
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