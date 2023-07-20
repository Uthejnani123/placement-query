import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const ResetPassword = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [email1, setEmail1] = useState('');
    const PostData = () => {
        fetch('/new-password', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                password: email,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: '#c62828 red darken-3' });
                } else {
                    M.toast({ html: 'Password Reset Successfully.', classes: '#43a047 green darken-1' });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <input
                    type="password"
                    placeholder="New Password"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={email1}
                    onChange={e => setEmail1(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={PostData}>
                    Reset Password
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
