import React, { useState, useEffect, forwardRef, Fragment } from 'react';
import { tree, userIcon, passwordIcon, BaseURL } from '../config/config'
import { connect } from 'react-redux'
import { signIn } from '../actions'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide';
import { DialogContent, DialogContentText, DialogActions, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Login(props) {
    const [username, setUsername] = useState('')
    const [showDialog, setShowDialog] = useState(false)
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [showError, setShowError] = useState({ U: false, P: false })


    useEffect(() => {
        props.signedIn && !!localStorage.getItem('token') && props.history.push('/homepage')
    }, [])

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const isValid = () => {
        let formIsValid = true;
        setShowError(i => ({ U: false, P: false }))
        console.log(showError, 'vali')
        if (!username) {
            formIsValid = false;
            setShowError(i => ({ ...i, U: true }))
        }

        if (!password) {
            formIsValid = false;
            setShowError(i => ({ ...i, P: true }))
        }
        return formIsValid
    }

    const onSubmit = () => {
        console.log(showError, 'sub')
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
                    const result = res.find(i => i.username === data.username && i.password === data.password)
                    if (result) {
                        localStorage.setItem('token', result.token)
                        resolve(result)
                    }
                    else
                        alert('User not Authenticated')
                })
        })
    }

    const onDialog = () => {
        setShowDialog(!showDialog)
    }
    const onShowPassword = () => {
        console.log(showPassword)
        setShowPassword(!showPassword)
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
                            {!!showError.U && <span> Username is incorrect</span>}
                        </div>
                        <div className="form-group">
                            <div className='input-field'>
                                <img src={passwordIcon} alt='password' height='20px' style={{
                                    position: 'relative', top: '3px', left: '11px', color: 'white'
                                }} />
                                <Fragment>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => onChangePassword(e)}
                                    />
                                    <IconButton onClick={onShowPassword} style={{ position: 'absolute', right: '0%', top: '50%', transform: 'translateY(-50%' }} >
                                        {showPassword ? <Visibility style={{ color: 'black' }} /> : <VisibilityOff style={{ color: 'black' }} />}
                                    </IconButton>
                                </Fragment>
                            </div>
                            {!!showError.P && <span> Password is incorrect</span>}
                        </div>
                    </div>
                    <div className='form-group'>
                        <button type="submit"
                            onClick={onSubmit}
                            className="btn btn-primary submit-button">LOGIN</button>
                        <p onClick={onDialog}>Forgot password?</p>
                        {!!showDialog &&
                            <Dialog
                                open={showDialog}
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
