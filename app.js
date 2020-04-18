const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const Video = require('./models/video');
const loadVideos = require('./scripts/loadVideos');
const categories = require('./models/categories');
var cats = [];

//App setup
app.use(express.static('Public'));
app.use(express.static(__dirname + '/Videos'));
app.use(express.static(__dirname + '/scripts'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
//Loads local environment variables
require('dotenv').config();
//Setups Database
var dburl = process.env.DATABASEURL;
mongoose.connect(dburl || "mongodb://localhost:27017/MediaCenter", {useNewUrlParser: true, useUnifiedTopology: true});

//Link Video directory
var vidDir = process.env.MAINDIR + process.env.VIDEOSPATH;





//Loads Videos from Video directory
loadVideos();

Video.find({}, function(err, videos){
	if(err){
		console.log(err);
	} else{
		cats = categories(videos);
	}
});


//Seed Database
//seedDB();

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
app.get('/watch/:id', (req,res)=>{
	Video.findById(req.params.id, (err, foundVideo)=>{
		res.render('watch', {video : foundVideo});
	});
});

//Goes to new video form
app.get('/new', (req,res)=>{
	res.render('new');
});

app.listen(process.env.PORT, ()=>{
	console.log('Server is running');
});
