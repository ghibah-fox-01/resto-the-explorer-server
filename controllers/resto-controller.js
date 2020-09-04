const { User,Restoran,Fav_List } = require('../models')
const FindZomato = require('../API/zomato-api.js')
const FindYoutube = require('../API/youtube-api.js')

class RestoranController{

  static restoList(req,res){

    title = req.body.search

      FindZomato( title , (err , data)=>{
        if(err){
          res.status(500).json({message : 'Internal Server Error'})
        }else{

          let dataRestaurant = []

            data.restaurants.forEach(elem=>{
            
                FindYoutube( elem.restaurant.name , (err , data)=>{
                  if(err){
                    res.status(500).json({message : 'Internal Server Error'})
                  }else{

                        let restaurant = {
                            name : elem.restaurant.name,
                            url : elem.restaurant.url,
                            address : elem.restaurant.location.address,
                            cuisines : elem.restaurant.cuisines,
                            timings : elem.restaurant.timings,
                            aggregate_rating : elem.restaurant.user_rating.aggregate_rating,
                            rating_text : elem.restaurant.user_rating.rating_text,
                            latitude : elem.restaurant.location.latitude,
                            longitude : elem.restaurant.location.longitude,
                            References : data
                        }
                            dataRestaurant.push(restaurant)
                    } 
                })
            })
            res.status(200).json(dataRestaurant)
        }
      })
  }
}
module.exports = RestoranController
