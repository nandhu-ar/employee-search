import React, { useEffect, useState } from 'react';
import './UnAuthenticatedLanding.scss';
import { validateLogin } from '../../actions';
import { connect } from 'react-redux';
import SignUp from '../SignUp/SignUp';


const UnAuthenticatedLanding = (props) => {
    const {
        validateLogin,
        isLoginSuccess,
        isLoading
    } = props;

    const [isValidForm, setValidForm] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, seterrMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();
        validateLogin({
            Name: name,
            Password: password
        });
    }

    useEffect(() => {
        if(name && password){
            setValidForm(true);
        }
    }, [name, password])

    useEffect(() => {
        console.log("is loading", isLoading, isLoginSuccess)
        if(isLoginSuccess){
            props.history.push('/employees')
        }
        else if(!isLoading && !isLoginSuccess && isValidForm){
            seterrMessage('Login Failed')
        }
    }, [isLoginSuccess])

    return (
        <React.Fragment>
        <div className="formContainer col-12">
        <form className="col-md-4 col-sm-9 ">
            <p className="fs-2 mb-3"> Login</p>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" id="Name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            
            {isLoading ? <button class="btn btn-secondary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
            </button> :
            <button type="submit" className="btn btn-secondary mb-3" onClick={handleLogin} disabled={!isValidForm}>Login</button>
             }
            {errMessage ? <div className="alert alert-danger" role="alert">{errMessage}</div> : null}
        </form>
        <SignUp></SignUp>
        </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    isLoginSuccess: state.isLoginSuccess,
    isLoading: state.isLoading
})

const mapDispatchToProps =  {
    validateLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(UnAuthenticatedLanding)