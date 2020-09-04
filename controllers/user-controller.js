const { User, Restoran, Fav_List } = require('../models')
const bcrypt = require(`bcryptjs`)
const jwt = require(`jsonwebtoken`)

const { OAuth2Client } = require('google-auth-library');
const gClient = new OAuth2Client(process.env.google_oauth_clientId);

class UserController {
  
  static postRegister(req, res) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then((data) => {
        res.status(201).json({
          data,
          message: "Pendaftaran Berhasil"
        })
      })
      .catch((err) => {
        if (err.name === "SequelizeUniqueConstraintError") {
          res.status(400).json({
            message: err.errors[0].message
          })
        }
        else if (err.errors[0].message === "Email Invalid") {
          res.status(400).json({
            message: err.errors[0].message
          })
        }
        else {
          res.status(500).json({
            message: "Internal server error"
          })
        }
      })
  }
  static postLogin(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((data) => {
        if (data) {
          if (bcrypt.compareSync(req.body.password, data.password)) {
            const payload = {
              name: req.body.name,
              email: req.body.email
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY)
            res.status(200).json({ token })
          }
          else {
            res.status(400).json({
              message: "Invalid email/password"
            })
          }
        }
        else {
          res.status(400).json({
            message: "Invalid email/password"
          })
        }
      })
      .catch(() => {
        res.status(400).json({
          message: "Invalid email/password"
        })
      })
  }

  static googleLoginHandler(req, res, next) {
    console.log('abc')
    let payload;
    gClient.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.google_oauth_clientId
    })
      .then((ticket) => {
        payload = ticket.getPayload();
        //payload.email = email googlenya
        //payload.name = name dari google id nya
        //payload.given_name = firstname(?)
        //payload.family_name = lastname(?)
        return User.findOne({ where: { email: payload.email } })
      })
      .then((data) => {
        if (data === null) {
          return User.create({
            name: payload.name,
            email: payload.email,
            password: `${payload.name}`
          })
        } else {
          return data;
        }
      })
      .then((data) => {
        let frontendPayload = {
          name: payload.name,
          email: payload.email
        }
        let token = jwt.sign(frontendPayload, process.env.SECRET_KEY)
        res.status(200).json({ token })
      })
      .catch((err) => {
        res.status(400).json({
          message: "Invalid email/password"
        })
      })

  }

}
module.exports = UserController
