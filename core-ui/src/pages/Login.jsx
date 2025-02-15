import { useState } from "react";
import PropTypes from 'prop-types';

export default function Login({ setAuth }) {
    const [errorMsg, setErrorMsg] = useState('');
    const [data, setData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await window.api.invoke('authenticate', data);

        if (result.success) {
            setAuth(result.success);
        } else {
            setErrorMsg('Invalid username or password');
        }
    }
    return (
        <>
            <div className="w-full h-screen flex justify-center items-center bg-gray-100">
                <form className="bg-white rounded-2xl px-6 py-10 text-sm" id="login-form" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-3">
                        <input type="text" placeholder="Username"
                            className="border border-gray-200 px-2 py-1 rounded min-w-[220px] focus:outline-sky-400" name="username" onChange={handleChange} />
                        <input type="password" placeholder="Password"
                            className="border border-gray-200 px-2 py-1 rounded min-w-[220px] focus:outline-sky-400" name="password" onChange={handleChange} />
                    </div>
                    {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
                    <button type="submit"
                        className="bg-green-500 w-full text-white rounded py-1.5 mt-2.5 hover:cursor-pointer hover:bg-green-600">login</button>
                </form>
            </div>
        </>
    );
}

Login.propTypes = {
    setAuth: PropTypes.func.isRequired,
};