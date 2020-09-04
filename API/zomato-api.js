const fetch = require('node-fetch');

function FindZomato( query , callback ){
    //zomato api
    fetch(`https://developers.zomato.com/api/v2.1/search?q=${query}&count=5` , {
        method :'get',
        headers : {
            'Content-Type' : 'application/json',
            'user-key' : 'abe0dcbd6b751f8aaea7809236b7b96c'
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

module.exports = Fin