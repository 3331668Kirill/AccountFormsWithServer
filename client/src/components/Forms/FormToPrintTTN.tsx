import React, {useState} from 'react';
import css from "./printTTN.module.css";
import s from './../../utils/SuperInputText.module.css'
import {chunkArray} from "../../utils/chunkArray";
import {numOfString} from "../../utils/numOfStr";
import SuperEditableSpan from "../../utils/SuperEditableSpan";
import SuperSelect from "../../utils/SuperSelect";

type TypeFormToPrintTTN = {

    rawTTN: Array<string | number | null>
    endRawTTN: Array<string | number | null>
    docDate: string | number
    dateStr: string
    vat: string
    bankAccount: string
    bankAccountOwn: string
    nameFirm: string
    nameFirmOwn: string
    address: string
    addressOwn: string
    unp: string | number
    unpOwn: string | number
    totalOfString: string | null | 0
    raw: Array<string | number | null>
    endRaw: Array<string | number | null>
    arrDiv: Array<any>
}

export const FormToPrintTTN = React.memo(({
                                              docDate, raw, endRaw, rawTTN, endRawTTN,
                                              dateStr, nameFirm, nameFirmOwn, address, addressOwn, arrDiv, vat,
                                              unp, unpOwn, bankAccount, bankAccountOwn, totalOfString
                                          }: TypeFormToPrintTTN) => {
    console.log("render FormToPrintTTN")
    const transportCustomers = [nameFirm, nameFirmOwn]
    const [transportCustomer, setTransportCustomer] = useState(transportCustomers[1])
    let newRawTTN = chunkArray(rawTTN, 11);
    const totalVatString = endRawTTN[6] && numOfString(+endRawTTN[6]).toUpperCase()
    const [auto, setAuto] = useState<string>('')
    const [trailer, setTrailer] = useState<string>('')
    const [routeSheet, setRouteSheet] = useState<string>('')
    const [autoOwner, setAutoOwner] = useState<string>('')
    const [driver, setDriver] = useState<string>('')
    const [reason, setReason] = useState<string>('')
    const [pointLoading, setPointLoading] = useState<string>('')
    const [pointUnLoading, setPointUnLoading] = useState<string>('')



    return (
        <div>

            <div className={css.unp_string}>

                 <span className={css.unp_1}>
                 {unp}
                 </span>
                <span className={css.unp_1}>
                      {unpOwn}
                    </span>
                <span className={css.unp_2}> </span>


            </div>
            <div className={css.date}>{docDate && dateStr}</div>
            <div className={css.auto}>
                <span>Автомобиль_</span>
                <SuperEditableSpan
                    value={auto}
                    onChangeText={setAuto}
                    spanProps={{children: auto ? undefined : '...введите значение...'}}
                />

                <span>_Прицеп_</span>
                <SuperEditableSpan
                    value={trailer}
                    onChangeText={setTrailer}
                    spanProps={{children: trailer ? undefined : '...введите значение...'}}
                />
                <span> _К путевому листу_ </span>
                <SuperEditableSpan
                    value={routeSheet}
                    onChangeText={setRouteSheet}
                    spanProps={{children: routeSheet ? undefined : '...введите значение...'}}
                />
            </div>
            <div className={css.auto}>
                <span>Владелец автомобиля</span>
                <SuperEditableSpan
                    value={autoOwner}
                    onChangeText={setAutoOwner}
                    spanProps={{children: autoOwner ? undefined : '...введите значение...'}}
                />
                <span>Водитель</span>
                <SuperEditableSpan
                    value={driver}
                    onChangeText={setDriver}
                    spanProps={{children: driver ? undefined : '...введите значение...'}}
                />
            </div>
            <div className={css.auto}>
                <span>Заказчик автомобильной перевозки</span>
                <SuperSelect
                    options={transportCustomers}
                    value={transportCustomer}
                    onChangeOption={setTransportCustomer}
                />
            </div>
            <div className={css.auto}>
                <span>Грузоотправитель_</span>
                <span className={s.newSpanClassName}>_{nameFirmOwn}_{addressOwn}</span>
            </div>
            <div className={css.auto}>
                <span>Грузополучатель_</span>
                <span className={s.newSpanClassName}>_{nameFirm}_{address}</span>
            </div>
            <div className={css.auto}>
                <span>Основание отпуска_</span>
                <SuperEditableSpan
                    value={reason}
                    onChangeText={setReason}
                    spanProps={{children: reason ? undefined : '...введите значение...'}}
                />
                <span>Пункт погрузки_</span>
                <SuperEditableSpan
                    value={pointLoading}
                    onChangeText={setPointLoading}
                    spanProps={{children: pointLoading ? undefined : '...введите значение...'}}
                />
                <span>Пункт разгрузки_</span>
                <SuperEditableSpan
                    value={pointUnLoading}
                    onChangeText={setPointUnLoading}
                    spanProps={{children: pointUnLoading ? undefined : '...введите значение...'}}
                />
            </div>
            <div className={css.auto}>
                <span>Переадресовка</span>
                <span>______________________________________________________________________________________________________________</span>
            </div>
            <table>
                <tr className={css.up}>
                    <th>Наименование товара</th>
                    <th>Еденица измерения</th>
                    <th>Количество</th>
                    <th>Цена, руб.</th>
                    <th>Стоиомость, руб.</th>
                    <th>НДС, %</th>
                    <th>Сумма НДС, руб</th>
                    <th>Стоимость с НДС, руб.</th>
                    <th>Количество грузовых мест</th>
                    <th>Масса груза</th>
                    <th>Примечание</th>

                </tr>
                <tr className={css.up}>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                    <td>11</td>

                </tr>

                {newRawTTN.map((ts) => {
                    return (<tr> {ts.map((t, index) => {

                        return (
                            <td key={index} className={css.up}> {t} </td>
                        )
                    })
                    }

                    </tr>)
                })}
                <tr>
                    {endRawTTN.map((t, index) => {
                        return (
                            <td key={index} className={css.up}> {t} </td>
                        )
                    })
                    }
                </tr>


            </table>


            Всего стоимость с НДС: {totalOfString}
            <div>
                Всего сумма НДС: {totalVatString}
            </div>
            <div className={css.auto}>
                <span>Всего масса груза</span>
                <span>______________________________</span>
                <span>Всего количество грузовых мест</span>
                <span>_______________________________</span>
            </div>
            <div className={css.auto}>
                <span>Отпуск разрешил</span>
                <span>________________________________</span>
                <span>Товар к перевозке принял</span>
                <span>________________________________</span>
            </div>
            <div className={css.auto}>
                <span>Сдал грузоотправитель</span>
                <span>__________________</span>
                <span>№ пломбы</span>
                <span>__________________</span>
                <span>По доверенности</span>
                <span>__________________</span>
                <span>выданной</span>
                <span>__________________</span>
            </div>
            <div className={css.auto}>
                <span>Принял грузополучатель</span>
                <span>__________________</span>
                <span>№ пломбы</span>
                <span>__________________</span>
            </div>
        </div>

    )
})

