import React, { useState, useEffect } from 'react';
import { tree, userIcon, passwordIcon, BaseURL } from '../config/config'
import { connect } from 'react-redux'
import { signIn } from '../actions'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide';
import { DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)

    useEffect(() => {
        props.signedIn && localStorage.getItem('token') && props.history.push('/homepage')
    }, [])

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }


    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const isValid = () => {
        let formIsValid = true;

        if (!username) {
            formIsValid = false;
            alert('Invalid username')
        }



        if (!password) {
            formIsValid = false;
            alert('Invalid password')
        }
        return formIsValid
    }

    const onSubmit = () => {
        if (isValid()) {
            login({ username, password })
                .then(res => {
                    props.signIn({ username, password })
                    props.history.push('/homepage')
                }
                )
        }
    }

    const login = (data) => {
        return new Promise((resolve, reject) => {
            fetch(`${BaseURL}`)
                .then(resposne => resposne.json())
                .then(res => {
                    res.map(i => {
                        if (i.username === data.username && i.password === data.password) {
                            const token = i.token
                            localStorage.setItem('token', token)
                            resolve(res)
                        }
                        else {
                            alert('User not Authenticated')
                        }
                    })
                })
        })
    }

    const onDialog = () => {
        setShow(!show)
    }



    return (

        <div className='login-container' style={{ backgroundImage: `url(${tree})` }} >
            <div className='form-container'>
                <form>
                    <span>Login to your account</span>
                    <div className='input-fields'>
                        <div className="form-group">
                            <div className='input-field'>
                                <img src={userIcon} alt='password' height='20px' style={{
                                    position: 'relative', top: '3px', left: '11px'
                                }} />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={e => onChangeUsername(e)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className='input-field'>
                                <img src={passwordIcon} alt='password' height='20px' style={{
                                    position: 'relative', top: '3px', left: '11px', color: 'white'
                                }} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => onChangePassword(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='form-group'>
                        <button type="submit"
                            onClick={onSubmit}
                            className="btn btn-primary submit-button">LOGIN</button>
                        <p onClick={onDialog}>Forgot password?</p>
                        {!!show &&
                            <Dialog
                                open={show}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={onDialog}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle id="alert-dialog-slide-title" >Please Read the Following</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        Est consectetur ea id Lorem exercitation. Culpa laborum id eiusmod incididunt ex. Sit cupidatat ea sit do exercitation. Laborum ipsum excepteur commodo consequat adipisicing. Culpa deserunt laboris laborum eu anim aute nostrud non laboris minim elit anim dolore cupidatat.
                                        </DialogContentText >
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={onDialog} color="inherit">
                                        Close
                                        </Button>
                                </DialogActions>
                            </Dialog>}
                    </div>
                </form>
            </div>

        </div >
    );
}

const mapStateToProps = (state) => {
    return { signedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn })(Login);
