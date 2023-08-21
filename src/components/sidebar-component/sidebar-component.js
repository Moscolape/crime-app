import React from 'react';
import './sidebar-component.styles.css';

const SideBar = (props) => {
    const user = props.user;
    const lastName = user && user.data.fullName.split(' ').pop();

    const onLogout = props.onLogout;

    return (
        <div className="sidebar">
            {user ? (
                <div>
                    <p>Welcome, <b>{lastName}</b></p>
                    <button id='btn-bottom' onClick={onLogout}>Logout</button>
                </div>
            ) : (
                <p>Welcome</p>
            )}
        </div>
    );
};

export default SideBar;