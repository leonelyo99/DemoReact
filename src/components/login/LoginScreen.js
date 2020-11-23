import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { useForm } from '../../hooks/useForm';
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => {

    const { dispatch } = useContext(AuthContext);

    const [formValue, handleInputChange] = useForm({
        name: ''
    });
    const { name } = formValue;

    const handleLogin = (e) => {
        e.preventDefault();
        if (name === '') {
            return;
        }

        const lastPath = localStorage.getItem('lastPath') || '/'; //traigo la ruta del storage para poder navegar

        const action = {
            type: types.login,
            payload: {
                name,
            }
        };

        dispatch(action);
        history.replace(lastPath)
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />
            <form
                onSubmit={handleLogin}
            >
                <input
                    type="text"
                    placeholder="Write your name"
                    className="form-control"
                    name="name"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />
                <button
                    className="btn btn-primary mt-4"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    )
}
