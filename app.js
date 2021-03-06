const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Video = require('./models/video');
const loadVideos = require('./scripts/loadVideos');
const categories = require('./models/categories');
var cats = [];
const jsonParser = bodyParser.json();

//App setup
app.use(express.static('Public'));
app.use(express.static(__dirname + '/Videos')); //Location doesn't exist unless user manually creates folder
app.use(express.static(__dirname + '/scripts'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

//Loads local environment variables
require('dotenv').config();

//Sets up Database
var dburl = process.env.DATABASEURL;
mongoose.connect(dburl || "mongodb://localhost:27017/MediaCenter", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

//Link Video and thumbnail directories
var vidDir = process.env.BASEDIR + process.env.VIDEOSPATH;
var photoDir = process.env.BASEDIR + process.env.PHOTOSPATH;
app.use(express.static(vidDir));
app.use(express.static(photoDir));





//Loads Videos from Video directory
loadVideos();

Video.find({}, function(err, videos){
	if(err){
		console.log(err);
	} else{
		cats = categories(videos);
	}
});


//Main Page
app.get('/', (req,res)=>{
	res.render('index', {categories : cats});
});

//Manually adds a new video
app.post('/', (req, res)=>{
	let absPath = req.body. absPath;
	let title = req.body.title;
	let type = 'mp4';
	let thumbnail = '/photos/thumbnailPlaceholder.png'
	let category = req.body.category;

	let video = {absPath: absPath, title:title, type:type, thumbnail:thumbnail, category: category}

	Video.create(video, (err, video)=>{
		if(err){
			console.log(err);
		}
		res.redirect('/');
	});
});

//Opens Player for the selected video
app.get('/watch/:id?', (req,res)=>{
	Video.findById(req.params.id, (err, foundVideo)=>{
		if(req.query.playmethod == "resume"){
			res.render('watch', {video : foundVideo, playmethod: 'resume'});
		} else{
			res.render('watch', {video : foundVideo, playmethod:"beginning"});
		}
	});
});

//Goes to new video form
app.get('/new', (req,res)=>{
	res.render('new');
});

//Gets next video and redirects to watch
app.get('/next/:id', (req, res)=>{
	Video.findById(req.params.id, (err, foundVideo)=>{
		currentCat = cats.find(data => (data.name == foundVideo.category));
		currentVid = currentCat.vidList.filter(data => (data.id == foundVideo.id))[0];
		currentIndex = currentCat.vidList.indexOf(currentVid);
		nextVid = currentCat.vidList[currentIndex + 1];
		if(nextVid != undefined){
			res.json(nextVid);
		}else{
			res.render('watch', {video : foundVideo, playmethod:'beginning'});
		}
		
	});
})

//Sets the currentTime of the video
app.put('/watch/:id', jsonParser, (req, res)=>{
	Video.findByIdAndUpdate(req.params.id,{currentTime: req.body.currentTime}, (err, foundVideo)=>{
		if(err){
			console.log(err);
			res.status(500);
		}else{
			res.status(200).send();
		}
	})

	
});

app.listen(process.env.PORT, ()=>{
	console.log('Server is running');
});

