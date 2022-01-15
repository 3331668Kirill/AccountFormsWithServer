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
                return res.status(400).json({message:"This customer is already exist"})
            }

            const customer = new Customer({nameFirm, unp, address, bankAccount})

            await customer.save()
            res.status(201).json({message:"Customer is created"})

        }catch (e) {

            res.status(500).json({message:"Something go wrong"})

        }
})
router.get('/customer/:id',[],
    async (req,res)=>{
        try{

            const unp = req.params.id
            const customer = await Customer.find({unp})
            if (customer.length === 0) res.status(200).json({message:"Customer not found"})
            res.status(200).json({message:"Customer is loaded",customer:customer[0]})
        }catch (e) {

            res.status(500).json({message:"Something go wrong"})

        }
    })

module.exports = router