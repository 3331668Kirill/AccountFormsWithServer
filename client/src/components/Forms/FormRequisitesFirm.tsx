import React, {ChangeEvent, useState} from "react";
import {Modal} from "../../utils/Modal";
import css from "./requisitesActs.module.css"
import inp from "./../print.module.css"

interface TypePropsFormRequisitesFirm {
    unp: string | number
    changeUnp: (e: ChangeEvent<HTMLInputElement>) => void
    changeNameFirm: (e: ChangeEvent<HTMLInputElement>) => void
    changeAddress: (e: ChangeEvent<HTMLInputElement>) => void
    changeBankAccount: (e: ChangeEvent<HTMLInputElement>) => void
    bankAccount: string
    nameFirm: string
    address: string
    val: string
}

export const FormRequisitesFirm = React.memo(({
                                                  unp,
                                                  changeUnp,
                                                  changeNameFirm,
                                                  changeAddress,
                                                  changeBankAccount,
                                                  nameFirm,
                                                  bankAccount,
                                                  address,
                                                  val,
                                              }: TypePropsFormRequisitesFirm) => {

    const [modalActive, setModalActive] = useState<boolean>(false)
    console.log("render Form")
    const [serverAnswer, setServerAnswer] = useState('')
    const [editMode, setEditMode] = useState(false)

    const saveCustomerOnServer = async () => {
        try {
            setServerAnswer('')
            const response = await fetch('/api/customer/customer', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({nameFirm, address, bankAccount, unp})
            })
            const data = await response.json()
            setServerAnswer(data.message)
            if (!response.ok && data.errors) {
                throw new Error(data.errors[0].msg || "something go wrong")
            }

        } catch (e: any) {
            console.error(e)
            setServerAnswer(e.toString())
        }

    }
    const getCustomerFromServer = async () => {
        try {
            setServerAnswer('')

            const response = await fetch(`/api/customer/customer/${unp}`, {
                method: 'GET', headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
            const data = await response.json()
            console.log(data)
            setEditMode(true)
            setServerAnswer(data.message)
            if (!response.ok && data.errors) {
                throw new Error(data.errors[0].msg || "something go wrong")
            }
            if (data.customer){
            setEditMode(false)
            changeNameFirm(data.customer.nameFirm)
            changeAddress(data.customer.address)
            changeBankAccount(data.customer.bankAccount)
            }
        } catch (e: any) {
            console.error(e)
            setServerAnswer(e.toString())
        }

    }


    return (<div>
        {val === 'customer' &&
        <button className={css.button}
                onClick={() => setModalActive(true)}
        > РЕКВИЗИТЫ ЗАКАЗЧИКА
        </button>

        }
        {val === 'executor' && <div>
            <button className={css.button}
                    onClick={() => setModalActive(true)}
            > РЕКВИЗИТЫ ИСПОЛНИТЕЛЯ
            </button>
        </div>}

        <Modal active={modalActive} setActive={setModalActive}>
            <div className={inp.input_field}>
                <label >введите УНП: </label>
                <input type={"text"} id={val === 'customer' ? 'unp' : 'unpOwn'} value={unp} onChange={changeUnp}
                        className={inp.input} maxLength={9}/>
            </div>
            {editMode && <><div className={inp.input_field}>
                <label>введите наименование организации: </label>
                <input type={"text"} id={val === 'customer' ? 'nameFirm' : 'nameFirmOwn'} value={nameFirm}
                       className={inp.input} onChange={changeNameFirm} maxLength={30}/>
            </div>
            <div className={inp.input_field}>
                <label>введите адрес организации: </label>
                <input type={"text"} id={val === 'customer' ? 'address' : 'addressOwn'} style={{width: '250px'}}
                       className={inp.input} value={address} onChange={changeAddress} maxLength={40}/>
            </div>
            <div className={inp.input_field}>
                <label>введите расчетный счет, банк и код банка: </label>
                <input type={"text"} id={val === 'customer' ? 'bankAccount' : 'bankAccountOwn'}
                       className={inp.input} style={{width: '250px'}}
                       value={bankAccount} onChange={changeBankAccount} maxLength={58}/>
            </div>
            <button className={inp.button} onClick={saveCustomerOnServer}> сохранить на сервер </button>
            </>}
            <button className={inp.button} onClick={getCustomerFromServer}> получить данные с сервера </button>
            <div style={{color: "red"}}>{serverAnswer}</div>
        </Modal>
    </div>)
})