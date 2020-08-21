import React from 'react';
import { mountain, user, password } from '../config/config'
function Login() {


    const onChangeUsername = (e) => { }


    const onChangePassword = (e) => { }

    const onSubmit = () => { }


    return (

        <div className='login-container' style={{ backgroundImage: `url(${mountain})` }} >
            <div className='form-container'>
                <form>
                    <span>Login to your account</span>
                    <div className='input-fields'>
                        <div className="form-group">
                            <div className='input-field'>
                                <img src={user} alt='password' height='20px' style={{
                                    position: 'relative', top: '3px', left: '3px'
                                }} />
                                <input
                                    type="text"
                                    placeholder="Username"
                                //onChange={e => this.onChangeUsername(e)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className='input-field'>
                                <img src={password} alt='password' height='20px' style={{
                                    position: 'relative', top: '3px', left: '3px', color: 'white'
                                }} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                // onChange={e => this.onChangePassword(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='form-group'>
                        <button type="submit"
                            //onClick={this.onSubmit}
                            className="btn btn-primary submit-button">Submit</button>
                        <p>Forgot password?</p>
                    </div>
                </form>
            </div>

        </div >
    );
}

export default Login;
