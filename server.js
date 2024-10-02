const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const morgan=require("morgan")
const cookieParser=require("cookie-parser")
const connectDB=require("./config/dbconnect.js")
const authRouter=require("./routers/authRouter.js")
const adminRouter=require("./routers/productRouter.js")
const userRouter=require("./routers/userRouter.js")
const cartRouter=require("./routers/cartRouter.js")
dotenv.config()
const port=process.env.PORT||3000
const app=express()
// ----------------------middleware------------------------
app.use(express.json())
app.use(cors())
app.use(morgan())
app.use(cookieParser())
// ----------------router-------------------------

app.use("/",authRouter)
app.use("/admin",adminRouter)
app.use("/users",userRouter)
app.use("/cart",cartRouter)





app.listen(port,()=>{
    console.log(`server is running in port ${port}`);
    connectDB()
})