let body = document.querySelector('html');
let video = document.querySelector('#video');

const clickEvent = new MouseEvent('click', {
    view:window,
    bubbles: true,
    cancelable: true
});

console.log(body)
console.log(video);

const listener = function(){body.addEventListener('click', ()=>{
    console.log('clicked')
    if(!document.mozFullScreenElement){
        video.requestFullscreen();
    } else if(!document.webkitFullscreenElement){
        video.requestFullscreen();
    }
});
}
listener()
window.onload = body.dispatchEvent(clickEvent);




