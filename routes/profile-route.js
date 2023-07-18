const express=require("express")
let router=express.Router()


const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login"); // Redirect to login page if not authenticated
  };

router.get("/",ensureAuthenticated,(req,res)=>{
    console.log(req.user);
    res.send(`hello you're logged in to this application ${req.user.username}`)
})

module.exports=router;