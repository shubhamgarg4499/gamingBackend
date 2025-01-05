const express = require("express");
const { gameMonetize } = require("../model");
const gameRouter = express.Router()


gameRouter.route('/getgames').get(async (req, res, next) => {
    try {

        const { category, limit = 10, page = 1, title } = req?.query
        const skip = (page - 1) * limit
        const pipeline = []

        if (category) {
            pipeline.push({
                $match: {
                    category: { $regex: category, $options: "i" }
                }
            })
        }
        if (title) {
            pipeline.push({
                $match: {
                    title: { $regex: title, $options: "i" }
                }
            })
        }

        pipeline.push({
            $skip: skip
        })


        pipeline.push({
            $limit: limit
        })
        // pipeline.push({
        //     $count: "total"
        // })
        // const all = await games.findOne({})
        const all = await gameMonetize.aggregate(pipeline)
        res.send(all)
    } catch (error) {
        res.send({ error: error })
    }
})

gameRouter.route("/getCategories").get(async (req, res, next) => {
    try {
        const category = await gameMonetize.aggregate([
            { $group: { _id: "$category" } },
            {
                $sort: {
                    _id: 1
                }
            }
        ])
        res.send(category)
    } catch (error) {
        res.send({ error: error })
    }
})


gameRouter.route('/getgameById').get(async (req, res, next) => {
    try {
        const { id } = req.query
        const find = await gameMonetize.findById(id)
        res.send({ ...find.toObject() })
    } catch (error) {
        res.send({ error })
    }
})



module.exports = gameRouter