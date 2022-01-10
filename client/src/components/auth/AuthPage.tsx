import React, {Dispatch, SetStateAction, useState} from "react";
import SuperInputText from "../../utils/SuperInputText";

type PropsAuthPage = {
    auth: Dispatch<SetStateAction<boolean>>
}

export const AuthPage = ({auth}: PropsAuthPage) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')


    const registrationRequest = async () => {
        try {
            setError('')
            const response = await fetch('/api/auth/register', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({email, password})
            })
            const data = await response.json()
            console.log('msg', data.message)
            console.log('data', data)
            if (!response.ok && data.errors) {
                throw new Error(data.errors[0].msg || "something go wrong")
            }

        } catch (e: any) {
            console.error(e)
            setError(e.toString())
        }

    }

    const loginRequest = async () => {
        try {
            setError('')
            const response = await fetch('/api/auth/login', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({email, password})
            })
            const data = await response.json()
            console.log('msg', data.message)
            console.log('id', data.userId)
            console.log('token', data.token)
            if (data.token) {
                auth(true)
                localStorage.setItem('data', JSON.stringify(data))
            }
            console.log('data', data)
            if (!response.ok) {
                throw new Error(data.errors ? data.errors[0].msg : data.message)
            }

        } catch (e: any) {
            console.error(e)
            setError(e.toString())
        }

    }

    return (
        <div>
            <h1>AUTHPAGE</h1>
            <div> Авторизация</div>
            <label> email </label>
            <SuperInputText id={"email"} placeholder={"введите email"}
                            name={"email"} onChangeText={setEmail}/>
            <label> Пароль </label>
            <SuperInputText id={"password"} placeholder={"введите пароль"}
                            type={"password"} name={"password"} onChangeText={setPassword}/>

            <button onClick={loginRequest}> ВХОД</button>
            <button onClick={registrationRequest}> РЕГИСТРАЦИЯ</button>
            {email}
            {password}
            <div style={{color: "red"}}>{error}</div>
        </div>
    )
}