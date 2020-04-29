const fs = require('fs');
const mongoose = require('mongoose');
const Video = require('../models/video');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg')
require('dotenv').config();
console.log(process.env.VIDEOSPATH);
console.log(process.env.MAINDIR);
const mainVidDir = path.join(__dirname, '../Videos');




function loadVideos(){
    console.log('Loading Videos');
    
    fs.readdir(mainVidDir, {withFileTypes : true}, (err, catDirs)=>{
        catDirs.forEach((catDir)=>{
            if(catDir.isDirectory()){
                let category = catDir.name;
                fs.readdir(mainVidDir + '/' + catDir.name, (err, vidFiles)=>{
                    vidFiles.forEach((vidFile)=>{
                      let absPath = "/" + catDir.name + "/" + vidFile;
                      Video.findOne({absPath:absPath}, (err, result)=>{
                          if(err){
                              console.log(err);
                          }
                          if(!result){
                              createScreenshot(absPath, vidFile);
                              let title = vidFile.replace('.mp4', '').substring(0,20);
                              let type = 'mp4';
                              let thumbnail = '/photos/' + vidFile.substring(0, vidFile.lastIndexOf('.')) + '.png';

                              let video = {absPath: absPath, title:title, type:type, thumbnail:thumbnail, category:category, currentTime:0};

                              Video.create(video, (err, video)=>{
                                if(err){
                                    console.log(err);
                                }
                              });
                          }
                      });
                    });
                });
            } else{
                let absPath = "/" + catDir.name;
                Video.findOne({ absPath: absPath}, (err, result)=>{
                    if(err){
                        console.log(err);
                    }
                    if(!result){
                        let title =catDir.name;
                        let type = 'mp4';
                        let thumbnail = '/photos/thumbnailPlaceholder.png'
                        let category = "misc"
                    
                        let video = {absPath: absPath, title:title, type:type, thumbnail:thumbnail, category: category, currentTime:0}
                    
                        Video.create(video, (err, video)=>{
                            if(err){
                                console.log(err);
                            }
                        });
                    }
                });

            }
        });
    });
    


    function createScreenshot(absPath, vidFile) {
        return new ffmpeg(__dirname + '/../Videos' + absPath).thumbnail({
            timemarks: ['20'],
            folder: __dirname + '/../Public/photos',
            filename: vidFile.substring(0, vidFile.lastIndexOf('.')) + '.png',
            size: '175x175',
        }, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
}


module.exports = loadVideos;