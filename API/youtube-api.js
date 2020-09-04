const {google} = require('googleapis')
require('dotenv').config()

function FindYoutube(data , callback){
    //youtube api
    google.youtube('v3').search.list({
    key: process.env.YOUTUBE_TOKEN,
    part : 'snippet',
    maxResults: 1,
    q: data,
    })
    .then(response=>{

        let reference = {
            video : []
        }

        response.data.items.forEach(elem =>{
                reference.video.push(`https://www.youtube.com/watch?${elem.id.videoId}`)
        })

        callback(null , reference)

    })
    .catch((err)=>{
        callback(err , null)
    })

}

module.exports = FindYoutube