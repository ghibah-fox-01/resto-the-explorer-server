const { User,Restoran,Fav_List } = require('../models')
class UserController{
  static postRegister(req,res){
    User.create({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password
    })
    .then((data)=>{
      res.status(201).json({
        data,
        message:"Pendaftaran Berhasil"
      })
    })
    .catch((err)=>{
      res.status(500).json({
        message:"Internal server error"
      })
    })
  }
  static postLogin(req,res){
  }
}
module.exports = UserController
