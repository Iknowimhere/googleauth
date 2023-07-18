const router=require("express").Router()
const passport=require("passport")


router.get("/login",(req,res)=>{
    res.render("login")
})

router.get("/logout",(req,res)=>{
    res.send("logout")
})

router.get("/google",passport.authenticate("google",{
    scope:['profile','email']
}))

router.get("/google/redirect",passport.authenticate("google",{
  failureRedirect: '/auth/login'
}),(req,res)=>{
    res.redirect("/profile/")
})

module.exports=router;