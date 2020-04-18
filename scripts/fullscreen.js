let body = document.querySelector('html');
let video = document.querySelector('#video');

console.log(body)
console.log(video);
body.addEventListener('click', ()=>{
    console.log('clicked')
    if(!document.mozFullScreenElement){
        video.requestFullscreen();
    } else if(!document.webkitFullscreenElement){
        video.requestFullscreen();
    }
});