const fetch = require('node-fetch');

function FindZomato( query , callback ){
    //zomato api
    fetch(`https://developers.zomato.com/api/v2.1/search?q=${query}&count=1` , {
        method :'get',
        headers : {
            'Content-Type' : 'application/json',
            'user-key' : process.env.ZOMATO_TOKEN
        }
    })
    .then(response =>{
        return response.json()
    })
    .then(data=>{

        callback(null , data)
    })
    .catch(err=>{
        callback(err , null)
    })

}

module.exports = FindZomato