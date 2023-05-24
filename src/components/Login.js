import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const onSubmit = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })
            setUser(user)
            setUsername('')
            setPassword('')
            window.localStorage.setItem(
                'loggedLabeller', JSON.stringify(user)
            )
            props.onLogin(user.username)
            navigate('/')
        } catch (error) {
            console.log('wrong credentials')
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    username: <input
                        type="text"
                        value={username}
                        name="username"
                        onChange={({ target }) => setUsername(target.value)}
                        /> 
                </div>
                <div>
                    password: <input
                        type="password"
                        value={password}
                        name="password" 
                        onChange={({ target }) => setPassword(target.value)}
                        /> 
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default Login