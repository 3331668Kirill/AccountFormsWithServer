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
    const [error, setError] = useState('')

    const newCustomerRequest = async () => {
        try {
            setError('')
            const response = await fetch('/api/customer/customer', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({nameFirm, address, bankAccount, unp})
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
            <div className={inp.input_field}>
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
                <label>введите расчетный счет организации: </label>
                <input type={"text"} id={val === 'customer' ? 'bankAccount' : 'bankAccountOwn'}
                       className={inp.input} style={{width: '250px'}}
                       value={bankAccount} onChange={changeBankAccount} maxLength={28}/>
            </div>
            <button onClick={newCustomerRequest}> сохранить на сервер </button>
            <div style={{color: "red"}}>{error}</div>
        </Modal>
    </div>)
})