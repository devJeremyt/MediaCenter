const fs = require('fs');
const mongoose = require('mongoose');
const Video = require('../models/video');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg')
require('dotenv').config();
const baseDir = process.env.BASEDIR
const mainVidDir = baseDir + process.env.VIDEOSPATH || path.join(__dirname, '../Videos');
const mainPhotoDir = baseDir + process.env.PHOTOSPATH || "/photos";





function loadVideos(){
    fs.readdir(mainVidDir, {withFileTypes : true}, (err, catDirs)=>{
        catDirs.forEach((catDir)=>{
            if(catDir.isDirectory()){
                let category = catDir.name;
                fs.readdir(mainVidDir + '/' + catDir.name, (err, vidFiles)=>{
                    vidFiles.forEach((vidFile)=>{
                      let absPath = "/" + catDir.name + "/" + vidFile;
                      addNewVideos(absPath, vidFile, category);
                    });
                });
            } else{
                let absPath = "/" + catDir.name;
                let category = "misc"
                addNewVideos(absPath, vidFile, category);
            }
        });
    });
    


    function addNewVideos(absPath, vidFile, category) {
        Video.findOne({ absPath: absPath }, (err, result) => {
            if (err) {
                console.log(err);
            }
            if (!result) {
                createScreenshot(absPath, vidFile);
                let title = vidFile.replace('.mp4', '').substring(0, 20);
                let type = 'mp4';
                let thumbnail = vidFile.substring(0, vidFile.lastIndexOf('.')) + '.png';
                let video = { absPath: absPath, title: title, type: type, thumbnail: thumbnail, category: category, currentTime: 0 };
                Video.create(video, (err, video) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
    }

    function createScreenshot(absPath, vidFile) {
        return new ffmpeg(mainVidDir + absPath).thumbnail({
            timemarks: ['20'],
            folder: mainPhotoDir,
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