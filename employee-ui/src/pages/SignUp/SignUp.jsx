import { useEffect, useState } from 'react';
import React from 'react-router-dom';
import {addUser} from '../../api'

const SignUp = (props) => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [isValidForm, setValidForm] = useState(false);
    const [errMessage, setErrorMessage] = useState('');

    const callSignUpApi = async(userDetails) => {
        const {data} = await addUser(userDetails);
        setErrorMessage(data.message);
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        callSignUpApi({
            Name: name,
            Password: password,
            EmailId: email
        })       
    }

    useEffect(() => {
        if(name && password && email){
            setValidForm(true);
        }
    }, [name, password, email])

    return (
        <form className="col-md-4 col-sm-9 ">
             <p className="fs-2 mb-3"> Sign Up as a User</p>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" id="Name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" id="EmailId" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-secondary mb-3" onClick={handleSignUp} disabled={!isValidForm}>Sign Up</button>
            {errMessage ? <div class={`alert alert-${errMessage.includes("You have successfully registered") ? 'success' : 'danger'}` } role="alert">{errMessage}</div> : null}
        </form>
    )
}

export default SignUp;