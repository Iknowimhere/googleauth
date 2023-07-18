const express=require("express")
// const cookieSession=require("cookie-session")
// const cookieParser=require("cookie-parser")
const passport=require("passport")
const session=require("express-session")
const profileRouter=require("./routes/profile-route")
const router = require("./routes/auth-route")
const mongoose=require("mongoose")
const keys=require("./config/keys")
let app=express()
require("./config/passport")

app.set("view engine","ejs")
app.use(session({
    secret:keys.session.cookieKey,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge:24*60*60*1000,
 }
}))

app.use(passport.initialize())
app.use(passport.session())


async function db(){
    await mongoose.connect(keys.mongodb.mongodbURI)
    console.log("db connected");
}
db()


app.use("/auth",router)
app.use("/profile",profileRouter)
app.listen(5000,(err)=>{
    if(err)console.log(err);
    console.log("server is running on port 5000...");
})