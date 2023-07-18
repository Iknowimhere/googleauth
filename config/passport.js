const passport=require("passport")
const GoogleStrategy=require("passport-google-oauth20").Strategy;
const keys=require("./keys");
const User = require("../models/User");

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
    let user=await User.findById(id)
    done(null,user)
})
passport.use(new GoogleStrategy({
    callbackURL:'/auth/google/redirect',
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret,
},async (request,acessToken,refreshToken,profile,done)=>{
    // return done(null,profile)
    let currentUser=await User.findOne({googleId:profile.id})
    if(currentUser){
        console.log(`currentuser:`,currentUser);
        done(null,currentUser)
    }else{
        let newUser=await User.create({
            username:profile.displayName,
            googleId:profile.id
         })
         console.log(newUser);
         done(null,newUser)
    }
})
) 

module.exports=passport;