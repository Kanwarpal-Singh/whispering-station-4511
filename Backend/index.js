const express = require("express")
const {connection} = require("./config/db")
// const {authentication} = require("./middlewares/authenticate.middlewares")
// const cors = require('cors')
// require("dotenv").config()
// const port = process.env.PORT

// const {UserRouter} = require("./routes/user.routes")
// const {postRouter} = require("./routes/post.routes")
const app = express();

app.use(express.json());
// app.use("/users",UserRouter)
// app.use(authentication)
// app.use("/posts",postRouter)
// app.use(cors)
app.listen(3500,()=>{
    try {
        connection.Promise
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running at ${9090}`)
})