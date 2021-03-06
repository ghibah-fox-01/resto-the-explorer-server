const {google} = require('googleapis')
require('dotenv').config()

function FindYoutube(data , callback){
    //youtube api
    google.youtube('v3').search.list({
    key: process.env.YOUTUBE_KEY,
    part : 'snippet',
    maxResults: 1,
    q: data,
    })
    .then(response=>{

        let reference = {
            video : ''
        }

        response.data.items.forEach(elem =>{
                reference.video = `https://www.youtube.com/watch?v=${elem.id.videoId}`
        })

        callback(null , reference)

    })
    .catch((err)=>{
        callback(err , null)
    })

}

module.exports = FindYoutube