const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const connection = require("./db")
const userRouter = require("./routes/userRoute")
const recipeRouter = require("./routes/recipeRouter")
const auth = require("./middleware/authMiddleware")
app.use(cors())
app.use(express.json())

// app.get("/",(req,res)=>{
//     res.send("welcome to The Recipe Api")
//     console.log("welcome to The Recipe Api")
// })


app.use("/user",userRouter)
// app.use(auth)
app.use("/recipes",auth,recipeRouter)

app.listen(process.env.PORT,async()=>{
    console.log(`server is running on PORT ${process.env.PORT}`)
    try {
        console.log(`server gets connected to CookBookDB`)
        await connection
    } catch (error) {
        console.log(error)
    }
})