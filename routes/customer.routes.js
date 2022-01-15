const {Router} = require('express')
const Customer = require('../models/Customer')
const router = Router()

router.post(
    '/customer',[],
    async (req,res)=>{
        try{
            const {nameFirm, unp, address, bankAccount} = req.body

            const candidate = await Customer.findOne({unp})
            if (candidate){
                return res.status(400).json({message:"Контрагент с таким УНП уже существует"})
            }

            const customer = new Customer({nameFirm, unp, address, bankAccount})

            await customer.save()
            res.status(201).json({message:"Контрагент сохранен в беза данных"})

        }catch (e) {

            res.status(500).json({message:"Произошла ОШИБКА"})

        }
})
router.get('/customer/:id',[],
    async (req,res)=>{
        try{

            const unp = req.params.id
            const customer = await Customer.find({unp})
            if (customer.length === 0) res.status(200).json({message:"Контрагент не найден"})
            res.status(200).json({message:"Данные о контрагенте получены",customer:customer[0]})
        }catch (e) {

            res.status(500).json({message:"Произошла ОШИБКА"})

        }
    })

module.exports = router