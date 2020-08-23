import React from 'react';
import { connect } from 'react-redux'
import { signOut } from '../actions'
import { userIcon } from '../config/config'
import Header from './Header'

function Homepage(props) {

    return (
        <div className='homepage-conatiner'>
            <Header  {...props} />
            <div id='main-content'>
                <img src={userIcon} height='100px' />
                <span className='welcome'><h1>Welcome {props.username}</h1></span>
            </div>
        </div>
    );
}

export default connect(null, { signOut })(Homepage);

