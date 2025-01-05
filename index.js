const express = require("express")
const connectDB = require("./connectDB")
const { games, user } = require("./model")
const app = express()
require("dotenv").config()
const port = process.env.port || 2000
const cors = require("cors")
const gameRouter = require("./routes/Games.routes")
// app.use(JSON.parse())
connectDB()
app.use(cors({
    origin: ["https://cloudgame.netlify.app", "https://cloud-gaming-omega.vercel.app", ["http://localhost:5173"]],
    credentials: true
}))
app.use(express.json())
app.get('/getgames', async (req, res, next) => {
    try {

        const { category, limit = 10, page = 1, title } = req?.query
        const skip = (page - 1) * limit
        const pipeline = []

        if (category) {
            pipeline.push({
                $match: {
                    Genres: { $regex: category, $options: "i" }
                }
            })
        }
        if (title) {
            pipeline.push({
                $match: {
                    Title: { $regex: title, $options: "i" }
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
        const all = await games.aggregate(pipeline)
        res.send(all)
    } catch (error) {
        res.send({ error: error })
    }
})

app.get("/getCategories", async (req, res, next) => {
    try {
        const genres = await games.aggregate([
            { $unwind: "$Genres" }, // Unwind the Genres array to make each genre a document
            { $group: { _id: "$Genres" } },
            {
                $sort: {
                    _id: 1
                }
            }
        ])
        res.send(genres)
    } catch (error) {
        res.send({ error: error })
    }
})


app.get('/getgameById', async (req, res, next) => {
    try {
        const { id } = req.query
        const find = await games.findById(id)
        res.send({ ...find.toObject() })
    } catch (error) {
        res.send({ error })
    }
})

app.post("/contact-us", async (req, res, next) => {
    try {
        const { email, name, message = "" } = req.body

        if (!email) throw new Error("Email Required!")
        if (!name) throw new Error("Name Required!")

        await user.create({ name, email, message })
        res.send({ success: true, message: "Thanks For Contact Us! We will Contact you soon." })
    } catch (error) {
        throw new Error(error.message)
    }
})

app.use("/gameMonetize", gameRouter)
app.listen(port, () => {
    console.log("listening on " + port);
})
