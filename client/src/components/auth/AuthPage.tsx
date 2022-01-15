import React, {Dispatch, SetStateAction, useState} from "react";
import SuperInputText from "../../utils/SuperInputText";
import css from "./auth.module.css"

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
                sessionStorage.setItem('data', JSON.stringify(data))
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
        <div className={css.content}>
            <h1 className={css.h1}>ВХОД НА САЙТ</h1>
            <div className={css.input}>
                <label> email </label>
                <SuperInputText className={css.input_text} id={"email"} placeholder={"введите email"}
                                name={"email"} onChangeText={setEmail}/>
            </div>
            <div className={css.input}>
                <label> Пароль </label>
                <SuperInputText className={css.input_text} id={"password"} placeholder={"введите пароль"}
                                type={"password"} name={"password"} onChangeText={setPassword}/>
            </div>
            <div className={css.btn_block}>
            <button className={css.btn} onClick={loginRequest}> ВХОД</button>
            <button className={css.btn} onClick={registrationRequest}> РЕГИСТРАЦИЯ</button>
            </div>
            {email}
            {password}
            <div style={{color: "red"}}>{error}</div>
        </div>
    )
}