import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import Homepage from './components/Homepage'
function App(props) {

  useEffect(() => {
    !props.signedIn && !localStorage.getItem('token') && props.history.push('/login')
  }, [])



  return (
    <div className='full-container'>
      <Homepage {...props} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    signedIn: state.auth.isSignedIn,
    username: state.auth.username,
  }
}

export default connect(mapStateToProps)(App);
