const { User, Restoran, Fav_List } = require('../models')
const FindZomato = require('../API/zomato-api.js')
const FindYoutube = require('../API/youtube-api.js')
const jwt = require('jsonwebtoken')

class RestoranController {

  static restoList(req, res) {

    let title = req.body.search

    FindZomato(title, (err, data) => {
      if (err) {

        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' })
      } else {

        data.restaurants.forEach(elem => {

          FindYoutube(elem.restaurant.name, (err, data) => {
            if (err) {
              console.log(err)
              res.status(500).json({ message: 'Internal Server Error' })
            } else {

              let restaurant = {
                name: elem.restaurant.name,
                url: elem.restaurant.url,
                address: elem.restaurant.location.address,
                cuisines: elem.restaurant.cuisines,
                timings: elem.restaurant.timings,
                aggregate_rating: elem.restaurant.user_rating.aggregate_rating,
                rating_text: elem.restaurant.user_rating.rating_text,
                latitude: elem.restaurant.location.latitude,
                longitude: elem.restaurant.location.longitude,
                References: data
              }

              res.status(200).json(restaurant)
            }
          })
        })


      }
    })
  }

  static addToFavourites(req, res, next) {
    let decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY)
    let userId;           //userId dibutuhkan di pivot table untuk favourite (Fave_Lists table)
    let restoranName;

    User.findOne({ where: { email: decoded.email } })   //search userId untuk mendapatkan Id user yg skrg
      .then((dataUser) => {                             //karena token kita ngga simpen userId
        userId = dataUser.id;
        return Restoran.findOne({ where: { name: req.body.search } }) //mencari restoran berdasarkan nama
      })
      .then((restoranData) => {
        if (restoranData === null) {
          return Restoran.create({     //create restoran di table restoran kalau tidak ada di database
            name: req.body.name,
            address: req.body.address,
            rate: req.body.rating
          })
        } else {
          return restoranData;  //kalau ada, langsung lanjut ke then selanjutnya, membawa data restorannya
        }
      })
      .then((restoranData) => {
        return Fav_List.create({   //masukin data ke pivot table Fave_Lists (many to many relationship)
          UserId: userId,
          RestoranId: restoranData.id
        })
      })
      .then((data) => {
        res.status(201).json({ message: `Restoran berhasil ditambahkan ke favourite list` })
      })
      .catch((err) => {
        res.status(500).json({ message: 'Internal Server Error' })
      })


  }

}
module.exports = RestoranController