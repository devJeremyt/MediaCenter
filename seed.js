const mongoose = require('mongoose');
const Video = require('./models/video');

const data = [
    {
        absPath: 'file:///C:/Users/Jeremy/Documents/Projects/MediaCenter/Videos/Frozen2.mp4',
        title: 'Frozen 2',
        type: 'mp4',
        thumbnail: '/photos/thumbnailPlaceholder.png',
        category: 'kids'
    },
    {
        absPath: '/Frozen2.mp4',
        title: 'Frozen 2',
        type: 'mp4',
        thumbnail: '/photos/thumbnailPlaceholder.png',
        category: 'kids'
    }
];

function seedDB(){
    console.log(__dirname);
    //Remove previous videos
    Video.deleteMany({}, (err)=>{
        if(err){
            console.log(err);
        }
        console.log('Removed Videos');

        //Add data array

        data.forEach((video)=>{
            Video.create(video, (err, result)=>{
                if(err){
                    console.log(err);
                } else{
                    console.log("Video added");
                };
            });
        });
    });
};



module.exports = seedDB;