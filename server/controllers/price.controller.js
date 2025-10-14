import priceModel from "../models/pricing.model.js"

//func for add priceCard 
export const addPrice = async (req, res) => {
    try {
        const { price, description, category, features } = req.body

        const priceData = {
            price: Number(price), description, category, features
        }

        const priceCard = new priceModel(priceData)
        await priceCard.save()

        res.json({ success: true, message: "Price card is added" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//func for get priceCard
export const getPrice = async (req, res) => {
    try {
        const prices = await priceModel.find({})
        res.json({ success: true, prices })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//func for remove priceCard
export const removePrice = async (req, res) => {
    try {
        await priceModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "PriceCard Remove" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//func for single priceCard info
export const singlePrice = async (req, res) => {
    try {
        const { priceId } = req.body
        const price = await priceModel.findById(priceId)
        res.json({ success: true, price })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
