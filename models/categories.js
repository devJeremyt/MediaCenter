const Video = require('./video');
const catties = [];


function populateCategories(videos){
    videos.forEach((video)=>{
        if(!catties.filter(data => (data.name == video.category)).length){
            var category = {
                id: video.category.split(" ").join(''),
                name:video.category,
                vidList: [],
            }
            category.vidList.push(video);
            catties.push(category);
        } else{
            catties.find(data => (data.name == video.category)).vidList.push(video);
        }
    });
    return catties;
};


module.exports = populateCategories;